import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Avatar {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;
}
