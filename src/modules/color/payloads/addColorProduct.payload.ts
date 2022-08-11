import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddColorProductPayload {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_color: number;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_product: number;
}
