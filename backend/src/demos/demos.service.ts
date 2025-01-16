import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PythonExecutorService } from './services/python-executor.service';

interface SatSolverParams {
  n: number; // Number of variables
  ratio: number; // Clause to variable ratio
}

@Injectable()
export class DemosService {
  private readonly logger = new Logger(DemosService.name);

  constructor(
    private pythonExecutor: PythonExecutorService,
    private configService: ConfigService,
  ) {}

  async runSatSolver(dto: SatSolverParams) {
    try {
      this.logger.debug(
        `Running SAT solver with n=${dto.n}, ratio=${dto.ratio}`,
      );

      // Log Python environment
      this.logger.debug(`PYTHONPATH: ${process.env.PYTHONPATH}`);
      this.logger.debug(`Current working directory: ${process.cwd()}`);

      // Validate inputs before executing Python script
      this.validateSatSolverInputs(dto.n, dto.ratio);

      // Convert numbers to strings for command line arguments
      const args = [dto.n.toString(), dto.ratio.toString()];

      // Execute the Python script with provided parameters
      const result = await this.pythonExecutor.executePythonScript(
        'entrypoint.py',
        args,
      );

      this.logger.debug('SAT solver execution completed successfully');
      this.logger.debug('Result:', result);

      // Validate the output structure
      this.validateSatSolverOutput(result);

      return result;
    } catch (error) {
      this.logger.error('SAT solver execution failed:', {
        error: error.message,
        stack: error.stack,
        params: dto,
      });

      // Handle different types of errors appropriately
      if (error instanceof BadRequestException) {
        throw error; // Re-throw validation errors
      }

      if (error.message.includes('timed out')) {
        throw new BadRequestException(
          'SAT solver execution timed out - try reducing the number of variables',
        );
      }

      if (error.message.includes('ENOENT')) {
        throw new InternalServerErrorException(
          'Failed to locate Python script - please contact support',
        );
      }

      if (error.message.includes('parse')) {
        throw new InternalServerErrorException(
          'Failed to parse SAT solver output - please try again',
        );
      }

      // Generic error handler
      throw new InternalServerErrorException(this.formatErrorMessage(error));
    }
  }

  private validateSatSolverInputs(n: number, ratio: number): void {
    const errors: string[] = [];

    // Validate number of variables
    if (!Number.isInteger(n)) {
      errors.push('Number of variables must be an integer');
    }
    if (n < 3 || n > 5) {
      errors.push('Number of variables must be between 3 and 5');
    }

    // Validate clause ratio
    if (!Number.isFinite(ratio)) {
      errors.push('Clause ratio must be a finite number');
    }
    if (ratio < 2.0 || ratio > 5.0) {
      errors.push('Clause ratio must be between 2.0 and 5.0');
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }
  }

  private validateSatSolverOutput(output: any): void {
    if (!output || typeof output !== 'object') {
      throw new Error('Invalid solver output format');
    }

    // Check for required fields based on your frontend types
    const requiredFields = [
      'formula',
      'satisfiable',
      'num_variables',
      'num_clauses',
      'solving_process',
    ];

    for (const field of requiredFields) {
      if (!(field in output)) {
        throw new Error(`Missing required field in solver output: ${field}`);
      }
    }

    // Validate solving_process structure if present
    if (output.solving_process) {
      if (!Array.isArray(output.solving_process.steps)) {
        throw new Error('Invalid solving_process.steps format');
      }
      if (typeof output.solving_process.statistics !== 'object') {
        throw new Error('Invalid solving_process.statistics format');
      }
    }
  }

  private formatErrorMessage(error: Error): string {
    if (error instanceof BadRequestException) {
      return error.message;
    }

    // Handle specific error types
    if (error.message.includes('ENOENT')) {
      return 'Failed to locate Python script';
    }
    if (error.message.includes('syntax error')) {
      return 'Python script syntax error';
    }
    if (error.message.includes('spawn python3')) {
      return 'Python runtime not available';
    }

    // Log unexpected errors for debugging
    this.logger.error('Unexpected error:', {
      message: error.message,
      stack: error.stack,
    });

    return 'An unexpected error occurred while running the SAT solver';
  }
}
