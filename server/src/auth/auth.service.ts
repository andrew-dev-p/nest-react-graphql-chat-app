import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'generated/prisma';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }

    const expiresIn = 60 * 60 * 1000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;

    const accessToken = this.jwtService.sign(
      {
        ...payload,
        exp: expiration,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn,
      },
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });

    return {
      accessToken,
    };
  }

  private async issueTokens(user: User, res: Response) {
    const payload = {
      username: user.fullname,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(
      {
        ...payload,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return {
      user,
    };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async register(registerDto: RegisterDto, res: Response) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const arePasswordsMatched =
      registerDto.password === registerDto.confirmPassword;

    if (!arePasswordsMatched) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        fullname: registerDto.fullname,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return this.issueTokens(user, res);
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.validateUser(loginDto);

    return this.issueTokens(user, res);
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return {
      message: 'Logged out successfully',
    };
  }
}
