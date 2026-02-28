"use client";

import Canvas from "./Canvas";

export default function Home() {
  return (
    <main className="h-screen w-screen relative font-serif overflow-hidden bg-washi print:h-auto print:w-auto print:overflow-visible print:bg-white text-ink">

      {/* =========================================
          CANVAS PREVIEW (A4 Tri-fold x 2)
          ========================================= */}
      <div className="w-full h-full overflow-auto bg-[#E5E0D8]/60 p-8 print:p-0 flex justify-center items-start">
        <Canvas />
      </div>

    </main>
  );
}
