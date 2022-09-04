import {
  GameStatus,
  GameWithContent,
  Tile,
  TileWithContent,
  TileContent,
} from './dto/game.dto';
import { v4 as uuid } from 'uuid';

type TileMap = {
  [key: string]: TileWithContent;
};

const generateTileObject = (row: number, col: number, content: TileContent) => {
  const generatedTile = {
    row: row,
    col: col,
    content: content,
    isRevealed: false,
  };

  return generatedTile;
};

const generateContent = (
  tile: Tile,
  content: TileContent,
  tileMap: TileMap,
) => {
  if (tile.row + 1 <= 5) {
    const row = tile.row + 1;
    const col = tile.col;

    const generatedTile = generateTileObject(row, col, content);

    if (!tileMap[`${generatedTile.row}:${generatedTile.col}`]) {
      tileMap[`${generatedTile.row}:${generatedTile.col}`] = generatedTile;
    }
  }
  if (tile.row - 1 >= 1) {
    const row = tile.row - 1;
    const col = tile.col;

    const generatedTile = generateTileObject(row, col, content);

    if (!tileMap[`${generatedTile.row}:${generatedTile.col}`]) {
      tileMap[`${generatedTile.row}:${generatedTile.col}`] = generatedTile;
    }
  }
  if (tile.col + 1 <= 5) {
    const row = tile.row;
    const col = tile.col + 1;

    const generatedTile = generateTileObject(row, col, content);

    if (!tileMap[`${generatedTile.row}:${generatedTile.col}`]) {
      tileMap[`${generatedTile.row}:${generatedTile.col}`] = generatedTile;
    }
  }
  if (tile.col - 1 >= 1) {
    const row = tile.row;
    const col = tile.col - 1;

    const generatedTile = generateTileObject(row, col, content);

    if (!tileMap[`${generatedTile.row}:${generatedTile.col}`]) {
      tileMap[`${generatedTile.row}:${generatedTile.col}`] = generatedTile;
    }
  }
};

export const generateEmptyTiles = (maxRow = 5, maxCol = 5): Tile[] => {
  const tiles: Tile[] = [];

  // generate empty 5x5 board
  for (let row = 1; row <= maxRow; row++) {
    for (let col = 1; col <= maxCol; col++) {
      const tile = {
        row,
        col,
        isRevealed: false,
      };
      tiles.push(tile);
    }
  }

  return tiles;
};

//TODO potentially improve the complexity of the generating logic.
export const generateGameBoard = (): TileWithContent[] => {
  const tiles = generateEmptyTiles();

  const tileMap: TileMap = {};
  const copy = [...tiles];

  // shuffling the array and picking 3 random tiles to make them treausres.
  const shuffled = copy.sort(() => 0.5 - Math.random());
  const treasures = shuffled.slice(0, 3);

  treasures.forEach((treasure) => {
    const tile = {
      ...treasure,
      content: TileContent.TREASURE,
      isRevealed: false,
    };

    tileMap[`${tile.row}:${tile.col}`] = tile;

    // for each treasure generating relevant "3" positions
    generateContent(tile, TileContent.THREE, tileMap);
  });

  Object.values(tileMap)
    .filter((item) => item.content === TileContent.THREE)
    .forEach((tile) => {
      // for each "3" generating relevant "2" positions
      generateContent(tile, TileContent.TWO, tileMap);
    });

  shuffled.forEach((item) => {
    const one = {
      ...item,
      content: TileContent.ONE,
      isRevealed: false,
    };

    if (!tileMap[`${one.row}:${one.col}`]) {
      tileMap[`${one.row}:${one.col}`] = one;
    }
  });

  // maping over the initial tiles to preserve the original position,
  // and returning the relevant tile with content
  const result = tiles.map((tile) => {
    return tileMap[`${tile.row}:${tile.col}`];
  });

  return result;
};

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
