import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  extractToken(connectionParams: any): string | null {
    return connectionParams?.token || null;
  }

  validateToken(token: string): any {
    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    if (!refreshTokenSecret) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }

    try {
      return verify(token, refreshTokenSecret);
    } catch (error) {
      return null;
    }
  }
}
