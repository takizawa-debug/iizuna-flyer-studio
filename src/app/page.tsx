"use client";

import { Printer } from "lucide-react";
import Canvas from "./Canvas";

export default function Home() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="h-screen w-screen relative font-serif overflow-hidden bg-washi print:h-auto print:w-auto print:overflow-visible print:bg-white text-ink">

      {/* Floating Print Button - Hidden on Print */}
      <div className="absolute top-6 right-6 z-50 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-apple hover:bg-apple-dark text-white rounded-full px-6 py-3 flex items-center justify-center gap-2 font-bold tracking-widest transition-colors shadow-lg cursor-pointer text-sm"
        >
          <Printer size={18} />
          PDF出力・印刷する
        </button>
      </div>

      {/* =========================================
          CANVAS PREVIEW (A4 Tri-fold x 2)
          ========================================= */}
      <div className="w-full h-full overflow-auto bg-[#E5E0D8]/60 p-8 print:p-0 flex justify-center items-start">
        <Canvas />
      </div>

    </main>
  );
}
