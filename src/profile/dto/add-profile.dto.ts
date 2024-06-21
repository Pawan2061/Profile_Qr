import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}
