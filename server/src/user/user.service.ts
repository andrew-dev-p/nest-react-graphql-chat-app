import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { resolve } from 'path';

@Injectable()
export class UserService {
  private readonly uploadsPath: string;

  constructor(private readonly prisma: PrismaService) {
    this.uploadsPath = resolve(process.cwd(), 'public', 'images');
    if (!fs.existsSync(this.uploadsPath)) {
      fs.mkdirSync(this.uploadsPath, { recursive: true });
    }
  }

  async updateProfile(userId: number, fullname: string, avatarUrl: string) {
    if (avatarUrl) {
      const oldUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          fullname,
          avatarUrl,
        },
      });

      if (oldUser?.avatarUrl) {
        const imageName = oldUser.avatarUrl.split('/').pop();
        const imagePath = join(this.uploadsPath, imageName || '');
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      return updatedUser;
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullname,
      },
    });
  }

  async searchUsers(fullname: string, userId: number) {
    return this.prisma.user.findMany({
      where: {
        fullname: {
          contains: fullname,
        },
        id: {
          not: userId,
        },
      },
    });
  }

  async getUsersOfChatroom(chatroomId: number) {
    return this.prisma.user.findMany({
      where: {
        chatrooms: {
          some: {
            id: chatroomId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUser(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
