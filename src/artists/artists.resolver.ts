import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';
import { Video } from 'src/videos/entities/video.entity';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => [Artist], { name: 'artists' })
  findAll() {
    return this.artistsService.findAll();
  }

  @ResolveField(() => [Video], { name: 'videos' })
  videos(@Parent() artist: Artist) {
    return this.artistsService.findVideosByArtistId(artist.id);
  }
}
