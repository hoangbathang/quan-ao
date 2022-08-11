import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTypes } from 'src/modules/account/account.contant';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { AddDetailBillPayload } from 'src/modules/detail_bill/payloads/adddetailbill.payload';
import { AddBillPayload } from '../payloads/addbill.payload';
import { Addbillandetail } from '../payloads/addbillandetail.payload';
import { BillService } from '../services/bill.service';

@Controller('bill')
@ApiTags('Bill')
export class BillController {
  constructor(private billService: BillService) {}
  @Post('add')
  @Roles(UserTypes.user)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async addBill(
    @CurrentUser() user: AccountEntity,
    @Body() payload: Addbillandetail,
  ) {
    return await this.billService.addBill(user, payload);
  }
  @Get('')
  @Roles(UserTypes.user)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async getBillByUser(@CurrentUser() user: AccountEntity) {
    return await this.billService.getBillByUser(user.id);
  }
  @Get(':id')
  @Roles(UserTypes.user)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async getDetailbill(
    @CurrentUser() user: AccountEntity,
    @Param('id') id: number,
  ) {
    return await this.billService.getDetailBill(id, user.id);
  }
}
