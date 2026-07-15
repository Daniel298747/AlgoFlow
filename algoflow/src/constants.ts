import type { Coord, SpeedName } from "./types";

// Grid dimensions must be odd: the maze generators place passages on
// odd coordinates and walls on even lines.
export const ROWS = 23;
export const COLS = 39;

// Must stay in sync with .af-tile in src/index.css
export const TILE_SIZE = 22;

export const DEFAULT_START: Coord = { row: 1, col: 1 };
export const DEFAULT_END: Coord = { row: ROWS - 2, col: COLS - 2 };

// Delay (ms) per animation step, keyed by speed setting
export const SPEED: Record<
  SpeedName,
  { traverse: number; path: number; maze: number }
> = {
  Slow: { traverse: 35, path: 60, maze: 18 },
  Medium: { traverse: 14, path: 35, maze: 8 },
  Fast: { traverse: 5, path: 22, maze: 3 },
};
