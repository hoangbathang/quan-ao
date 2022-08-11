import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetDetailWarehousePayload {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_product: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_size: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_color: number;
}
