import { Resolver, Query } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';

@Resolver(() => Artist)
export class ArtistsResolver {
constructor(private readonly artistsService: ArtistsService) {}

  @Query(() => [Artist], { name: 'artists' })
  findAll() {
    return this.artistsService.findAll();
  }
}
