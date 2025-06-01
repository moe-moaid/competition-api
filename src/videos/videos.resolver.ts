import { Resolver, Query } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => [Video], { name: 'videos' })
  findAll() {
    return this.videosService.findAll();
  }
}
