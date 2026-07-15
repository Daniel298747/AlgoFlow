import { COLS, ROWS } from "../constants";
import type { Coord, TileNode, WallGrid } from "../types";

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const createWalls = (): WallGrid =>
  Array.from({ length: ROWS }, () => Array<boolean>(COLS).fill(false));

export const makeNodes = (walls: WallGrid): TileNode[][] =>
  Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => ({
      row,
      col,
      isWall: walls[row][col],
      traversed: false,
      distance: Infinity,
      parent: null,
    }))
  );

export const neighbors = (grid: TileNode[][], t: TileNode): TileNode[] => {
  const out: TileNode[] = [];
  if (t.row > 0) out.push(grid[t.row - 1][t.col]);
  if (t.row < ROWS - 1) out.push(grid[t.row + 1][t.col]);
  if (t.col > 0) out.push(grid[t.row][t.col - 1]);
  if (t.col < COLS - 1) out.push(grid[t.row][t.col + 1]);
  return out;
};

export const manhattan = (a: Coord, b: Coord): number =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

// Walk parent pointers back from the end tile to reconstruct the path.
export const buildPath = (grid: TileNode[][], end: Coord): TileNode[] => {
  const path: TileNode[] = [];
  let tile: TileNode | null = grid[end.row][end.col];
  if (!tile.traversed) return path; // end was never reached
  while (tile) {
    path.unshift(tile);
    tile = tile.parent;
  }
  return path;
};

// Stable DOM id per tile so animations can update classes directly
// during playback without re-rendering the whole grid.
export const tileId = (row: number, col: number): string =>
  `tile-${row}-${col}`;
