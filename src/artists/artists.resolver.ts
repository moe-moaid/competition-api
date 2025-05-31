import { Resolver, Query } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';

@Resolver()
export class ArtistsResolver {
constructor(private readonly ArtistsService: ArtistsService) {}

  @Query(() => [Artist], { name: 'artists' })
  findAll() {
    return this.ArtistsService.findAll();
  }
}
