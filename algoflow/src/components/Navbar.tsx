import type { AlgorithmName, MazeName, SpeedName } from "../types";

interface NavbarProps {
  maze: MazeName;
  algorithm: AlgorithmName;
  speed: SpeedName;
  running: boolean;
  onMazeChange: (maze: MazeName) => void;
  onAlgorithmChange: (algorithm: AlgorithmName) => void;
  onSpeedChange: (speed: SpeedName) => void;
  onRun: () => void;
  onReset: () => void;
}

export default function Navbar({
  maze,
  algorithm,
  speed,
  running,
  onMazeChange,
  onAlgorithmChange,
  onSpeedChange,
  onRun,
  onReset,
}: NavbarProps) {
  const selectClass =
    "rounded-md border border-gray-700 bg-gray-800 px-2.5 py-1.5 text-sm " +
    "text-gray-200 outline-none disabled:cursor-not-allowed";

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-gray-800 bg-[#161b22] px-6 py-3">
      <h1 className="text-xl font-semibold tracking-wide text-gray-100">
        AlgoFlow
      </h1>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col">
          <span className="mb-0.5 text-[10px] tracking-wide text-gray-400">
            Maze
          </span>
          <select
            className={selectClass}
            value={maze}
            disabled={running}
            onChange={(e) => onMazeChange(e.target.value as MazeName)}
          >
            <option>No Maze</option>
            <option>Binary Tree</option>
            <option>Recursive Division</option>
            <option>Random Select</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-0.5 text-[10px] tracking-wide text-gray-400">
            Graph
          </span>
          <select
            className={selectClass}
            value={algorithm}
            disabled={running}
            onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmName)}
          >
            <option>BFS</option>
            <option>DFS</option>
            <option>Dijkstra</option>
            <option>A-Star</option>
            <option>Greedy</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-0.5 text-[10px] tracking-wide text-gray-400">
            Speed
          </span>
          <select
            className={selectClass}
            value={speed}
            disabled={running}
            onChange={(e) => onSpeedChange(e.target.value as SpeedName)}
          >
            <option>Slow</option>
            <option>Medium</option>
            <option>Fast</option>
          </select>
        </label>

        <button
          onClick={onRun}
          disabled={running}
          title="Visualize"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 pl-0.5 text-sm font-bold text-green-950 disabled:cursor-not-allowed disabled:bg-green-800"
        >
          &#9654;
        </button>

        <button
          onClick={onReset}
          title="Reset board"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-gray-200"
        >
          &#10227;
        </button>
      </div>
    </div>
  );
}
