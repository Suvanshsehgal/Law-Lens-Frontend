import React, { useState, useEffect } from "react";

export const Boxes = ({ className = "" }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#222E46] via-[#1D2840] to-[#1A2338]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${basePattern}")`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Hover glow */}
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

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1026] via-transparent to-transparent" />
    </div>
  );
};
