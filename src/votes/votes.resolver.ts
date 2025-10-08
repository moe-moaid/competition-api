import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly votesService: VotesService) {}

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.votesService.findAll();
  }
}

