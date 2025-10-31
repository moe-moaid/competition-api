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
import { VideosService } from './videos.service';

type CategoryType =
  | 'Hip Pop'
  | 'Rap'
  | 'RNB'
  | 'Afrobeat'
  | 'Raggae'
  | 'Dancehall'
  | 'Reggarton'
  | 'Others';

type VideoPostBodyType = {
  fileName: string;
  originalName: string;
  size: number;
  path: string;
  mimetype: string;
  title: string;
  description: string;
  category: CategoryType;
  artistId: number;
};
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `video-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(mp4|avi|mkv|mov|webm)$/)) {
          return callback(new Error('Only video files are allwed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 100 * 1024 * 1024, //100MB file size allwed
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: VideoPostBodyType,
  ) {
    const filePath = `uploads/videos/${file.filename}`;
    const video = await this.videosService.UploadVideo(body, filePath); // Actually save to DB

    return {
      id: video.id,
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      path: `/uploads/videos/${file.filename}`,
      mimetype: file.mimetype,
      title: body.title,
      description: body.description,
      category: body.category,
      artistId: body.artistId,
    };
  }

  @Get()
  async listVideos() {
    const videos = await this.videosService.findAll();
    return videos;
  }
}
