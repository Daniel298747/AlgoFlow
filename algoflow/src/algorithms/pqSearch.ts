import { buildPath, neighbors } from "../utils/grid";
import type { Coord, SearchResult, TileNode } from "../types";

// Generic priority-queue search shared by Dijkstra, A*, and Greedy.
// `key(tile)` decides expansion order:
//   Dijkstra: g (distance from start)
//   A*:       g + h (heuristic to goal)
//   Greedy:   h only
// O((V + E) log V) with a real heap; the array sort here is fine for
// a grid of this size and keeps the code easy to follow.
export function pqSearch(
  grid: TileNode[][],
  start: Coord,
  end: Coord,
  key: (tile: TileNode) => number
): SearchResult {
  const traversed: TileNode[] = [];
  const startTile = grid[start.row][start.col];
  startTile.distance = 0;

  const open: TileNode[] = [startTile];
  while (open.length) {
    open.sort((a, b) => key(a) - key(b));
    const tile = open.shift()!;
    if (tile.traversed) continue;
    tile.traversed = true;
    traversed.push(tile);
    if (tile.row === end.row && tile.col === end.col) break;

    for (const next of neighbors(grid, tile)) {
      if (next.isWall || next.traversed) continue;
      const newDistance = tile.distance + 1;
      if (newDistance < next.distance) {
        next.distance = newDistance;
        next.parent = tile;
      }
      open.push(next);
    }
  }
  return { traversed, path: buildPath(grid, end) };
}
