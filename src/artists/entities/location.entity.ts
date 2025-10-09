import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ArtistLocation {
  @Field(() => Int)
  id: number;

  @Field()
  country: string;

  @Field()
  address: string;
}
