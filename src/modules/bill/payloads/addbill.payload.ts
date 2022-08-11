import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { DetailBillEntity } from 'src/modules/detail_bill/entities/detailbill.entity';

export class AddBillPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ type: 'string', required: false })
  @IsNotEmpty()
  address: string;
  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  price: number;
  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  total: number;
}
