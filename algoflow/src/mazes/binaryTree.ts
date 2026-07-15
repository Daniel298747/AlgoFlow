import { COLS, ROWS } from "../constants";
import type { WallGrid } from "../types";

// Binary Tree maze — every passage cell randomly carves down or right.
// Very fast (O(V)) with a characteristic diagonal bias.
export function binaryTreeMaze(): WallGrid {
  const walls: WallGrid = Array.from({ length: ROWS }, () =>
    Array<boolean>(COLS).fill(true)
  );

  for (let r = 1; r < ROWS; r += 2) {
    for (let c = 1; c < COLS; c += 2) {
      walls[r][c] = false;
      const canCarveDown = r + 2 < ROWS;
      const canCarveRight = c + 2 < COLS;

      if (canCarveDown && canCarveRight) {
        if (Math.random() < 0.5) walls[r + 1][c] = false;
        else walls[r][c + 1] = false;
      } else if (canCarveDown) {
        walls[r + 1][c] = false;
      } else if (canCarveRight) {
        walls[r][c + 1] = false;
      }
    }
  }
  return walls;
}
