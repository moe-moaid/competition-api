import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SocialMedia } from './socialMedia.entity';
import { Video } from 'src/videos/entities/video.entity';
@ObjectType()
export class Artist {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field()
  email: string;

  @Field()
  phone: string;
  
  @Field()
  bio: string;

  @Field()
  password: string;

  @Field(() => Int, { nullable: true })
  locationId?: number;

  @Field(() => [SocialMedia])
  socialMedias: SocialMedia[];

  @Field(() => [Video])
  videos: Video[];

  @Field()
  avatarId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
