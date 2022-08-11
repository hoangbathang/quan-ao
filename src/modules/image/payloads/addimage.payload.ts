import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddImagePayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  id_product: number;
}
