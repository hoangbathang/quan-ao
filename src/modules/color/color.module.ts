import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductEntity } from '../product/entities/product.entity';
import { ColorController } from './controllers/color.controller';
import { ColorEntity } from './entitis/color.entity';
import { ColorService } from './services/color.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColorEntity, ProductEntity]),
    forwardRef(() => AuthModule),
  ],

  providers: [ColorService],
  controllers: [ColorController],
  exports: [ColorService],
})
export class ColorModule {}
