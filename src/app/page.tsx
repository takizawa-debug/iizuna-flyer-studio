import Canvas from "./Canvas";
import { ArrowLeft, Menu } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col font-serif overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#e8dcc4] bg-washi z-10 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button className="text-ink/60 hover:text-ink transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold tracking-wider text-apple flex items-center gap-2">
            いいづなチラシ工房
          </h1>
        </div>

        <div className="text-sm text-ink/60 hidden md:flex gap-6">
          <span className="cursor-pointer hover:text-apple">ファイル</span>
          <span className="cursor-pointer hover:text-apple">編集</span>
          <span className="cursor-pointer hover:text-apple">ヘルプ</span>
        </div>

        <button className="text-ink/60 md:hidden">
          <Menu size={24} />
        </button>
      </header>

      {/* Main Studio Area */}
      <div className="flex-1 w-full bg-washi relative flex">
        <Canvas />
      </div>
    </main>
  );
}
