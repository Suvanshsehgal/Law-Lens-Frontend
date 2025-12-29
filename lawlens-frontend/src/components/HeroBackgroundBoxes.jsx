import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";

export default function HeroBackgroundBoxes() {
  return (
    <div className="h-[32rem] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      <h1 className={cn("md:text-6xl text-3xl font-bold text-white relative z-20 text-center")}>
        Tailwind is Awesome
      </h1>

      <p className="text-center mt-4 text-neutral-300 relative z-20 max-w-xl">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}
