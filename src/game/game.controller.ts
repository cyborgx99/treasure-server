import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/auth/dto/auth.dto';
import {
  GetScoresResponse,
  RevealTilesDto,
  RevealTilesResponse,
  StartGameResponse,
} from './dto/game.dto';
import { GameService } from './game.service';

@UseGuards(AuthGuard('jwt'))
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('start')
  startGame(@Req() request: Request): StartGameResponse {
    const user = <User>request.user;
    return this.gameService.startGame(user.id);
  }

  @Post('reveal')
  revealTiles(@Body() tilesToReveal: RevealTilesDto): RevealTilesResponse {
    return this.gameService.revealTiles(tilesToReveal);
  }

  @Get('scoreboard')
  getScores(): GetScoresResponse {
    return this.gameService.getScores();
  }

  @Get('current')
  getCurrentGame(@Req() request: Request): StartGameResponse {
    const user = <User>request.user;
    return this.gameService.getCurrentGame(user.id);
  }
}
