import {
  GameStatus,
  GameWithContent,
  Tile,
  TileWithContent,
  TileContent,
} from './dto/game.dto';
import { v4 as uuid } from 'uuid';

const tiles: TileWithContent[] = [
  {
    row: 1,
    col: 1,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 1,
    col: 2,
    content: TileContent.TREASURE,
    isRevealed: false,
  },
  {
    row: 1,
    col: 3,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 1,
    col: 4,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 1,
    col: 5,
    content: TileContent.ONE,
    isRevealed: false,
  },

  {
    row: 2,
    col: 1,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 2,
    col: 2,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 2,
    col: 3,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 2,
    col: 4,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 2,
    col: 5,
    content: TileContent.TWO,
    isRevealed: false,
  },

  {
    row: 3,
    col: 1,
    content: TileContent.ONE,
    isRevealed: false,
  },
  {
    row: 3,
    col: 2,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 3,
    col: 3,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 3,
    col: 4,
    content: TileContent.TREASURE,
    isRevealed: false,
  },
  {
    row: 3,
    col: 5,
    content: TileContent.THREE,
    isRevealed: false,
  },

  {
    row: 4,
    col: 1,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 4,
    col: 2,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 4,
    col: 3,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 4,
    col: 4,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 4,
    col: 5,
    content: TileContent.TWO,
    isRevealed: false,
  },

  {
    row: 5,
    col: 1,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 5,
    col: 2,
    content: TileContent.TREASURE,
    isRevealed: false,
  },
  {
    row: 5,
    col: 3,
    content: TileContent.THREE,
    isRevealed: false,
  },
  {
    row: 5,
    col: 4,
    content: TileContent.TWO,
    isRevealed: false,
  },
  {
    row: 5,
    col: 5,
    content: TileContent.ONE,
    isRevealed: false,
  },
];

// TODO improve generating "algorithm"
export const generateGameBoard = () => tiles;

export const generateNewGame = (userId: string): GameWithContent => {
  return {
    gameId: uuid(),
    tiles: generateGameBoard(),
    status: GameStatus.started,
    round: 0,
    userId,
  };
};

export const mapTilesToTilesWithoutContent = (
  tiles: TileWithContent[],
): Tile[] => {
  return tiles.map<Tile>((tile) => ({
    row: tile.row,
    col: tile.col,
    isRevealed: tile.isRevealed,
  }));
};
