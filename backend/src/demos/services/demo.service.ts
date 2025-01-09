import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface PythonDemoParams {
  integer: number;
  float: number;
}

@Injectable()
export class DemoService {
  private readonly logger = new Logger(DemoService.name);

  async runPythonDemo(params: PythonDemoParams) {
    try {
      // Input validation
      this.validatePythonDemoParams(params);

      // Run the demo in Docker with resource limits and timeout
      const result = await this.executePythonDemo(params);

      this.logger.log(
        `Python demo executed successfully with params: ${JSON.stringify(params)}`,
      );
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  private validatePythonDemoParams(params: PythonDemoParams) {
    const { integer, float } = params;

    // Validate integer parameter
    if (!Number.isInteger(integer)) {
      throw new BadRequestException('Integer parameter must be a whole number');
    }
    if (integer < 3 || integer > 10) {
      throw new BadRequestException(
        'Integer parameter must be between 3 and 10',
      );
    }

    // Validate float parameter
    if (typeof float !== 'number' || isNaN(float)) {
      throw new BadRequestException('Float parameter must be a valid number');
    }
    if (float < 0.1 || float > 6.0) {
      throw new BadRequestException(
        'Float parameter must be between 0.1 and 6.0',
      );
    }
  }

  private async executePythonDemo(params: PythonDemoParams) {
    const containerId = `python-demo-${Date.now()}`;

    try {
      // Run the container with resource limits
      const { stdout, stderr } = await execAsync(
        `docker run --rm \
          --name ${containerId} \
          --memory=512m \
          --cpus=0.5 \
          --read-only \
          --tmpfs /tmp:size=64M \
          --security-opt no-new-privileges \
          python-demo ${params.integer} ${params.float}`,
        { timeout: 60000 }, // 60 second timeout
      );

      if (stderr) {
        this.logger.warn(`Python demo warning: ${stderr}`);
      }

      return {
        success: true,
        output: stdout.trim(),
        warnings: stderr ? stderr.trim() : null,
      };
    } catch (error) {
      // Handle specific error types
      if (error.code === 'ETIMEDOUT') {
        throw new RequestTimeoutException('Demo execution timed out');
      }

      if (error.code === 'ENOENT') {
        throw new InternalServerErrorException('Docker is not available');
      }

      if (error.killed) {
        throw new RequestTimeoutException(
          'Demo execution was terminated due to resource limits',
        );
      }

      // Check if it's a Docker error
      if (error.stderr && error.stderr.includes('docker')) {
        throw new InternalServerErrorException(
          'Failed to execute demo in Docker container',
        );
      }

      throw error;
    } finally {
      // Cleanup: ensure container is removed even if there was an error
      try {
        await execAsync(`docker rm -f ${containerId} 2>/dev/null || true`);
      } catch (cleanupError) {
        this.logger.error(
          `Failed to cleanup container ${containerId}: ${cleanupError.message}`,
        );
      }
    }
  }

  private handleError(error: any) {
    // Log the error with appropriate level
    if (error instanceof BadRequestException) {
      this.logger.warn(`Invalid demo parameters: ${error.message}`);
    } else {
      this.logger.error(`Demo execution failed: ${error.message}`, error.stack);
    }

    // Rethrow known exceptions
    if (
      error instanceof BadRequestException ||
      error instanceof RequestTimeoutException ||
      error instanceof InternalServerErrorException
    ) {
      throw error;
    }

    // Convert unknown errors to InternalServerErrorException
    throw new InternalServerErrorException(
      'An unexpected error occurred while running the demo',
    );
  }
}
