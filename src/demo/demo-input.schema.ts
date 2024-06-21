import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class AuthorInput {
  @Field()
  @IsOptional()
  @IsString()
  id: string;
  @Field()
  @IsOptional()
  @IsString()
  firstName: string;
  @Field()
  @IsOptional()
  @IsString()
  lastName: string;
}
