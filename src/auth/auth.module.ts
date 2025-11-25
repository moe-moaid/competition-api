import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '15m' },
      secret: process.env.JWT_SECRET
    }),
  ],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}

