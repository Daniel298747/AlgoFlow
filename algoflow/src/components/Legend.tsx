const ITEMS: { name: string; color: string; rounded?: boolean }[] = [
  { name: "Start", color: "#22c55e" },
  { name: "End", color: "#ef4444" },
  { name: "Wall", color: "#0b0f19" },
  { name: "Visited", color: "#29c5f6" },
  { name: "Path", color: "#c1591f", rounded: true },
];

export default function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-5 py-3 text-xs text-gray-400">
      {ITEMS.map(({ name, color, rounded }) => (
        <span key={name} className="flex items-center gap-1.5">
          <span
            className={rounded ? "rounded" : ""}
            style={{
              width: 12,
              height: 12,
              backgroundColor: color,
              display: "inline-block",
              border: name === "Wall" ? "1px solid #374151" : "none",
            }}
          />
          {name}
        </span>
      ))}
      <span>
        &middot; Click / drag to draw walls &middot; Drag the start or end tile
        to move it
      </span>
    </div>
  );
}
