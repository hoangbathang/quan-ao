import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserTypes } from 'src/modules/account/account.contant';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { v4 as uuid } from 'uuid';
import { ApiMultiFile } from '../mutifile/apimutifile';
import { AddColorPayload } from '../payloads/addColor.payload';
import { AddColorProductPayload } from '../payloads/addColorProduct.payload';
import { ColorService } from '../services/color.service';
@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}
  @Get('/img/:filename')
  async getfile(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(filename, { root: `${process.cwd()}/src/img/colors` });
  }

  @Post('/upload')
  @Roles(UserTypes.admin)
  @ApiBearerAuth('authorization')
  @UseGuards(RoleGuard)
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = `${process.cwd()}/src/img/colors`;
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
  async uploadMultipleFiles(
    @UploadedFiles() files: any,
    @Body() body: AddColorPayload,
  ) {
    const url_img = files[0].filename;
    return this.colorService.addColor(body, url_img);
  }
}
