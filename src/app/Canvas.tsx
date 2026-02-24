"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Type, Sparkles, Download, ArrowLeft, ZoomIn, ZoomOut, Settings } from "lucide-react";

export type ElementProps = {
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    wabiClass: string;
    fontSize?: number;
    color?: string;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
};

type CanvasSideProps = {
    title: string;
    sideId: "outer" | "inner";
    elements: ElementProps[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    onDragEnd: (id: string, newX: number, newY: number) => void;
};

// Represents a single A4 Landscape canvas (Front or Back)
function CanvasSide({ title, sideId, elements, selectedId, onSelect, onDragEnd }: CanvasSideProps) {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-apple font-bold text-lg px-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-apple inline-block" />
                {title}
            </h2>

            {/* A4 Landscape Ratio (approx 1.414 : 1) -> W:H = 297mm:210mm */}
            <div
                className="bg-washi w-full max-w-[840px] aspect-[1.414/1] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden border border-[#f0ece1]"
                onClick={() => onSelect(null)}
            >
                <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                {/* Fold Lines (3 Columns) */}
                <div className="absolute inset-0 flex pointer-events-none z-0">
                    <div className="flex-1 border-r border-ink/10 border-dashed relative">
                        <span className="absolute bottom-2 left-2 text-[10px] text-ink/30 font-sans tracking-widest hidden md:block">
                            {sideId === "outer" ? "中折り" : "左面"}
                        </span>
                    </div>
                    <div className="flex-1 border-r border-ink/10 border-dashed relative">
                        <span className="absolute bottom-2 left-2 text-[10px] text-ink/30 font-sans tracking-widest hidden md:block">
                            {sideId === "outer" ? "裏表紙" : "中面"}
                        </span>
                    </div>
                    <div className="flex-1 relative">
                        <span className="absolute bottom-2 left-2 text-[10px] text-ink/30 font-sans tracking-widest hidden md:block">
                            {sideId === "outer" ? "表紙" : "右面"}
                        </span>
                    </div>
                </div>

                {/* Render Elements */}
                {elements.map((el) => {
                    const isSelected = selectedId === el.id;

                    return (
                        <motion.div
                            key={el.id}
                            drag
                            dragMomentum={false}
                            layout
                            initial={{ x: el.x, y: el.y }}
                            onDragEnd={(_, info) => {
                                onDragEnd(el.id, el.x + info.offset.x, el.y + info.offset.y);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(el.id);
                            }}
                            className={`absolute cursor-move inline-block z-10 ${el.wabiClass} ${isSelected ? "ring-2 ring-apple/50 ring-offset-2 ring-offset-washi rounded-sm" : ""
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 1.05, zIndex: 50 }}
                            style={{
                                fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
                                color: el.color || "var(--color-ink)",
                                fontWeight: el.fontWeight || "normal",
                            }}
                        >
                            {el.type === "text" ? (
                                <div className="font-serif whitespace-pre tracking-wide leading-relaxed filter drop-shadow-[0_1px_2px_rgba(44,44,44,0.1)]">
                                    {el.content}
                                </div>
                            ) : (
                                <div className="filter drop-shadow-sm select-none">
                                    {el.content}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// Main Editor State and Layout
export default function Canvas() {
    const [scale, setScale] = useState(0.85);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Initial Data covering the 5 portals: Know, Taste, Experience, Live, Business
    const [elements, setElements] = useState<ElementProps[]>([
        // --- 表面 (Outer Side: Inside Flap(L), Back Cover(C), Front Cover(R)) ---
        { id: "front-logo", type: "text", content: "いいづな\nりんごのまち", x: 630, y: 150, wabiClass: "wabi-rotate-1 texture-ink", fontSize: 36, fontWeight: "700", color: "var(--color-apple)" },
        { id: "front-sub", type: "text", content: "情報の入り口、ひらきました。", x: 620, y: 260, wabiClass: "wabi-rotate-2 texture-ink", fontSize: 16, color: "var(--color-ink)" },
        { id: "front-img", type: "image", content: "🍎", x: 670, y: 350, wabiClass: "wabi-rotate-4", fontSize: 80 },

        { id: "back-title", type: "text", content: "この地図を、\n共に描きませんか？", x: 340, y: 150, wabiClass: "wabi-rotate-1", fontSize: 20, fontWeight: "500" },
        { id: "back-url", type: "text", content: "appletown-iizuna.com", x: 330, y: 320, wabiClass: "wabi-rotate-3", fontSize: 14 },
        { id: "back-qr", type: "image", content: "⬛️ QR Code", x: 360, y: 360, wabiClass: "wabi-rotate-1", fontSize: 40 },

        { id: "flap-title", type: "text", content: "このサイトで\nできること", x: 50, y: 120, wabiClass: "wabi-rotate-4", fontSize: 24, fontWeight: "700", color: "var(--color-apple)" },
        { id: "flap-desc", type: "text", content: "農家さん、直売所、\n体験スポット。\nこれまで点在していた\n飯綱の魅力を一つに。", x: 50, y: 220, wabiClass: "wabi-rotate-1", fontSize: 13, fontWeight: "400" },

        // --- 裏面 (Inner Spread: L, C, R) ---
        { id: "inner-1", type: "text", content: "知る ＆ 味わう", x: 60, y: 80, wabiClass: "wabi-rotate-2 texture-ink", fontSize: 22, fontWeight: "700", color: "var(--color-apple)" },
        { id: "inner-1-desc", type: "text", content: "町の歴史・品種から\n直売所の新鮮な果実まで。\n物語を知ると、\nりんごはもっと美味しい。", x: 60, y: 150, wabiClass: "wabi-rotate-1", fontSize: 14 },
        { id: "inner-1-img", type: "image", content: "📖", x: 120, y: 300, wabiClass: "wabi-rotate-4", fontSize: 40 },

        { id: "inner-2", type: "text", content: "体験する ＆ 暮らす", x: 320, y: 80, wabiClass: "wabi-rotate-3 texture-ink", fontSize: 22, fontWeight: "700", color: "var(--color-leaf)" },
        { id: "inner-2-desc", type: "text", content: "収穫体験、滞在施設。\nそして移住や就農の相談まで。\n飯綱町を「訪れる」から\n「生きる場所」へ。", x: 320, y: 150, wabiClass: "wabi-rotate-4", fontSize: 14 },
        { id: "inner-2-img", type: "image", content: "🏠", x: 380, y: 300, wabiClass: "wabi-rotate-1", fontSize: 40 },

        { id: "inner-3", type: "text", content: "新しい探索体験", x: 610, y: 80, wabiClass: "wabi-rotate-1 texture-ink", fontSize: 22, fontWeight: "700", color: "var(--color-ink)" },
        { id: "inner-3-desc", type: "text", content: "気になる言葉をクリック。\n小さな記事でサッと読み、\nSNSで即座にシェア。\n\n「ここに行こう！」が\nすぐに見つかる入り口です。", x: 610, y: 150, wabiClass: "wabi-rotate-2", fontSize: 14 },
        { id: "inner-3-img", type: "image", content: "✨", x: 680, y: 340, wabiClass: "wabi-rotate-3", fontSize: 40 },
    ]);

    const updateElement = (id: string, updates: Partial<ElementProps>) => {
        setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)));
    };

    const handleDragEnd = (id: string, newX: number, newY: number) => {
        updateElement(id, { x: newX, y: newY });
    };

    const selectedElement = elements.find((el) => el.id === selectedId);

    return (
        <div className="flex-1 flex overflow-hidden w-full h-full">
            {/* 1. Tools Layout (Left Sidebar) */}
            <div className="w-16 bg-washi border-r border-ink/10 flex flex-col items-center py-6 gap-6 z-20 shrink-0">
                <button className="text-ink/60 hover:text-apple transition-colors p-2" title="文字を追加">
                    <Type size={20} />
                </button>
                <button className="text-ink/60 hover:text-apple transition-colors p-2" title="写真を追加">
                    <ImageIcon size={20} />
                </button>
                <div className="w-8 h-px bg-ink/10 my-2" />
                <button className="text-ink/60 hover:text-apple transition-colors p-2" title="ゆらぎ効果">
                    <Sparkles size={20} />
                </button>
            </div>

            {/* 2. Main Scrollable Canvas Area (Center) */}
            <div className="flex-1 bg-washi-dark overflow-auto relative">
                <div className="sticky top-0 right-0 z-30 p-4 flex justify-between items-center pointer-events-none">
                    <div />
                    <div className="flex items-center gap-2 bg-washi rounded-full shadow-sm border border-ink/10 px-2 py-1 pointer-events-auto">
                        <button onClick={() => setScale(s => Math.max(0.4, s - 0.1))} className="p-1 hover:text-apple"><ZoomOut size={16} /></button>
                        <span className="text-xs font-sans w-12 text-center">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-1 hover:text-apple"><ZoomIn size={16} /></button>
                    </div>
                </div>

                <div
                    className="p-12 min-h-max flex flex-col gap-16 items-center transform-gpu transition-transform origin-top"
                    style={{ transform: `scale(${scale})` }}
                    onClick={() => setSelectedId(null)}
                >
                    {/* Outer Side (表面) */}
                    <CanvasSide
                        title="【表面】左から： 中折り（内側） / 裏表紙 / 表紙"
                        sideId="outer"
                        elements={elements.filter(e => e.id.includes("front") || e.id.includes("back") || e.id.includes("flap"))}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onDragEnd={handleDragEnd}
                    />

                    {/* Inner Spread (裏面) */}
                    <CanvasSide
                        title="【裏面】中面広げ（左・中・右）"
                        sideId="inner"
                        elements={elements.filter(e => e.id.includes("inner"))}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onDragEnd={handleDragEnd}
                    />
                </div>
            </div>

            {/* 3. Properties Sidebar (Right) */}
            {selectedElement && (
                <div className="w-72 bg-washi border-l border-ink/10 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 z-20 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 text-apple font-bold border-b border-ink/10 pb-3">
                        <Settings size={18} />
                        <h3>要素の編集</h3>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-ink/60 font-sans tracking-widest">内容 (テキスト)</label>
                        <textarea
                            value={selectedElement.content}
                            onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                            className="bg-washi-dark border border-ink/20 rounded-md p-3 text-sm font-serif min-h-[120px] focus:outline-none focus:ring-1 focus:ring-apple"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-ink/60 font-sans tracking-widest">文字サイズ</label>
                        <input
                            type="range" min="10" max="120"
                            value={selectedElement.fontSize || 16}
                            onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                            className="w-full accent-apple"
                        />
                        <div className="text-right text-xs text-ink/60">{selectedElement.fontSize || 16}px</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-ink/60 font-sans tracking-widest">文字色</label>
                        <div className="flex gap-2">
                            {[
                                { name: "黒インク", val: "var(--color-ink)" },
                                { name: "りんご赤", val: "var(--color-apple)" },
                                { name: "自然緑", val: "var(--color-leaf)" }
                            ].map(c => (
                                <button
                                    key={c.val}
                                    onClick={() => updateElement(selectedElement.id, { color: c.val })}
                                    className={`w-8 h-8 rounded-full border-2 ${selectedElement.color === c.val || (!selectedElement.color && c.val === "var(--color-ink)") ? "border-ink" : "border-transparent"}`}
                                    style={{ backgroundColor: c.val }}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-xs text-ink/40 mt-auto pt-4 border-t border-ink/10">
                        <p>※ 要素はドラッグで自由に移動できます。「ゆらぎ」の風合いは自動で保持されます。</p>
                    </div>
                </div>
            )}
        </div>
    );
}
