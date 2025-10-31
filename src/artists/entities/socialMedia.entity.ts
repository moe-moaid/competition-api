import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class SocialMedia {
  @Field(() => Int)
  id: number;

  @Field()
  platform: string;

  @Field()
  link: string;
}
