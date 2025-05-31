import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArtistLocation } from './location.entity';
import { Video } from 'src/videos/entities/video.entity';

@ObjectType()
export class Artist {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field(() => ArtistLocation)
  location: ArtistLocation

    @Field(() => [Video])
    videos: Video

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
