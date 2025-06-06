import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { VideosModule } from './videos/videos.module';
import { ArtistsModule } from './artists/artists.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    PrismaModule,
    VideosModule,
    ArtistsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/shema.gql'),
      playground: true,
      introspection: true,
      path: '/api/data',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
