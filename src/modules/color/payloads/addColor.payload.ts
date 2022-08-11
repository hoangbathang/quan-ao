import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddColorPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;
}
