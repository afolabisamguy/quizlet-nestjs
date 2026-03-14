import { Resolver } from '@nestjs/graphql';
import { LobbyService } from './lobby.service';

@Resolver()
export class LobbyResolver {
  constructor(private readonly lobbyService: LobbyService) {}
}
