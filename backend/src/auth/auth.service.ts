import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
      const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

      if (
        loginDto.username !== adminUsername ||
        loginDto.password !== adminPassword
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        access_token: this.jwtService.sign({
          username: adminUsername,
          role: 'admin',
        }),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new Error('An unexpected error occurred during login');
    }
  }
}
