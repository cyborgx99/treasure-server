import { User } from 'src/auth/dto/auth.dto';

export enum TileContent {
  TREASURE = 'T',
  THREE = '3',
  TWO = '2',
  ONE = '1',
}

export enum GameStatus {
  completed = 'completed',
  uninitialized = 'uninitialized',
  notFound = 'notFound',
  started = 'started',
}

export class Tile {
  row: number;
  col: number;
  isRevealed: boolean;
}

export class TileWithContent extends Tile {
  content: TileContent;
}

export class GameBase {
  gameId: string;
  userId: string;
  status: GameStatus;
  round: number;
}

export class GameWithContent extends GameBase {
  tiles: TileWithContent[];
}

export class StartGameResponse extends GameBase {
  tiles: Tile[];
}

export class RevealTilesDto {
  tiles: Tile[];
  gameId: string;
}

export class RevealTilesResponse {
  tiles: Tile[];
  status: GameStatus;
  round: number;
}

export class Scoreboard {
  score: number;
  user: User;
}

export class GetScoresResponse {
  scores: Scoreboard[];
}
