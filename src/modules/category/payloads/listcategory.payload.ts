import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';
export class GetCategorybyMenuPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  url: string;
}
