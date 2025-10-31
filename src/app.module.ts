import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { VideosModule } from './videos/videos.module';
import { ArtistsModule } from './artists/artists.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AvatarsModule } from './avatars/avatars.module';
import { VotesService } from './votes/votes.service';
import { VotesModule } from './votes/votes.module';
import { PaymentsModule } from './payments/payments.module';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [
    PrismaModule,
    VideosModule,
    ArtistsModule,
    AvatarsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/shema.gql'),
      playground: true,
      introspection: true,
      path: '/api/data',
    }),
    VotesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, VotesService, StripeService],
})
export class AppModule {}
