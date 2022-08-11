import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddWareHousePayload {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_product: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_size: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_color: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  amount: number;
}
