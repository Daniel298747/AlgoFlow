import { COLS, ROWS, TILE_SIZE } from "../constants";
import { tileId } from "../utils/grid";

interface GridProps {
  tileClass: (row: number, col: number) => string;
  onTileDown: (row: number, col: number) => void;
  onTileEnter: (row: number, col: number) => void;
}

export default function Grid({ tileClass, onTileDown, onTileEnter }: GridProps) {
  return (
    <div className="overflow-auto px-4 pb-8">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${TILE_SIZE}px)`,
          borderLeft: "1px solid #9fd5fb",
          borderBottom: "1px solid #9fd5fb",
          width: COLS * TILE_SIZE + 1,
        }}
      >
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => (
            <div
              key={tileId(row, col)}
              id={tileId(row, col)}
              className={tileClass(row, col)}
              onMouseDown={(event) => {
                event.preventDefault();
                onTileDown(row, col);
              }}
              onMouseEnter={() => onTileEnter(row, col)}
            />
          ))
        )}
      </div>
    </div>
  );
}
