import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SizeController } from './controllers/size.controller';
import { SizeEntity } from './entities/size.entity';
import { SizeService } from './services/size.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SizeEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [SizeService],
  controllers: [SizeController],
  exports: [SizeService],
})
export class SizeModule {}
