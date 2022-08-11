import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateInforAccountPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  firstName: string;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  lastName: string;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  phone: string;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  address: string;
}
