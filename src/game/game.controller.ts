import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GameService } from './game.service';

@UseGuards(AuthGuard('jwt'))
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('start')
  startGame() {
    return this.gameService.startGame();
  }
}
