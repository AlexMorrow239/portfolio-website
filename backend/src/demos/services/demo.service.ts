import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import {
  ThreeSatParams,
  ThreeSatResult,
} from '../interfaces/three-sat.interface';

const execAsync = promisify(exec);

@Injectable()
export class DemoService {
  private readonly logger = new Logger(DemoService.name);

  // Three-SAT demo constraints
  private readonly THREE_SAT_CONSTRAINTS = {
    n: { min: 3, max: 10 },
    ratio: { min: 0.1, max: 6.0 },
  };

  async runThreeSatDemo(params: ThreeSatParams): Promise<ThreeSatResult> {
    try {
      this.logger.debug(
        `Received Three-SAT demo request with params: ${JSON.stringify(params)}`,
      );

      // Input validation
      this.validateThreeSatParams(params);
      this.logger.debug('Parameters validated successfully');

      // Run the demo
      const result = await this.executeThreeSatDemo(params);
      this.logger.debug(
        `Demo execution completed successfully: ${JSON.stringify(result)}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error in runThreeSatDemo: ${error.message}`,
        error.stack,
      );
      throw this.handleError(error);
    }
  }

  private validateThreeSatParams(params: ThreeSatParams): void {
    const { n, ratio } = params;

    // Check if parameters are numbers
    if (typeof n !== 'number' || typeof ratio !== 'number') {
      throw new BadRequestException('Parameters must be numbers');
    }

    // Validate n (number of variables)
    if (
      n < this.THREE_SAT_CONSTRAINTS.n.min ||
      n > this.THREE_SAT_CONSTRAINTS.n.max
    ) {
      throw new BadRequestException(
        `Number of variables must be between ${this.THREE_SAT_CONSTRAINTS.n.min} and ${this.THREE_SAT_CONSTRAINTS.n.max}`,
      );
    }

    // Validate ratio
    if (
      ratio < this.THREE_SAT_CONSTRAINTS.ratio.min ||
      ratio > this.THREE_SAT_CONSTRAINTS.ratio.max
    ) {
      throw new BadRequestException(
        `Clause ratio must be between ${this.THREE_SAT_CONSTRAINTS.ratio.min} and ${this.THREE_SAT_CONSTRAINTS.ratio.max}`,
      );
    }
  }

  async executeThreeSatDemo(params: { n: number; ratio: number }) {
    const { n, ratio } = params;
    // Calculate number of clauses based on ratio
    const numClauses = Math.max(1, Math.floor(n * ratio));

    try {
      this.logger.debug(
        `Executing command: docker run --rm portfolio-website-three-sat-demo ${n} ${numClauses}`,
      );

      const { stdout } = await execAsync(
        `docker run --rm portfolio-website-three-sat-demo ${n} ${numClauses}`,
      );

      try {
        return JSON.parse(stdout);
      } catch (parseError) {
        this.logger.error(`Failed to parse demo output: ${stdout}`);
        throw new Error('Failed to parse demo output');
      }
    } catch (error) {
      this.logger.error(`Demo execution failed: ${error.message}`);
      throw new Error('Docker execution failed');
    }
  }

  private validateThreeSatResult(result: any): ThreeSatResult {
    // Ensure all required fields are present
    const requiredFields = [
      'formula',
      'satisfiable',
      'assignment',
      'num_variables',
      'num_clauses',
    ];
    for (const field of requiredFields) {
      if (!(field in result)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Type checking
    if (typeof result.satisfiable !== 'boolean') {
      throw new Error('satisfiable must be a boolean');
    }
    if (typeof result.formula !== 'string') {
      throw new Error('formula must be a string');
    }
    if (typeof result.num_variables !== 'number') {
      throw new Error('num_variables must be a number');
    }
    if (typeof result.num_clauses !== 'number') {
      throw new Error('num_clauses must be a number');
    }
    if (typeof result.assignment !== 'object') {
      throw new Error('assignment must be an object');
    }

    return {
      formula: result.formula,
      satisfiable: result.satisfiable,
      assignment: result.assignment,
      num_variables: result.num_variables,
      num_clauses: result.num_clauses,
    };
  }

  private handleError(error: any): Error {
    if (error instanceof BadRequestException) {
      return error;
    }

    if (error.code === 'ETIMEDOUT') {
      return new RequestTimeoutException('Demo execution timed out');
    }

    if (error.message.includes('docker')) {
      return new InternalServerErrorException('Docker execution failed');
    }

    if (error.message.includes('Invalid output format')) {
      return new InternalServerErrorException(
        'Demo returned invalid output format',
      );
    }

    return new InternalServerErrorException('Failed to execute demo');
  }
}
