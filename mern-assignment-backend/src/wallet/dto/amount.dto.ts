//i have used this validation libraary just for extra validation otherwise we can handel validation with conditons too as i did inside services
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AmountDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}