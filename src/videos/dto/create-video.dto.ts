import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  filename: string;

  @Field()
  filePath: string;

  @Field()
  url: string;

  @Field()
  artistId: number;

  @Field({ nullable: true })
  thumbnail?: string;
}
