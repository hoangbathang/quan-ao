import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private MenuRepository: Repository<MenuEntity>,
  ) {}
  async findAll() {
    return await this.MenuRepository.find();
  }
}
