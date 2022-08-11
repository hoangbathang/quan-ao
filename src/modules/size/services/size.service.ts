import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from '../entities/size.entity';
import { AddSizePayload } from '../payloads/addSize.payload';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private SizeRepository: Repository<SizeEntity>,
  ) {}
  async addSize(payload: AddSizePayload) {
    const checkSize = await this.SizeRepository.findOne({
      where: {
        name: payload.name,
      },
    });
    if (checkSize) {
      return {
        message: 'Đã tồn tại Size',
      };
    }
    const newSize = await this.SizeRepository.create(payload);
    return await this.SizeRepository.save(newSize);
  }
}
