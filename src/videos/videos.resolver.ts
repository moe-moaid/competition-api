import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => [Video], { name: 'videos' })
  findAll() {
    return this.videosService.findAll();
  }

  @Mutation(() => Video)
  async createVideo(@Args('createVideoInput') createVideoInput: CreateVideoDto) {
    return this.videosService.create(createVideoInput);
  }

  @Query(() => Video, { name: 'video' })
  async findeOne(@Args('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Mutation(() => Video)
  async removeVideo(@Args('id') id: string) {
    return this.videosService.remove(id);
  }

  // Compute Video URL field
  @ResolveField(() => String)
  videoUrl(@Parent() video: Video): string {
    return `http://localhost:7567${video.filePath}`;
  }
}
