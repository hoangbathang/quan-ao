import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ImageService } from '../services/image.service';
import { Express } from 'express';
import { AddImagePayload } from '../payloads/addimage.payload';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { ApiMultiFile } from '../mutifile/apimutifile';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { UserTypes } from 'src/modules/account/account.contant';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

@ApiTags('img')
@Controller('img')
export class ImageController {
  constructor(private ImageService: ImageService) {}
  @Get('/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(filename, {
      root: `${process.cwd()}/src/img/products`,
    });
  }
  @Post('/upload')
  @Roles(UserTypes.admin)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = `${process.cwd()}/src/img/products`;
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: any, @Body() body) {
    const url_img = files.map((item) => {
      return item.filename;
    });
    return this.ImageService.addImage(body.id_product, url_img);
  }
}
