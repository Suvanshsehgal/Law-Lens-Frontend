import React, { useState } from "react";

export const Boxes = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const basePattern = encodeURIComponent(`
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
  xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12V28" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <path d="M12 20H28" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  </svg>
  `);

  const glowPattern = encodeURIComponent(`
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none"
  xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12V28" stroke="rgba(255,255,255,0.95)" stroke-width="2"/>
    <path d="M12 20H28" stroke="rgba(255,255,255,0.95)" stroke-width="2"/>
  </svg>
  `);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden relative"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1026] via-[#0b1635] to-[#0b1a3f]" />

      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${basePattern}")`,
          backgroundSize: "24px 24px",
        }}
      />


      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,${glowPattern}")`,
          backgroundSize: "24px 24px",
          opacity: 0.9,
          backgroundRepeat: "repeat",
          maskImage: `radial-gradient(circle 130px at ${pos.x}px ${pos.y}px, white 40%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 130px at ${pos.x}px ${pos.y}px, white 40%, transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1026] via-transparent to-transparent" />
    </div>
  );
};
