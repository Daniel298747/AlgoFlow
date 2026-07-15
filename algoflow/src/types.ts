export interface Coord {
  row: number;
  col: number;
}

export interface TileNode extends Coord {
  isWall: boolean;
  traversed: boolean;
  distance: number;
  parent: TileNode | null;
}

export type WallGrid = boolean[][];

export interface SearchResult {
  traversed: TileNode[];
  path: TileNode[];
}

export type AlgorithmName = "BFS" | "DFS" | "Dijkstra" | "A-Star" | "Greedy";

export type MazeName =
  | "No Maze"
  | "Binary Tree"
  | "Recursive Division"
  | "Random Select";

export type SpeedName = "Slow" | "Medium" | "Fast";
