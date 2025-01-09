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
    n: { min: 3, max: 5 },
    ratio: { min: 2.0, max: 5.0 },
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

    try {
      this.logger.debug(
        `Executing command: docker run --rm portfolio-website-three-sat-demo ${n} ${ratio}`,
      );

      const { stdout } = await execAsync(
        `docker run --rm portfolio-website-three-sat-demo ${n} ${ratio}`,
      );

      try {
        // Log the raw output for debugging
        this.logger.debug(`Raw Docker output: ${stdout}`);

        // Parse the JSON output
        const rawResult = JSON.parse(stdout.trim());

        // Validate the parsed result
        return this.validateThreeSatResult(rawResult);
      } catch (parseError) {
        this.logger.error(`Failed to parse demo output: ${stdout}`);
        this.logger.error(`Parse error details: ${parseError.message}`);
        throw new InternalServerErrorException('Failed to parse demo output');
      }
    } catch (error) {
      this.logger.error(`Demo execution failed: ${error.message}`);
      throw new InternalServerErrorException('Failed to execute demo');
    }
  }

  private validateThreeSatResult(result: any): ThreeSatResult {
    // Validate base fields
    if (!result || typeof result !== 'object') {
      throw new Error('Result must be an object');
    }

    // Validate required fields
    const requiredFields = [
      'formula',
      'satisfiable',
      'assignment',
      'num_variables',
      'num_clauses',
      'solving_process',
    ];

    for (const field of requiredFields) {
      if (!(field in result)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate solving_process structure
    if (!result.solving_process || typeof result.solving_process !== 'object') {
      throw new Error('solving_process must be an object');
    }

    if (!Array.isArray(result.solving_process.steps)) {
      throw new Error('solving_process.steps must be an array');
    }

    if (
      !result.solving_process.statistics ||
      typeof result.solving_process.statistics !== 'object'
    ) {
      throw new Error('solving_process.statistics must be an object');
    }

    // Validate statistics fields
    const requiredStats = [
      'total_steps',
      'max_depth',
      'unit_propagations',
      'pure_literals',
      'backtracks',
      'two_clause_rules',
    ];

    for (const stat of requiredStats) {
      if (typeof result.solving_process.statistics[stat] !== 'number') {
        throw new Error(`statistics.${stat} must be a number`);
      }
    }

    // Return the validated result
    return {
      formula: result.formula,
      satisfiable: result.satisfiable,
      assignment: result.assignment,
      num_variables: result.num_variables,
      num_clauses: result.num_clauses,
      solving_process: {
        steps: result.solving_process.steps,
        statistics: result.solving_process.statistics,
      },
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
