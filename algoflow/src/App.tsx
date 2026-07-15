import { useCallback, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Legend from "./components/Legend";
import Grid from "./components/Grid";
import { ALGORITHMS } from "./algorithms";
import { generateMazeWalls } from "./mazes";
import { createWalls, makeNodes, sleep, tileId } from "./utils/grid";
import {
  COLS,
  DEFAULT_END,
  DEFAULT_START,
  ROWS,
  SPEED,
} from "./constants";
import type {
  AlgorithmName,
  Coord,
  MazeName,
  SpeedName,
  WallGrid,
} from "./types";

type DragMode = "start" | "end" | "wall" | "erase" | null;

export default function App() {
  const [walls, setWalls] = useState<WallGrid>(createWalls);
  const [start, setStart] = useState<Coord>(DEFAULT_START);
  const [end, setEnd] = useState<Coord>(DEFAULT_END);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>("A-Star");
  const [maze, setMaze] = useState<MazeName>("No Maze");
  const [speed, setSpeed] = useState<SpeedName>("Fast");
  const [running, setRunning] = useState(false);

  const runningRef = useRef(false);
  const mouseDown = useRef(false);
  const dragMode = useRef<DragMode>(null);
  const runId = useRef(0); // bumping this invalidates in-flight animations

  const tileEl = (row: number, col: number) =>
    document.getElementById(tileId(row, col));

  const tileClass = useCallback(
    (
      row: number,
      col: number,
      wallsRef: WallGrid = walls,
      s: Coord = start,
      e: Coord = end
    ): string => {
      if (row === s.row && col === s.col) return "af-tile af-start";
      if (row === e.row && col === e.col) return "af-tile af-end";
      if (wallsRef[row][col]) return "af-tile af-wall";
      return "af-tile";
    },
    [walls, start, end]
  );

  // Repaint every tile from state (wipes visited/path visuals)
  const repaintAll = useCallback(
    (wallsRef: WallGrid = walls, s: Coord = start, e: Coord = end) => {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const el = tileEl(row, col);
          if (el) el.className = tileClass(row, col, wallsRef, s, e);
        }
      }
    },
    [walls, start, end, tileClass]
  );

  /* -------- Run pathfinding -------- */
  const run = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    const myRun = ++runId.current;

    repaintAll();
    const grid = makeNodes(walls);
    const { traversed, path } = ALGORITHMS[algorithm](grid, start, end);
    const delays = SPEED[speed];

    const isEndpoint = (t: Coord) =>
      (t.row === start.row && t.col === start.col) ||
      (t.row === end.row && t.col === end.col);

    for (const tile of traversed) {
      if (runId.current !== myRun) return;
      if (!isEndpoint(tile)) {
        const el = tileEl(tile.row, tile.col);
        if (el) el.className = "af-tile af-visited";
      }
      await sleep(delays.traverse);
    }

    for (const tile of path) {
      if (runId.current !== myRun) return;
      if (!isEndpoint(tile)) {
        const el = tileEl(tile.row, tile.col);
        if (el) el.className = "af-tile af-path";
      }
      await sleep(delays.path);
    }

    runningRef.current = false;
    setRunning(false);
  };

  /* -------- Generate maze -------- */
  const handleMazeChange = async (choice: MazeName) => {
    setMaze(choice);
    if (runningRef.current) return;
    const myRun = ++runId.current;

    if (choice === "No Maze") {
      const cleared = createWalls();
      setWalls(cleared);
      setTimeout(() => repaintAll(cleared), 0);
      return;
    }

    runningRef.current = true;
    setRunning(true);

    const newWalls = generateMazeWalls(choice);
    newWalls[start.row][start.col] = false; // keep endpoints open
    newWalls[end.row][end.col] = false;

    // clear the board visually, then animate the walls in
    const cleared = createWalls();
    setWalls(cleared);
    await sleep(0);
    repaintAll(cleared);

    const order: Coord[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (newWalls[row][col]) order.push({ row, col });
      }
    }

    for (const { row, col } of order) {
      if (runId.current !== myRun) return;
      const el = tileEl(row, col);
      if (el) el.className = "af-tile af-wall af-pop";
      await sleep(SPEED[speed].maze);
    }

    setWalls(newWalls);
    runningRef.current = false;
    setRunning(false);
  };

  /* -------- Mouse interaction -------- */
  const setWall = (row: number, col: number, value: boolean) => {
    if (
      (row === start.row && col === start.col) ||
      (row === end.row && col === end.col)
    ) {
      return;
    }
    setWalls((prev) => {
      const next = prev.map((r) => r.slice());
      next[row][col] = value;
      const el = tileEl(row, col);
      if (el) el.className = value ? "af-tile af-wall af-pop" : "af-tile";
      return next;
    });
  };

  const onTileDown = (row: number, col: number) => {
    if (runningRef.current) return;
    runId.current++; // cancel any lingering animation
    mouseDown.current = true;

    if (row === start.row && col === start.col) dragMode.current = "start";
    else if (row === end.row && col === end.col) dragMode.current = "end";
    else {
      dragMode.current = walls[row][col] ? "erase" : "wall";
      setWall(row, col, dragMode.current === "wall");
    }
  };

  const onTileEnter = (row: number, col: number) => {
    if (!mouseDown.current || runningRef.current) return;
    const mode = dragMode.current;

    if (mode === "wall") setWall(row, col, true);
    else if (mode === "erase") setWall(row, col, false);
    else if (mode === "start") {
      if (walls[row][col] || (row === end.row && col === end.col)) return;
      const prev = start;
      setStart({ row, col });
      const prevEl = tileEl(prev.row, prev.col);
      if (prevEl) prevEl.className = "af-tile";
      const el = tileEl(row, col);
      if (el) el.className = "af-tile af-start";
    } else if (mode === "end") {
      if (walls[row][col] || (row === start.row && col === start.col)) return;
      const prev = end;
      setEnd({ row, col });
      const prevEl = tileEl(prev.row, prev.col);
      if (prevEl) prevEl.className = "af-tile";
      const el = tileEl(row, col);
      if (el) el.className = "af-tile af-end";
    }
  };

  const onMouseUp = () => {
    mouseDown.current = false;
    dragMode.current = null;
  };

  /* -------- Reset -------- */
  const resetBoard = () => {
    runId.current++;
    runningRef.current = false;
    setRunning(false);
    const cleared = createWalls();
    setWalls(cleared);
    setStart(DEFAULT_START);
    setEnd(DEFAULT_END);
    setMaze("No Maze");
    setTimeout(() => repaintAll(cleared, DEFAULT_START, DEFAULT_END), 0);
  };

  return (
    <div
      className="flex min-h-screen w-full select-none flex-col items-center"
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <Navbar
        maze={maze}
        algorithm={algorithm}
        speed={speed}
        running={running}
        onMazeChange={handleMazeChange}
        onAlgorithmChange={setAlgorithm}
        onSpeedChange={setSpeed}
        onRun={run}
        onReset={resetBoard}
      />
      <Legend />
      <Grid
        tileClass={tileClass}
        onTileDown={onTileDown}
        onTileEnter={onTileEnter}
      />
    </div>
  );
}
