import { buildPath, neighbors } from "../utils/grid";
import type { Coord, SearchResult, TileNode } from "../types";

// Depth-First Search — dives down one branch before backtracking.
// Does NOT guarantee the shortest path. O(V + E).
export function dfs(
  grid: TileNode[][],
  start: Coord,
  end: Coord
): SearchResult {
  const traversed: TileNode[] = [];
  const stack: TileNode[] = [grid[start.row][start.col]];

  while (stack.length) {
    const tile = stack.pop()!;
    if (tile.traversed || tile.isWall) continue;
    tile.traversed = true;
    traversed.push(tile);
    if (tile.row === end.row && tile.col === end.col) break;

    for (const next of neighbors(grid, tile)) {
      if (!next.traversed && !next.isWall) {
        next.parent = tile; // last writer wins; fine for DFS
        stack.push(next);
      }
    }
  }
  return { traversed, path: buildPath(grid, end) };
}
