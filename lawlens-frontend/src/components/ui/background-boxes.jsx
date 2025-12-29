import React, { useMemo } from "react";

export const Boxes = () => {
  const rows = 12;
  const cols = 12;

  const colors = useMemo(() => {
    return Array.from({ length: rows * cols }, () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    });
  }, []);

  const boxes = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div
      className="absolute inset-0 w-full h-full grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {boxes.map((i) => (
        <div
          key={i}
          style={{
            "--c": colors[i],
          }}
          className="w-full h-full border border-slate-700/40 hover:[background-color:var(--c)] hover:[border-color:var(--c)] transition-[background-color,border-color] duration-75"
        />
      ))}
    </div>
  );
};
