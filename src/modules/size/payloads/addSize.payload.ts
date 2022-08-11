import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddSizePayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;
}
