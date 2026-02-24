"use client";

import { useState } from "react";
import { Download, Printer, Settings2 } from "lucide-react";
import Canvas from "./Canvas";

export type FarmData = {
  visualStyle: "red" | "green" | "basket";
  farmName: string;
  catchphrase: string;
  message: string;
  phone: string;
  url: string;
};

const DEFAULT_FARM_DATA: FarmData = {
  visualStyle: "red",
  farmName: "滝沢りんご農園",
  catchphrase: "信州の風と太陽が育てた、あまい宝物。",
  message: "私たちが丹精込めて育てたりんごです。寒暖差の激しい飯綱町の気候が、果肉にたっぷりの蜜をもたらします。",
  phone: "026-253-XXXX",
  url: "takizawa-apple.example.com",
};

export default function Home() {
  const [farmData, setFarmData] = useState<FarmData>(DEFAULT_FARM_DATA);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="h-screen w-screen flex font-serif overflow-hidden bg-washi print:h-auto print:w-auto print:overflow-visible print:bg-white text-ink">

      {/* =========================================
          LEFT PANEL: Farm Profile Editor (Sidebar)
          ========================================= */}
      <aside className="w-[380px] h-full bg-white border-r border-[#e8dcc4] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 print:hidden shrink-0">

        {/* Header */}
        <div className="p-6 border-b border-[#e8dcc4] bg-washi-dark/30">
          <h1 className="text-xl font-bold tracking-widest text-apple flex items-center gap-2 mb-1 ShipporiMincho">
            <Settings2 size={20} />
            パンフレット工房
          </h1>
          <p className="text-xs text-ink/50 font-sans tracking-wide">
            【中面】農園カスタマイズ枠エディタ
          </p>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* 1. Visual Switcher */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-ink/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-apple inline-block"></span>
              アイコン（農園のシンボル）
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFarmData({ ...farmData, visualStyle: "red" })}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${farmData.visualStyle === "red" ? 'border-apple bg-apple/5 ring-1 ring-apple/20' : 'border-[#e8dcc4] bg-white hover:bg-washi'}`}
              >
                <span className="text-3xl mb-1 filter drop-shadow-sm">🍎</span>
                <span className="text-[10px] font-sans font-medium">赤りんご</span>
              </button>
              <button
                onClick={() => setFarmData({ ...farmData, visualStyle: "green" })}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${farmData.visualStyle === "green" ? 'border-leaf bg-leaf/5 ring-1 ring-leaf/20' : 'border-[#e8dcc4] bg-white hover:bg-washi'}`}
              >
                <span className="text-3xl mb-1 filter drop-shadow-sm">🍏</span>
                <span className="text-[10px] font-sans font-medium">青りんご</span>
              </button>
              <button
                onClick={() => setFarmData({ ...farmData, visualStyle: "basket" })}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${farmData.visualStyle === "basket" ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600/20' : 'border-[#e8dcc4] bg-white hover:bg-washi'}`}
              >
                <span className="text-3xl mb-1 filter drop-shadow-sm">🧺</span>
                <span className="text-[10px] font-sans font-medium">かご盛り</span>
              </button>
            </div>
            <p className="text-[10px] text-ink/40 font-sans">
              ※ 将来的には「水彩画風イラスト」が選択できるようになります。
            </p>
          </section>

          <hr className="border-[#e8dcc4] border-dashed" />

          {/* 2. Text Inputs */}
          <section className="space-y-5">
            <h2 className="text-sm font-bold tracking-widest text-ink/80 flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-apple inline-block"></span>
              農園プロフィール（右面用）
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-sans text-ink/60 tracking-wider">農園名</label>
              <input
                type="text"
                value={farmData.farmName}
                onChange={(e) => setFarmData({ ...farmData, farmName: e.target.value })}
                className="w-full bg-washi-dark/50 border border-[#e8dcc4] rounded p-2.5 text-sm font-serif focus:outline-none focus:border-apple focus:ring-1 focus:ring-apple transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans text-ink/60 tracking-wider">一言メッセージ</label>
              <textarea
                value={farmData.message}
                onChange={(e) => setFarmData({ ...farmData, message: e.target.value })}
                className="w-full bg-washi-dark/50 border border-[#e8dcc4] rounded p-2.5 text-sm font-serif min-h-[100px] focus:outline-none focus:border-apple focus:ring-1 focus:ring-apple transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans text-ink/60 tracking-wider">電話番号</label>
                <input
                  type="text"
                  value={farmData.phone}
                  onChange={(e) => setFarmData({ ...farmData, phone: e.target.value })}
                  className="w-full bg-washi-dark/50 border border-[#e8dcc4] rounded p-2.5 text-sm font-serif focus:outline-none focus:border-apple focus:ring-1 focus:ring-apple transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-sans text-ink/60 tracking-wider">WEB</label>
                <input
                  type="text"
                  value={farmData.url}
                  onChange={(e) => setFarmData({ ...farmData, url: e.target.value })}
                  className="w-full bg-washi-dark/50 border border-[#e8dcc4] rounded p-2.5 text-sm font-serif focus:outline-none focus:border-apple focus:ring-1 focus:ring-apple transition-colors px-2"
                />
              </div>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#e8dcc4] bg-washi-dark/30">
          <button
            onClick={handlePrint}
            className="w-full bg-apple hover:bg-apple-dark text-white rounded-lg py-3.5 flex items-center justify-center gap-2 font-bold tracking-widest transition-colors shadow-sm cursor-pointer"
          >
            <Printer size={18} />
            PDF出力・印刷する
          </button>
          <p className="text-[10px] text-center text-ink/40 mt-3 font-sans">
            A4・両面（短辺とじ）・フチなし印刷を推奨
          </p>
        </div>
      </aside>

      {/* =========================================
          RIGHT PANEL: Canvas Preview (A4 Tri-fold x 2)
          ========================================= */}
      <div className="flex-1 overflow-auto bg-[#E5E0D8]/60 p-8 print:p-0">
        <Canvas data={farmData} />
      </div>

    </main>
  );
}
