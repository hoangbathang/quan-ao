import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTypes } from 'src/modules/account/account.contant';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { AddSizePayload } from '../payloads/addSize.payload';
import { SizeService } from '../services/size.service';

@ApiTags('size')
@Controller('product')
export class SizeController {
  constructor(private SizeService: SizeService) {}
  @Post('add')
  @Roles(UserTypes.admin)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async addSize(@Body() body: AddSizePayload) {
    return await this.SizeService.addSize(body);
  }
}
