import { Resolver, Query, ResolveField, Parent, Args, Int } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';
import { Video } from 'src/videos/entities/video.entity';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => [Artist], { name: 'artists', nullable: true })
  findAll() {
    return this.artistsService.findAll();
  }

 @Query(() => Artist, { name: 'artist', nullable: true })
  findOne(@Args('id', { type: () =>  Int }) id: number ) {
    return this.artistsService.findSingleArtist(id);
  }

  @ResolveField(() => [Video], { name: 'videos' })
  videos(@Parent() artist: Artist) {
    return this.artistsService.findVideosByArtistId(artist.id);
  }
}
