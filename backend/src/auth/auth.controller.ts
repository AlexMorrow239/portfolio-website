import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.logger.log('AuthController initialized');
    this.logger.log(
      `ADMIN_USERNAME configured: ${!!this.configService.get('ADMIN_USERNAME')}`,
    );
    this.logger.log(
      `JWT_SECRET configured: ${!!this.configService.get('JWT_SECRET')}`,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  async login(@Body() loginDto: LoginDto) {
    this.logger.log('Login endpoint hit'); // Changed to log from debug for better visibility
    this.logger.log(`Login attempt for user: ${loginDto.username}`);
    return await this.authService.login(loginDto);
  }
}
