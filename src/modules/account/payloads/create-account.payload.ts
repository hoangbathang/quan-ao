import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class CreateAccountPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @MinLength(10)
  password: string;
}
