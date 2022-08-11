import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AddDetailBillPayload } from 'src/modules/detail_bill/payloads/adddetailbill.payload';
import { AddBillPayload } from './addbill.payload';

export class Addbillandetail {
  @ApiProperty()
  @IsOptional()
  payloadbill: AddBillPayload;
  @ApiProperty()
  @IsOptional()
  payloadDetailbill: AddDetailBillPayload[];
}
