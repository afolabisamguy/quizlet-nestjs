import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyResolver } from './lobby.resolver';

@Module({
  providers: [LobbyResolver, LobbyService],
})
export class LobbyModule {}
