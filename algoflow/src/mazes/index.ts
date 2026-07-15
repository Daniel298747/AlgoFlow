import { binaryTreeMaze } from "./binaryTree";
import { recursiveDivisionMaze } from "./recursiveDivision";
import type { MazeName, WallGrid } from "../types";

// Resolve a maze menu choice to a wall grid.
// "Random Select" picks one of the two generators at random.
export function generateMazeWalls(
  choice: Exclude<MazeName, "No Maze">
): WallGrid {
  let type = choice;
  if (type === "Random Select") {
    type = Math.random() < 0.5 ? "Binary Tree" : "Recursive Division";
  }
  return type === "Binary Tree" ? binaryTreeMaze() : recursiveDivisionMaze();
}
