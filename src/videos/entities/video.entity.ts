import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  url: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
