import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from '../services/menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Get('/')
  async getAll() {
    return await this.menuService.findAll();
  }
}
