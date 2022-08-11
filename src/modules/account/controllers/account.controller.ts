import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpException,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserTypes } from '../account.contant';
import { AccountEntity } from '../entities/account.entity';
import { CreateAccountPayload } from '../payloads/create-account.payload';
import { UpdateInforAccountPayload } from '../payloads/updateInforAccount.payload';
import { AccountService } from '../services/account.service';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  @Get('me')
  @Roles(UserTypes.user)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async me(@CurrentUser() user: AccountEntity) {
    const account = await this.accountService.findbyId(user.id);
    return account;
  }
  @Post('register')
  async register(@Body() body: CreateAccountPayload) {
    return await this.accountService.create(body);
  }
  @Post('update')
  @Roles(UserTypes.user)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  async updateInforUser(
    @CurrentUser() user: AccountEntity,
    @Body() body: UpdateInforAccountPayload,
  ) {
    return this.accountService.UpdateInforUser(user.id, body);
  }

  @Get('issignedin')
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  @Roles(UserTypes.user)
  async isSignedIn(@CurrentUser() user: AccountEntity): Promise<boolean> {
    try {
      const account = await this.accountService.findbyId(user.id);
      if (account) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
