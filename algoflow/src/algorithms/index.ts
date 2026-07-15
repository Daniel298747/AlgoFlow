import { bfs } from "./bfs";
import { dfs } from "./dfs";
import { pqSearch } from "./pqSearch";
import { manhattan } from "../utils/grid";
import type {
  AlgorithmName,
  Coord,
  SearchResult,
  TileNode,
} from "../types";

type Runner = (grid: TileNode[][], start: Coord, end: Coord) => SearchResult;

export const ALGORITHMS: Record<AlgorithmName, Runner> = {
  BFS: bfs,
  DFS: dfs,
  Dijkstra: (grid, start, end) =>
    pqSearch(grid, start, end, (t) => t.distance),
  "A-Star": (grid, start, end) =>
    pqSearch(grid, start, end, (t) => t.distance + manhattan(t, end)),
  Greedy: (grid, start, end) =>
    pqSearch(grid, start, end, (t) => manhattan(t, end)),
};
