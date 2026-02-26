"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

export type FarmData = {
    visualStyle: "red" | "green" | "basket";
    farmName: string;
    catchphrase: string;
    message: string;
    phone: string;
    url: string;
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
                    <div className="w-[840px] h-[594px] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden flex print:border-none print:shadow-none print:rounded-none bg-[#FA9B93]">
                        <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                        {/* --- 左面：中折り (Inside Flap) --- */}
                        <div className="flex-1 border-r border-[#EAA29A] border-dashed relative z-10 flex flex-col p-12 text-ink print:border-none items-center">
                            <h3 className="text-lg font-bold tracking-widest mt-[200px] mb-8 text-center leading-loose">
                                飯綱町の基本情報<br />
                                （りんご以外の）
                            </h3>
                            <ul className="space-y-3 text-base font-bold tracking-widest leading-loose flex flex-col justify-center">
                                <li>・アクセス</li>
                                <li>・四季折々の景色</li>
                                <li>・食のクオリティ</li>
                            </ul>
                        </div>

                        {/* --- 中面：裏表紙 (Back Cover) --- */}
                        <div className="flex-1 border-r border-[#EAA29A] border-dashed relative z-10 flex flex-col items-center justify-center p-12 text-center text-white print:border-none pt-24">
                            <div className="mb-14 space-y-4 font-bold tracking-wider leading-relaxed text-[15px]">
                                <p>「いいづなりんご」とは？</p>
                                <p>生産者の想いや<br />お店のこだわり</p>
                                <p>飯綱町での滞在や<br />暮らしの情報まで</p>
                                <p>「りんごのまち」が<br />広く”みわたせる”<br />プラットフォームです</p>
                            </div>

                            <div className="bg-white w-[100px] h-[100px] flex flex-col items-center justify-center text-xs text-ink/40 font-sans shadow-sm mb-16">
                            </div>

                            <div className="flex items-center gap-2 font-sans text-[13px] tracking-widest mt-auto border-b border-white border-dashed pb-[2px]">
                                appletown-iizuna.com
                            </div>
                        </div>

                        {/* --- 右面：表紙 (Front Cover) --- */}
                        <div className="flex-1 relative z-10 flex flex-col items-center justify-center bg-[#D45D56] text-white print:border-none">
                            <div className="absolute inset-0 pt-12 pb-24 px-6 flex flex-col justify-between opacity-95 pointer-events-none">
                                {[...Array(6)].map((_, rowIndex) => {
                                    const isEven = rowIndex % 2 === 0;
                                    return (
                                        <div key={rowIndex} className={`flex justify-around w-full ${isEven ? 'px-6' : 'px-0'}`}>
                                            {[...Array(5)].map((_, colIndex) => (
                                                <div key={colIndex} className="text-[34px] filter drop-shadow-md">
                                                    🍎
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pb-[40px]">
                                <div className="w-[66px] h-[52px] bg-white mb-[55px] shadow-sm"></div>
                                <div className="w-[66px] h-[190px] bg-white shadow-sm"></div>
                            </div>

                            <h1 className="absolute bottom-[44px] text-lg font-bold tracking-widest z-30 drop-shadow-md pb-[8px]">
                                りんごのまち いいづな
                            </h1>
                        </div>
                    </div>
                </div>

                {/* =========================================================
            【裏面】 Inner Spread (Left / Center / Right)
           ========================================================= */}
                <div className="flex flex-col gap-3 print:gap-0 mt-8">
                    <h2 className="text-ink/60 font-medium text-sm px-2 flex items-center gap-2 tracking-widest font-sans print:hidden">
                        裏面（左面 / 中面 / 右面）
                    </h2>
                    <div className="w-[840px] h-[594px] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden flex print:shadow-none print:rounded-none bg-[#EBE2AF]">
                        <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                        <div className="absolute top-[48%] left-0 w-full border-t border-[#D5CD97] border-dashed z-10 pointer-events-none"></div>

                        {/* Title across panels */}
                        <div className="absolute top-[40px] left-[40px] z-20">
                            <h2 className="text-2xl font-bold tracking-widest text-ink/90">
                                いいづなりんごからはじまる物語
                            </h2>
                        </div>

                        {/* --- 左面 --- */}
                        <div className="flex-1 border-r border-[#D5CD97] border-dashed relative z-10 p-12 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[80px]">
                                <div className="relative z-20 mb-auto">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        知る <span className="font-normal border-l border-ink/40 pl-2 ml-2">歴史・栽培品種情報</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                                <div className="relative z-20 pt-10">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        暮らす <span className="font-normal border-l border-ink/40 pl-2 ml-2">移住・お仕事</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                            </div>
                        </div>

                        {/* --- 中面 --- */}
                        <div className="flex-1 border-r border-[#D5CD97] border-dashed relative z-10 p-12 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[80px]">
                                <div className="relative z-20 mb-auto">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        味わう <span className="font-normal border-l border-ink/40 pl-2 ml-2">販売場所・生産者</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                            </div>
                        </div>

                        {/* --- 右面 --- */}
                        <div className="flex-1 relative z-10 p-12 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[80px]">
                                <div className="relative z-20 mb-auto">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        体験する <span className="font-normal border-l border-ink/40 pl-2 ml-2">農業体験・滞在</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                                <div className="relative z-20 pt-10">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        営む <span className="font-normal border-l border-ink/40 pl-2 ml-2">事業者支援・素材</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
