import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

import {
  GameWithContent,
  RevealTilesDto,
  StartGameResponse,
  TileWithContent,
  TileContent,
  RevealTilesResponse,
  GameStatus,
  Scoreboard,
  GetScoresResponse,
} from './dto/game.dto';
import { generateNewGame, mapTilesToTilesWithoutContent } from './utils';

@Injectable()
export class GameService {
  constructor(private authService: AuthService) {}
  private games: GameWithContent[] = [];
  private scoreboard: Scoreboard[] = [];

  startGame(userId: string): StartGameResponse {
    const newGame = generateNewGame(userId);
    this.games.push(newGame);

    const gameWithoutContent: StartGameResponse = {
      ...newGame,
      tiles: mapTilesToTilesWithoutContent(newGame.tiles),
    };

    return gameWithoutContent;
  }

  revealTiles(revealTilesDto: RevealTilesDto): RevealTilesResponse {
    const foundGame = this.games.find(
      (game) => game.gameId === revealTilesDto.gameId,
    );

    if (!foundGame) throw new NotFoundException('Game was not found');
    if (foundGame.status === GameStatus.completed) return;

    // looking for indexes of tiles that need to be updated
    const indexes: number[] = [];
    revealTilesDto.tiles.forEach((payloadTile) => {
      const index = foundGame.tiles.findIndex(
        (tile) => tile.col === payloadTile.col && tile.row === payloadTile.row,
      );

      if (index !== -1) {
        indexes.push(index);
      }
    });

    const revealed: TileWithContent[] = [];

    const updatedGame: GameWithContent = {
      ...foundGame,
      round: (foundGame.round += 1),
      tiles: foundGame.tiles.map((tile, index) => {
        // updating tiles
        if (indexes.includes(index)) {
          const newTile = {
            ...tile,
            isRevealed: true,
          };
          // collecting the ones we updated to send as a response
          revealed.push(newTile);
          return newTile;
        }
        return tile;
      }),
    };

    const treasures = updatedGame.tiles.filter(
      (tile) =>
        tile.isRevealed === true && tile.content === TileContent.TREASURE,
    );

    const status =
      treasures.length === 3 ? GameStatus.completed : GameStatus.started;

    const foundGameIndex = this.games.findIndex(
      (game) => game.gameId === updatedGame.gameId,
    );
    // TODO add real DB
    this.games.splice(foundGameIndex, 1);
    this.games.push({ ...updatedGame, status });

    if (status === GameStatus.completed) {
      this.addToScoreBoard(updatedGame.round, updatedGame.userId);
    }

    return {
      // if we completed the game, send all tiles or only revealed
      tiles: status === GameStatus.completed ? updatedGame.tiles : revealed,
      status: status,
      round: updatedGame.round,
    };
  }

  addToScoreBoard(score: number, userId: string) {
    const user = this.authService.findUserById(userId);
    this.scoreboard.push({
      score,
      user,
    });
  }

  getScores(): GetScoresResponse {
    const topTen = this.scoreboard
      .sort(({ score: a }, { score: b }) => a - b)
      .slice(0, 10);

    return { scores: topTen };
  }

  getCurrentGame(userId: string): StartGameResponse {
    const game = this.games.find(
      (game) => game.userId === userId && game.status !== GameStatus.completed,
    );

    if (!game) return this.startGame(userId);

    const gameWithoutContent: StartGameResponse = {
      ...game,
      tiles: game.tiles.map((tile) => {
        if (tile.isRevealed) return tile;
        return {
          ...tile,
          content: undefined,
        };
      }),
    };

    return gameWithoutContent;
  }
}
