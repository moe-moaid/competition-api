import { ObjectType, Field, Int } from '@nestjs/graphql';
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
  password: string;

  @Field(() => Int, { nullable: true })
  locationId?: number;

  @Field()
  avatarId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
