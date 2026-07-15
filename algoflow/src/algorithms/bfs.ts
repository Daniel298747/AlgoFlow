import { buildPath, neighbors } from "../utils/grid";
import type { Coord, SearchResult, TileNode } from "../types";

// Breadth-First Search — explores level by level; guarantees the
// shortest path on an unweighted grid. O(V + E).
export function bfs(
  grid: TileNode[][],
  start: Coord,
  end: Coord
): SearchResult {
  const traversed: TileNode[] = [];
  const startTile = grid[start.row][start.col];
  startTile.traversed = true;
  startTile.distance = 0;

  const queue: TileNode[] = [startTile];
  while (queue.length) {
    const tile = queue.shift()!;
    traversed.push(tile);
    if (tile.row === end.row && tile.col === end.col) break;

    for (const next of neighbors(grid, tile)) {
      if (!next.traversed && !next.isWall) {
        next.traversed = true;
        next.parent = tile;
        next.distance = tile.distance + 1;
        queue.push(next);
      }
    }
  }
  return { traversed, path: buildPath(grid, end) };
}
