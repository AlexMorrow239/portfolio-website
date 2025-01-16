import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class PythonExecutorService {
  private readonly logger = new Logger(PythonExecutorService.name);
  private readonly maxExecutionTime = 30000; // 30 seconds timeout
  private readonly scriptsPath: string;

  constructor(private configService: ConfigService) {
    this.scriptsPath =
      this.configService.get<string>('python.scriptsPath') ||
      path.join(process.cwd(), 'scripts');
    this.logger.log(`Python scripts path: ${this.scriptsPath}`);
  }

  async executePythonScript(scriptName: string, args: string[]): Promise<any> {
    const scriptPath = path.join(this.scriptsPath, scriptName);

    if (!this.validateScriptPath(scriptPath)) {
      throw new Error('Invalid script path');
    }

    this.logger.debug(
      `Executing Python script: ${scriptPath} with args: ${args.join(' ')}`,
    );

    return new Promise((resolve, reject) => {
      // Create execution timeout
      const timeout = setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('Script execution timed out'));
      }, this.maxExecutionTime);

      // Spawn Python process with direct script path and arguments
      const pythonProcess = spawn('python3', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          PYTHONUNBUFFERED: '1',
          PYTHONPATH: this.scriptsPath,
        },
        cwd: this.scriptsPath,
      });

      let outputData = '';
      let errorData = '';

      // Handle stdout data
      pythonProcess.stdout.on('data', (data) => {
        const dataStr = data.toString();
        outputData += dataStr;
        this.logger.debug(`Python stdout: ${dataStr}`);
      });

      // Handle stderr data
      pythonProcess.stderr.on('data', (data) => {
        const dataStr = data.toString();
        errorData += dataStr;
        this.logger.error(`Python stderr: ${dataStr}`);
      });

      // Handle process errors
      pythonProcess.on('error', (error) => {
        clearTimeout(timeout);
        this.logger.error(`Failed to start Python process: ${error.message}`);
        reject(error);
      });

      // Handle process completion
      pythonProcess.on('close', (code) => {
        clearTimeout(timeout);

        if (code !== 0) {
          const errorMsg = errorData || 'Python script execution failed';
          this.logger.error(
            `Python process exited with code ${code}: ${errorMsg}`,
          );
          reject(new Error(errorMsg));
          return;
        }

        try {
          // Try to parse JSON output
          const result = JSON.parse(outputData);
          this.logger.debug('Python script output:', result);
          resolve(result);
        } catch (error) {
          this.logger.error('Failed to parse Python output:', {
            error,
            outputData,
          });
          reject(new Error('Failed to parse solver output'));
        }
      });

      // Write args to stdin if needed
      if (args.length > 0) {
        pythonProcess.stdin.write(JSON.stringify(args));
        pythonProcess.stdin.end();
      }
    });
  }

  // Utility method to validate script path
  private validateScriptPath(scriptPath: string): boolean {
    const normalizedPath = path.normalize(scriptPath);
    const normalizedScriptsDir = path.normalize(this.scriptsPath);

    this.logger.debug(`Validating script path: ${normalizedPath}`);
    this.logger.debug(`Scripts directory: ${normalizedScriptsDir}`);

    return normalizedPath.startsWith(normalizedScriptsDir);
  }
}
