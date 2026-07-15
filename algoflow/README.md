# AlgoFlow

AlgoFlow is an interactive pathfinding and maze generation visualizer built with modern web technologies. Watch how classic graph algorithms explore a grid in real time, with full control over the algorithm, animation speed, and wall layout.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS

## Features

- **Five pathfinding algorithms** — BFS, DFS, Dijkstra's, A* (Manhattan heuristic), and Greedy Best-First
- **Maze generation** — Binary Tree, Recursive Division, or a random pick between the two
- **Manual wall drawing** — click or drag on the grid to add and remove walls
- **Movable endpoints** — drag the start and end tiles anywhere on the board
- **Three animation speeds** — slow, medium, and fast

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (opens at http://localhost:5173)
npm run dev

# type-check and build for production
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── algorithms/   # BFS, DFS, Dijkstra, A*, Greedy implementations
├── mazes/        # Binary Tree and Recursive Division generators
├── components/   # Navbar, Legend, and Grid UI components
├── utils/        # Grid helpers (nodes, neighbors, path building)
├── constants.ts  # Grid dimensions, speeds, default endpoints
├── types.ts      # Shared TypeScript types
└── App.tsx       # State, animation, and interaction logic
```

## The Algorithms

### Pathfinding

| Algorithm | Shortest path? | How it explores |
| --- | --- | --- |
| BFS | Yes | Expands outward level by level from the start, like ripples in water |
| DFS | No | Dives down one branch as far as possible before backtracking |
| Dijkstra's | Yes | Always expands the unvisited node with the smallest total distance from the start |
| A* | Yes | Dijkstra's plus a Manhattan-distance estimate to the goal, so it heads toward the target |
| Greedy Best-First | No | Ranks nodes only by their estimated distance to the goal — fast, but can pick longer routes |

BFS and DFS run in O(V + E). The three priority-queue searches run in O((V + E) log V). On this grid every tile has at most four neighbours, so E ≈ 4V.

### Maze Generation

- **Binary Tree** — for each cell, randomly carve a passage down or right. Very fast (O(V)) with a recognizable diagonal bias.
- **Recursive Division** — start with an open field, then recursively split it with walls, leaving one gap per wall. Produces well-structured, always-solvable mazes in O(V log V).

## Deployment

The build output in `dist/` is a static site, so it can be hosted anywhere — Netlify, Vercel, or GitHub Pages. On Netlify, connect the repo and set the build command to `npm run build` with `dist` as the publish directory.
