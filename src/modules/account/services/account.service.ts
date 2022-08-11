import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserDetailDto } from '../dtos/getuser.dto';
import { AccountEntity } from '../entities/account.entity';
import { CreateAccountPayload } from '../payloads/create-account.payload';
import { UpdateInforAccountPayload } from '../payloads/updateInforAccount.payload';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}
  async findbyId(id: number) {
    const user = await this.accountRepository.findOne({
      where: {
        id,
      },
    });
    return new GetUserDetailDto(user);
  }
  async findAll() {
    return await this.accountRepository.find();
  }
  async UpdateInforUser(id: number, payload: UpdateInforAccountPayload) {
    const user = await this.accountRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      Object.assign(user, payload);
      const newUser = await this.accountRepository.save(user);
      return new GetUserDetailDto(newUser);
    } else {
      throw new HttpException('Không tìm thấy tài khoản', 400);
    }
  }

  async create(payload: CreateAccountPayload) {
    const checkAccount = await this.accountRepository
      .createQueryBuilder('account')
      .where('email=:email ', {
        email: payload.email,
      })
      .getOne();
    if (checkAccount) {
      throw new HttpException('Địa chỉ email đã tồn tại', 400);
    }
    const newAccount = this.accountRepository.create(payload);
    await this.accountRepository.save(newAccount);
    return {
      message: 'Đăng ký tài khoản thành công',
    };
  }
}
