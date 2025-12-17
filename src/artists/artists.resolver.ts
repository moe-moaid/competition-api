import { Resolver, Query, ResolveField, Parent, Args, Int, Context } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';
import { Video } from 'src/videos/entities/video.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

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

  @Query(() => Artist)
  @UseGuards(JwtAuthGuard)
  me(@Context() { req }) {
    return this.artistsService.findSingleArtist(req.user.sub);
  }

}
