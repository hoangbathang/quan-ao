import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTypes } from 'src/modules/account/account.contant';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { AddWareHousePayload } from '../payloads/addwarehouse.payload';
import { WareHouseService } from '../services/warehouse.service';

@ApiTags('warehouse')
@Controller('warehouse')
export class WareHouseController {
  constructor(private WareHouseService: WareHouseService) {}
  @Post('add')
  @Roles(UserTypes.admin)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async addWareHouse(@Body() body: AddWareHousePayload) {
    return await this.WareHouseService.addWareHouse(body);
  }
}
