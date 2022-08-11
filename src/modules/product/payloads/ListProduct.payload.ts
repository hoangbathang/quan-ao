import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetProductbyCategoryandMenuPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  url: string;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  id_category: number;
}
