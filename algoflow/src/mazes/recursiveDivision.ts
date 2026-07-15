import { COLS, ROWS } from "../constants";
import { createWalls } from "../utils/grid";
import type { WallGrid } from "../types";

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Recursive Division — start with an open field bounded by walls, then
// recursively split it with a wall containing a single gap. O(V log V).
export function recursiveDivisionMaze(): WallGrid {
  const walls = createWalls();

  for (let r = 0; r < ROWS; r++) {
    walls[r][0] = true;
    walls[r][COLS - 1] = true;
  }
  for (let c = 0; c < COLS; c++) {
    walls[0][c] = true;
    walls[ROWS - 1][c] = true;
  }

  const divide = (row: number, col: number, height: number, width: number) => {
    if (height < 3 || width < 3) return;
    const horizontal =
      height > width ? true : width > height ? false : Math.random() < 0.5;

    if (horizontal) {
      // wall on an even row, gap on an odd column
      const wallRows: number[] = [];
      for (let r = row + 1; r < row + height - 1; r += 2) wallRows.push(r);
      const gapCols: number[] = [];
      for (let c = col; c < col + width; c += 2) gapCols.push(c);

      const wallRow = pick(wallRows);
      const gapCol = pick(gapCols);
      for (let c = col; c < col + width; c++) {
        if (c !== gapCol) walls[wallRow][c] = true;
      }
      divide(row, col, wallRow - row, width);
      divide(wallRow + 1, col, row + height - wallRow - 1, width);
    } else {
      // wall on an even column, gap on an odd row
      const wallCols: number[] = [];
      for (let c = col + 1; c < col + width - 1; c += 2) wallCols.push(c);
      const gapRows: number[] = [];
      for (let r = row; r < row + height; r += 2) gapRows.push(r);

      const wallCol = pick(wallCols);
      const gapRow = pick(gapRows);
      for (let r = row; r < row + height; r++) {
        if (r !== gapRow) walls[r][wallCol] = true;
      }
      divide(row, col, height, wallCol - col);
      divide(row, wallCol + 1, height, col + width - wallCol - 1);
    }
  };

  divide(1, 1, ROWS - 2, COLS - 2);
  return walls;
}
