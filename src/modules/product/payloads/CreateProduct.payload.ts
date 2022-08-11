import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category_id: number;
}
