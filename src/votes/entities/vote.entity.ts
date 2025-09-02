import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  videoId: number;
}
