"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Download, MapPin, Globe, Leaf, Stamp } from "lucide-react";

type FarmData = {
    visualStyle: "red" | "green" | "basket";
    farmName: string;
    catchphrase: string;
    message: string;
    phone: string;
    url: string;
};

// Convert visual style into the appropriate placeholder "watercolor" emoji
const getVisualEmoji = (style: string) => {
    switch (style) {
        case "red": return "🍎";
        case "green": return "🍏";
        case "basket": return "🧺";
        default: return "🍎";
    }
};

export default function Canvas({ data }: { data: FarmData }) {
    const [scale, setScale] = useState(0.85);

    return (
        <div className="flex-1 overflow-auto relative flex flex-col items-center">
            <div className="sticky top-0 right-0 z-30 p-4 w-full max-w-[840px] flex justify-end items-center pointer-events-none gap-4 print:hidden">
                <div className="flex items-center gap-2 bg-washi rounded-full shadow-sm border border-ink/10 px-2 py-1 pointer-events-auto">
                    <button onClick={() => setScale(s => Math.max(0.4, s - 0.1))} className="p-1 hover:text-apple"><ZoomOut size={16} /></button>
                    <span className="text-xs font-sans w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-1 hover:text-apple"><ZoomIn size={16} /></button>
                </div>
            </div>

            <div
                className="pb-12 min-h-max flex flex-col gap-16 items-center transform-gpu transition-transform origin-top print:transform-none print:m-0 print:p-0 print:gap-0"
                style={{ transform: `scale(${scale})` }}
            >
                {/* =========================================================
            【表面】 Outer Side (Left to Right: Inside Flap / Back Cover / Front Cover)
           ========================================================= */}
                <div className="flex flex-col gap-3 print:break-after-page print:gap-0">
                    <h2 className="text-ink/60 font-medium text-sm px-2 flex items-center gap-2 tracking-widest font-sans print:hidden">
                        表面（左から： 中折り / 裏表紙 / 表紙）
                    </h2>
                    <div className="bg-washi w-full w-[840px] h-[594px] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden border border-[#f0ece1] flex print:border-none print:shadow-none print:rounded-none">
                        <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                        {/* --- 左面：中折り (Inside Flap) --- */}
                        <div className="flex-1 border-r border-ink/10 border-dashed relative z-10 flex flex-col p-12 print:border-none">
                            <h3 className="text-apple font-bold text-2xl mb-8 leading-tight tracking-wide wabi-rotate-1">
                                このサイトで<br />できること
                            </h3>
                            <div className="space-y-6 text-[15px] leading-loose text-ink/80 tracking-wide">
                                <p>
                                    りんごを手に取った方に、<br />飯綱町を深く知ってもらうこと。
                                </p>
                                <p>
                                    個別農家や事業者だけでは<br />対応が難しい移動・宿泊などの<br />情報を補うこと。
                                </p>
                                <p>
                                    いいづなりんごをきっかけに<br />新たな出会いや関係性が<br />生まれること。
                                </p>
                            </div>
                            <div className="mt-auto opacity-70">
                                <Leaf className="text-leaf" size={24} />
                            </div>
                        </div>

                        {/* --- 中面：裏表紙 (Back Cover) --- */}
                        <div className="flex-1 border-r border-ink/10 border-dashed relative z-10 flex flex-col items-center justify-center p-12 text-center print:border-none">
                            <h3 className="text-xl font-bold mb-6 tracking-wide text-ink">
                                この地図を、<br />共に描きませんか？
                            </h3>
                            <p className="text-sm text-ink/70 leading-relaxed mb-10 text-left">
                                生産者の想いや店舗のこだわりを<br />積み重ねていく、共同で育てる<br />プラットフォームです。
                            </p>

                            {/* Fake QR & Link */}
                            <div className="bg-white p-4 wabi-shadow mb-6 wabi-rotate-3">
                                <div className="w-32 h-32 border-[3px] border-ink flex flex-col items-center justify-center text-xs text-ink/40 font-sans">
                                    アプリダウンロード<br />QR Code
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-apple font-bold tracking-wider font-sans">
                                <Globe size={18} />
                                <span>appletown-iizuna.com</span>
                            </div>
                        </div>

                        {/* --- 右面：表紙 (Front Cover) --- */}
                        <div className="flex-1 relative z-10 p-12 flex flex-col items-center justify-center bg-[#fcf8f0]/40">
                            <div className="text-[120px] mb-8 wabi-rotate-4 filter drop-shadow-sm leading-none pt-10">
                                🍎
                            </div>
                            <h1 className="text-4xl font-bold text-apple wabi-rotate-1 mb-6 tracking-widest text-center leading-tight">
                                りんごのまち<br />いいづな
                            </h1>
                            <p className="text-base text-ink tracking-widest wabi-rotate-2">
                                情報の入り口、ひらきました。
                            </p>
                            <div className="absolute bottom-12 right-12 text-ink/30">
                                <MapPin size={32} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================
            【裏面】 Inner Spread (Left / Center / Right)
           ========================================================= */}
                <div className="flex flex-col gap-3 print:gap-0">
                    <h2 className="text-ink/60 font-medium text-sm px-2 flex items-center gap-2 tracking-widest font-sans print:hidden mt-8">
                        裏面（左面 / 中面 / 右面: 農家カスタマイズ枠 ★）
                    </h2>
                    <div className="bg-washi w-[840px] h-[594px] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden border border-[#f0ece1] flex print:border-none print:shadow-none print:rounded-none">
                        <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                        {/* --- 左面：知る・味わう --- */}
                        <div className="flex-1 border-r border-ink/10 border-dashed relative z-10 p-12 flex flex-col print:border-none">
                            <span className="text-sm font-bold text-apple/60 tracking-widest mb-2">STORY & DELICIOUS</span>
                            <h2 className="text-2xl font-bold text-apple mb-8 tracking-wider wabi-rotate-2 border-b border-apple/20 pb-4">
                                知る ＆ 味わう
                            </h2>
                            <div className="space-y-8 flex-1">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">町の歴史・品種・基礎知識</h4>
                                    <p className="text-[14px] text-ink/80 leading-relaxed">
                                        飯綱町には、りんごをきっかけとした豊かな物語、場所、そして受け継がれる知恵が溢れています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">直売所・生産者・加工品</h4>
                                    <p className="text-[14px] text-ink/80 leading-relaxed">
                                        これまで点在していた膨大な情報をまとめ、誰もが自由にめぐり歩ける入口を創りました。
                                    </p>
                                </div>
                            </div>
                            <div className="text-6xl self-end opacity-90 wabi-rotate-1">📖</div>
                        </div>

                        {/* --- 中面：体験する・暮らす --- */}
                        <div className="flex-1 border-r border-ink/10 border-dashed relative z-10 p-12 flex flex-col bg-[#f5f8ec]/30 print:border-none">
                            <span className="text-sm font-bold text-leaf/60 tracking-widest mb-2">DISCOVER & LIFE</span>
                            <h2 className="text-2xl font-bold text-leaf mb-8 tracking-wider wabi-rotate-4 border-b border-leaf/20 pb-4">
                                体験する ＆ 暮らす
                            </h2>
                            <div className="space-y-8 flex-1">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">農業体験・滞在・アクセス</h4>
                                    <p className="text-[14px] text-ink/80 leading-relaxed">
                                        収穫時期の賑わいから、雪深い静かな冬まで。りんごと共に生きる町の空気を直接感じてください。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">仕事・移住支援・就農相談</h4>
                                    <p className="text-[14px] text-ink/80 leading-relaxed">
                                        りんごの木の下から始まる新しい暮らし。住む場所や仕事に繋がる確かな情報をお届けします。
                                    </p>
                                </div>
                            </div>
                            <div className="text-6xl self-end opacity-90 wabi-rotate-3">🏠</div>
                        </div>

                        {/* --- 右面：★★★ ファームプロフィール枠 ★★★ --- */}
                        <div className="flex-1 relative z-10 p-12 flex flex-col items-center border-[3px] border-apple/20 bg-apple/5 print:border-none rounded-sm">
                            <span className="absolute top-2 left-2 text-[10px] text-apple/50 font-bold tracking-widest print:hidden">
                                ▼ ここがカスタマイズされます ▼
                            </span>

                            <div className="text-[80px] mb-4 wabi-rotate-2 filter drop-shadow-sm leading-none pt-4 opacity-90">
                                {getVisualEmoji(data.visualStyle)}
                            </div>

                            <h1 className="text-2xl font-bold text-apple wabi-rotate-1 mb-4 tracking-widest text-center leading-tight">
                                {data.farmName || "　"}
                            </h1>

                            <p className="text-sm text-ink/80 tracking-widest font-bold wabi-rotate-4 mb-6 border-b border-apple/20 pb-2">
                                {data.catchphrase || "　"}
                            </p>

                            <p className="text-[13px] leading-loose text-ink/70 tracking-wide flex-1 text-center whitespace-pre-wrap">
                                {data.message || "　"}
                            </p>

                            <div className="mt-auto w-full border-t border-ink/10 pt-4 text-center">
                                <div className="text-lg font-bold text-ink tracking-widest mb-1">
                                    <span className="text-[10px] mr-1">TEL</span>{data.phone || "　"}
                                </div>
                                <div className="text-xs text-apple tracking-wider font-sans">
                                    {data.url || "　"}
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 text-apple/10 wabi-rotate-3">
                                <Stamp size={48} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
