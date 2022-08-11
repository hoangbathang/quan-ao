import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductEntity } from '../product/entities/product.entity';
import { ImageController } from './controllers/image.controller';
import { ImageEntity } from './entitis/image.entity';
import { ImageService } from './services/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity, ProductEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
