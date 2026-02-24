import Canvas from "./Canvas";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col font-serif overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#e8dcc4] bg-washi z-10 shrink-0 shadow-sm relative">
        <h1 className="text-xl font-bold tracking-wider text-apple flex items-center gap-2 wabi-rotate-1">
          🍎 いいづなパンフレット プレビュー
        </h1>

        <div className="text-sm text-ink/60 hidden md:flex gap-6 font-sans">
          <span>A4・両面カラー3つ折り</span>
        </div>
      </header>

      {/* Main Preview Area */}
      <div className="flex-1 w-full bg-washi relative flex">
        <Canvas />
      </div>
    </main>
  );
}
