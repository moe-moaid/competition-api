import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class RefreshTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
  
      const token = req.cookies?.refreshToken; // httpOnly cookie
  
      if (!token) throw new UnauthorizedException('No refresh token');
  
      const decoded = this.jwtService.decode(token) as any;
  
      if (!decoded || decoded.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }
  
      return true;
    }
  }
  
