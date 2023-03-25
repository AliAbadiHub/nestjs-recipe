import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatedescriptionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
