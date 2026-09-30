# AlgoFlow

AlgoFlow is an interactive pathfinding and maze generation visualizer built using modern web technologies. It allows users to explore how different algorithms work through smooth animations and full user control over speed, algorithms and wall placement.

## 🌐 Live Demo

**[Try it now → daniel298747.github.io/AlgoFlow](https://daniel298747.github.io/AlgoFlow/)**

Runs entirely in the browser — nothing to install.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS

## Inspiration

I built AlgoFlow after covering graph traversal and shortest-path algorithms in my Computer Science course. Reading about BFS, Dijkstra's and A* on paper is one thing, but I wanted to actually see how they explore a grid differently — why A* heads straight for the goal while BFS fans out evenly in every direction. Turning the theory into something visual made the differences click in a way the lecture slides never quite did.

It was also a chance to get hands-on with a proper front-end stack — React with TypeScript, Vite as the build tool, and Tailwind for styling — and to practise structuring a project into clean, separated modules rather than one giant file.

## Features

- **Visualize pathfinding algorithms:** BFS, DFS, Greedy, Dijkstra's, and A* (with a Manhattan-distance heuristic)
- **Maze generation:** Create walls manually or generate random mazes using:
  - Binary Tree algorithm
  - Recursive Division algorithm
  - Random selection between the two
- **Adjustable animation speeds:** Choose between slow, medium, or fast
- **Interactive UI:** Click and drag to add or remove walls, and drag the start and end tiles to reposition them

## Algorithms Explained

### Pathfinding Algorithms

#### 🔹 Breadth-First Search (BFS)

- **Type:** Unweighted
- **Time Complexity:** O(V + E) — V is the number of tiles, E the number of neighbour connections (≈ 4V on a grid)
- **Guarantees Shortest Path:** ✅
- **How it works:** Explores all neighbours of a node before moving to the next level. Think of it as expanding outward in circles.

#### 🔹 Depth-First Search (DFS)

- **Type:** Unweighted
- **Time Complexity:** O(V + E)
- **Guarantees Shortest Path:** ❌
- **How it works:** Explores one neighbour fully before backtracking. It may dive deep into a single branch before trying alternatives.

#### 🔹 Dijkstra's Algorithm

- **Type:** Weighted (but all weights = 1 on this grid)
- **Time Complexity:** O((V + E) log V)
- **Guarantees Shortest Path:** ✅
- **How it works:** Uses a priority queue to always explore the closest unvisited node first, based on total distance from the start. Expands outward intelligently.

#### 🔹 A* Search

- **Type:** Weighted with heuristic
- **Time Complexity:** O((V + E) log V)
- **Guarantees Shortest Path:** ✅ (with an admissible heuristic like Manhattan distance)
- **How it works:** Like Dijkstra's, but adds a heuristic estimate to prioritise nodes closer to the goal. Much faster in practice.

#### 🔹 Greedy Best-First Search

- **Type:** Heuristic-only
- **Time Complexity:** O((V + E) log V)
- **Guarantees Shortest Path:** ❌
- **How it works:** Prioritises nodes purely by their estimated distance to the goal, ignoring the actual cost to reach them. Fast and visually efficient, but can take suboptimal paths.

### Maze Generation Algorithms

#### Manual Wall Placement

Click or drag on any grid tile to add or remove a wall. Great for testing specific cases.

#### Binary Tree Maze

- **Time Complexity:** O(V)
- **Description:** A simple randomized algorithm that carves passages using only right and down directions. Fast, but produces a recognizable diagonal bias.

#### Recursive Division

- **Time Complexity:** O(V log V)
- **Description:** Recursively divides the grid into sections with walls and single openings. Creates visually interesting, always-solvable mazes.

## Run Locally

You only need this if you want to work on the code — the [live demo](https://daniel298747.github.io/AlgoFlow/) needs no setup. Requires [Node.js](https://nodejs.org/) 18+.

```bash
# clone the repo and move into the app folder
git clone https://github.com/Daniel298747/AlgoFlow.git
cd AlgoFlow/algoflow

# install dependencies
npm install

# start the dev server (opens at http://localhost:5173)
npm run dev

# build for production
npm run build

# preview the production build (served at http://localhost:4173/AlgoFlow/)
npm run preview
```

## Deployment

Every push to `main` is built and published to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It can also be run manually from the **Actions** tab.

## Acknowledgements

Thanks to TechStrap on YouTube, whose tutorials on building grids and implementing algorithms on them were a big help while learning how to structure this kind of project. A visualizer like this is a well-loved learning project in the CS community, and it was a great way to turn algorithm theory into something I could see and interact with.
