import { Controller, Post, UseInterceptors, UploadedFile, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from "path";
import { VideosService } from "./videos.service";

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('video', {
            storage: diskStorage({
                destination: './uploads/videos',
                filename: (req, file, callback) => {
                    console.log('my file ==', file);
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `video-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(mp4|avi|mkv|mov|webm)$/)) {
                    return callback(new Error('Only video files are allwed!'), false);
                }
                console.log('mainFunc ===', file);
                
                callback(null, true);
            },
            limits: {
                fileSize: 100* 1024 * 1024 //100MB file size allwed
            },
        }),
    )
    async uploadVideo(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        console.log('fileName ===', file);
        
        return {
            fileName: file.filename,
            originalName: file.originalname,
            size: file.size,
            path: `/uploads/videos/${file.filename}`,
            mimetype: file.mimetype,
        };
    }
}