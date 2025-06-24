import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  category: 'hipPop' | 'rap' | 'rnb' | 'afrobeat' | 'raggae' | 'dancehall' | 'reggarton' | 'others'

  @Field()
  description: string;

  @Field()
  videoName: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field()
  videoUrl: string; // Computed one

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
