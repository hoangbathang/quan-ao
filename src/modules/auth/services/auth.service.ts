import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { AccountService } from 'src/modules/account/services/account.service';
import { Repository } from 'typeorm';
import { LoginPayload } from '../payloads/login.payload';
import { sign, SignOptions, verify, destroy } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserTypes } from 'src/modules/account/account.contant';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
  ) {}
  async login(payload: LoginPayload) {
    const { email, password } = payload;
    // eslint-disable-next-line prefer-const
    let account: AccountEntity = await this.accountRepository
      .createQueryBuilder('account')
      .where('email =:email', {
        email,
      })
      .getOne();
    if (!account) {
      throw new HttpException('Không tồn tại Email', 400);
    }
    if (account.password != password) {
      throw new HttpException('Sai mật khẩu', 400);
    }
    return {
      token: this.generateJWT(account),
      user: account,
    };
  }
  generateJWT(auth: AccountEntity, options: SignOptions = {}) {
    const newOptions: SignOptions = {
      expiresIn: 60 * 60 * 24 * 7,
      ...(options || {}),
    };
    return sign(
      {
        id: auth.id,
        email: auth.email,
        password: auth.password,
        type: auth.type,
      },
      this.configService.get('jwtSecrect'),
      newOptions,
    );
  }
  verifyJWT(token: string) {
    return verify(token, this.configService.get('jwtSecrect'));
  }
  async getAccountFromJWT(jwtToken: string) {
    const auth = this.verifyJWT(jwtToken) as {
      id: number;
      email: string;
      password: string;
      type: UserTypes;
    };
    if (!auth) {
      throw new HttpException('lỗi convert', 400);
    }
    return auth;
  }
}
