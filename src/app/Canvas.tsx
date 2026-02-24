"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Type, Sparkles, Download, ArrowLeft } from "lucide-react";

type ElementProps = {
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    wabiClass: string;
};

// Canvas component simulating an A4 paper with Wabi-sabi effects
export default function Canvas() {
    const [elements, setElements] = useState<ElementProps[]>([
        {
            id: "title-1",
            type: "text",
            content: "ここにチラシを作成します",
            x: 50,
            y: 100,
            wabiClass: "wabi-rotate-1 texture-ink",
        },
        {
            id: "subtitle-1",
            type: "text",
            content: "〜飯綱町りんごの便り〜",
            x: 120,
            y: 180,
            wabiClass: "wabi-rotate-2 texture-ink",
        },
        {
            id: "img-1",
            type: "image",
            content: "🍎",
            x: 150,
            y: 280,
            wabiClass: "wabi-rotate-4",
        },
    ]);

    return (
        <div className="flex-1 flex flex-col h-full bg-washi-dark items-center justify-center p-8 overflow-hidden relative">
            {/* Tools sidebar (minimal) */}
            <div className="absolute left-6 top-6 bg-washi p-4 rounded-xl shadow-sm border border-[#e8dcc4] flex flex-col gap-4">
                <button className="flex flex-col items-center justify-center gap-1.5 text-xs text-ink/70 hover:text-apple transition-colors">
                    <Type size={20} />
                    <span>文字</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 text-xs text-ink/70 hover:text-apple transition-colors">
                    <ImageIcon size={20} />
                    <span>写真</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 text-xs text-ink/70 hover:text-apple transition-colors">
                    <Sparkles size={20} />
                    <span>ゆらぎ</span>
                </button>
            </div>

            <div className="absolute right-6 top-6">
                <button className="bg-apple text-washi px-5 py-2.5 rounded-full shadow-md hover:bg-apple-dark transition-colors flex items-center gap-2 font-medium">
                    <Download size={18} />
                    完成
                </button>
            </div>

            {/* The A4 Canvas Container */}
            <div
                className="bg-washi w-full max-w-[500px] aspect-[1/1.414] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden border border-[#f0ece1]"
            >
                <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                {elements.map((el) => (
                    <motion.div
                        key={el.id}
                        drag
                        dragMomentum={false}
                        initial={{ x: el.x, y: el.y }}
                        className={`absolute cursor-move inline-block z-10 ${el.wabiClass}`}
                        whileTap={{ scale: 1.05 }}
                        whileDrag={{ scale: 1.05, opacity: 0.9, zIndex: 50 }}
                    >
                        {el.type === "text" ? (
                            <div className="text-2xl font-serif text-ink whitespace-pre tracking-wide leading-relaxed">
                                {el.content}
                            </div>
                        ) : (
                            <div className="text-6xl filter drop-shadow-sm select-none">
                                {el.content}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-sm text-ink/60 font-serif flex items-center gap-2">
                <span>※ 手作りのような「ゆらぎ」を含んでいます。要素をドラッグして配置を整えられます。</span>
            </div>
        </div>
    );
}
