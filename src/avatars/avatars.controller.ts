import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AvatarService } from './avatars.service';

@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `avatar-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpeg|png|jpg)$/)) {
          return callback(new Error('Only images with jpeg, png, or jpg extension are allwed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, //5MB file size allwed
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = `uploads/avatars/${file.filename}`;
    const avatar = await this.avatarService.UploadImage(filePath); // Actually save to DB

    return {
      id: avatar.id,
      path: `/uploads/avatars/${file.filename}`,
    };
  }

  @Get()
  async getAvatar() {
    const avatar = await this.avatarService.findAll();
    return avatar;
  }
}
