import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country: string;
    address: string;
    avatar: number;
    age?: number;
    bio?: string;
  }) {
    const existingArtist = await this.prisma.artist.findUnique({
      where: { email: data.email },
    });

    if (existingArtist) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const location = await this.prisma.location.create({
      data: {
        country: data.country,
        address: data.address,
      },
    });

    const artist = await this.prisma.artist.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone ?? null,
        locationId: location.id,
        avatarId: data.avatar,
        age: data.age ?? null,
        bio: data.bio ?? null
      },
    });

    return this.generateToken(artist);
  }

  async login(email: string, password: string) {
    const artist = await this.prisma.artist.findUnique({ where: { email } });

    if (!artist) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, artist.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(artist);
  }

  async generateToken(artist: any) {
    const payload = {
      sub: artist.id,
      email: artist.email,
      name: artist.name,
    };
    const accessToken = await this.jwtService.signAsync(
      { ...payload, type: 'access' },
      { expiresIn: '15m', secret: process.env.JWT_SECRET },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: artist.id, type: 'refresh' },
      {
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );
    if (accessToken && refreshToken) {
      const hashed = await bcrypt.hash(refreshToken, 10);
      await this.prisma.artist.update({
        where: { id: artist.id },
        data: { hashedRt: hashed },
      });
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}
