"use client";

import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const APPLE_IMAGES = [
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%AB%98%E5%9D%82%E6%9E%97%E6%AA%8E.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%96%E3%83%A9%E3%83%A0%E3%83%AA%E3%83%BC.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%99%E3%83%AB%E3%83%BB%E3%83%89%E3%83%BB%E3%83%9C%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%97.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%96%E3%83%AC%E3%83%8A%E3%83%A0%E3%83%BB%E3%82%AA%E3%83%AC%E3%83%B3%E3%82%B8.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%A8%E3%82%B0%E3%83%AC%E3%83%A2%E3%83%B3%E3%83%88%E3%83%BB%E3%83%A9%E3%82%BB%E3%83%83%E3%83%88.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B0%E3%83%A9%E3%83%8B%E3%83%BC%E3%83%BB%E3%82%B9%E3%83%9F%E3%82%B9.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%AA%E3%83%83%E3%83%97.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%94%E3%83%83%E3%82%B3%E3%83%AD.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%97%E3%83%83%E3%83%81.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%89%E3%83%AB%E3%83%81%E3%82%A7.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E7%A7%8B%E6%98%A0.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%9B%E3%83%83%E3%83%9A.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%99%E3%82%8F%E3%81%A3%E3%81%93.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%82%E3%81%84%E3%81%8B%E3%81%AE%E9%A6%99%E3%82%8A.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%A0%E3%83%BC%E3%83%B3%E3%83%AB%E3%83%BC%E3%82%B8%E3%83%A5.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E5%A4%8F%E3%81%82%E3%81%8B%E3%82%8A.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%BB%84%E7%8E%8B.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B5%E3%83%B3%E3%81%A4%E3%81%8C%E3%82%8B.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E7%B4%85%E7%8E%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%88%E3%82%AD.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E7%8E%8B%E6%9E%97.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%90%E3%82%93%E3%81%BE%E5%90%8D%E6%9C%88.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B5%E3%83%B3%E3%81%B5%E3%81%98.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%82%E3%81%BE%E3%81%BF%E3%81%A4%E3%81%8D.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%A2%E3%83%AB%E3%83%97%E3%82%B9%E4%B9%99%E5%A5%B3.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%93%E3%81%86%E3%81%93%E3%81%86.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%95%E3%82%93%E3%81%95.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B7%E3%83%8A%E3%83%8E%E3%83%AC%E3%83%83%E3%83%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B8%E3%83%A7%E3%83%8A%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%B9%E3%83%AA%E3%83%A0%E3%83%AC%E3%83%83%E3%83%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%AA%E3%81%8B%E3%81%AE%E3%81%AE%E3%81%8D%E3%82%89%E3%82%81%E3%81%8D.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%81%B2%E3%82%81%E3%81%8B%E3%81%BF.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B9%E3%83%88%E3%83%AC%E3%83%87%E3%82%A3.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%83%A1%E3%82%A4%E3%83%9D%E3%83%BC%E3%83%AB.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E3%82%84%E3%81%9F%E3%81%8B.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E5%8D%B0%E5%BA%A6.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E7%82%8E%E8%88%9E.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E5%BC%98%E5%89%8D%E3%81%B5%E3%81%98.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E7%B4%85%E3%81%BF%E3%81%AE%E3%82%8A.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%AB%98%E5%BE%B3.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E6%96%B0%E4%B8%96%E7%95%8C.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E4%B8%96%E7%95%8C%E4%B8%80.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E5%8D%83%E7%A7%8B.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E5%8D%83%E9%9B%AA.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E8%8A%B3%E6%98%8E.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%99%BD%E5%85%89.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%99%B8%E5%A5%A5.png",
    "https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E6%81%8B%E7%A9%BA.png"
];

const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function Canvas() {
    const [scale, setScale] = useState(0.85);
    const [showGuides, setShowGuides] = useState(false);
    const [coverColor, setCoverColor] = useState("#E88C83"); // Light Red Default
    const [randomApples, setRandomApples] = useState<string[]>([]);

    const getBaseColor = (color: string) => {
        switch (color) {
            case '#E88C83': return '#FCF2F0';
            case '#A1C23A': return '#F6FAED';
            case '#F1CE00': return '#FEFBE6';
            case '#FFFFFF': return '#F5F5F5';
            default: return '#FCF2F0';
        }
    };

    useEffect(() => {
        // Need about 30 apples for a 6x5 grid (30 items total limit)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setRandomApples(shuffleArray(APPLE_IMAGES).slice(0, 30));
    }, []);

    return (
        <div className="flex-1 overflow-auto relative flex flex-col items-center font-tsukushi font-bold">
            <div className="sticky top-0 right-0 z-50 p-4 w-full max-w-[840px] flex justify-end items-center pointer-events-none gap-4 print:hidden">
                {/* Cover Color Toggle */}
                <div className="flex items-center gap-1.5 bg-washi rounded-full shadow-sm border border-ink/10 px-3 py-1 pointer-events-auto">
                    <span className="text-xs font-sans text-ink/60 mr-1">Cover:</span>
                    <button onClick={() => setCoverColor('#E88C83')} className={`w-4 h-4 rounded-full border ${coverColor === '#E88C83' ? 'border-ink border-2' : 'border-ink/20'}`} style={{ backgroundColor: '#E88C83' }} title="Light Red"></button>
                    <div className="w-[1px] h-3 bg-ink/20 mx-1"></div>
                    <button onClick={() => setCoverColor('#A1C23A')} className={`w-4 h-4 rounded-full border ${coverColor === '#A1C23A' ? 'border-ink border-2' : 'border-ink/20'}`} style={{ backgroundColor: '#A1C23A' }} title="Green"></button>
                    <button onClick={() => setCoverColor('#F1CE00')} className={`w-4 h-4 rounded-full border ${coverColor === '#F1CE00' ? 'border-ink border-2' : 'border-ink/20'}`} style={{ backgroundColor: '#F1CE00' }} title="Yellow"></button>
                    <button onClick={() => setCoverColor('#FFFFFF')} className={`w-4 h-4 rounded-full border ${coverColor === '#FFFFFF' ? 'border-ink border-2' : 'border-ink/20'}`} style={{ backgroundColor: '#FFFFFF' }} title="White"></button>
                </div>

                <button
                    onClick={() => setShowGuides(!showGuides)}
                    className={`flex items-center gap-2 rounded-full shadow-sm border px-3 py-1 pointer-events-auto text-xs font-sans transition-colors ${showGuides ? 'bg-ink text-white border-ink' : 'bg-washi text-ink/60 border-ink/10 hover:text-ink'}`}
                >
                    {showGuides ? 'Hide Guides' : 'Show Guides'}
                </button>
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
                    <div
                        className="w-[840px] h-[594px] shadow-2xl relative wabi-shadow rounded-sm overflow-hidden flex print:border-none print:shadow-none print:rounded-none transition-colors duration-300"
                        style={{ backgroundColor: getBaseColor(coverColor) }}
                    >
                        <div className="absolute inset-0 texture-paper pointer-events-none z-0" />

                        {/* Ruler Guides Overlay */}
                        {showGuides && (
                            <div className="absolute inset-0 z-50 pointer-events-none" style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px),
                                    linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)
                                `,
                                backgroundSize: '10px 10px, 10px 10px, 50px 50px, 50px 50px'
                            }}>
                                {/* Add axis numbers every 50px for the cover panel (rightmost panel, x: 560 to 840) */}
                                <div className="absolute top-0 right-0 w-[280px] h-full">
                                    {/* X-axis labels (relative to the 280px panel) */}
                                    {[0, 50, 100, 150, 200, 250].map(x => (
                                        <div key={`x-${x}`} className="absolute top-0 text-[9px] font-sans text-white bg-black/50 px-0.5" style={{ left: `${x}px` }}>{x}</div>
                                    ))}
                                    {/* Y-axis labels */}
                                    {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map(y => (
                                        <div key={`y-${y}`} className="absolute left-0 text-[9px] font-sans text-white bg-black/50 px-0.5" style={{ top: `${y}px` }}>{y}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- 左面：中折り (Inside Flap) --- */}
                        <div className="w-[280px] relative z-10 flex flex-col pt-12 pb-8 px-6 text-ink print:border-none">
                            {/* Heading (y=50 to 100) */}
                            <div className="h-[50px] w-full flex items-center justify-start mt-4">
                                <h3 className="text-[14px] font-serif tracking-[0.15em] leading-relaxed text-ink/90 whitespace-nowrap">
                                    ようこそ、りんごのまちへ。
                                </h3>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-[0.5px] bg-ink/30 mb-5"></div>

                            {/* Access Route & Subtext (y=110 to 230) */}
                            <div className="h-[120px] w-full flex flex-col justify-start">
                                {/* Route */}
                                <div className="w-full flex items-center justify-between mb-5 px-1">
                                    <div className="flex flex-col items-center">
                                        <div className="w-[7px] h-[7px] border-[0.5px] border-ink bg-white rounded-full mb-1"></div>
                                        <span className="text-[8px] font-serif tracking-widest text-ink/80 whitespace-nowrap">東京駅</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center -mt-2">
                                        <span className="text-[7px] font-sans text-ink/50 tracking-wider whitespace-nowrap">新幹線 1.5h</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-[7px] h-[7px] bg-ink rounded-full mb-1"></div>
                                        <span className="text-[8px] font-serif tracking-widest text-ink/90 whitespace-nowrap">長野駅</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center -mt-2">
                                        <span className="text-[7px] font-sans text-ink/50 tracking-wider whitespace-nowrap">車 30min</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[11px] leading-none mb-0.5 opacity-90 drop-shadow-sm">🍎</span>
                                        <span className="text-[8px] font-serif tracking-widest text-[#D45D56] font-bold whitespace-nowrap">飯綱町</span>
                                    </div>
                                </div>

                                {/* Subtext */}
                                <div className="w-full pl-1">
                                    <p className="text-[9px] tracking-[0.2em] text-ink/80 font-serif mb-2">
                                        長野から約2時間
                                    </p>
                                    <p className="text-[8px] tracking-[0.1em] text-ink/60 font-serif leading-relaxed">
                                        標高500m〜900m。<br />
                                        寒暖差のある冷涼な地域です。
                                    </p>
                                </div>
                            </div>

                            {/* Photo Mosaic (y=230 to 430) */}
                            <div className="w-full h-[200px] mb-3">
                                <div className="grid grid-cols-2 gap-[2px] w-full h-[200px]">
                                    <div className="relative overflow-hidden w-full h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/bd0a2240-8eef-013e-f636-0a58a9feac02/08d38714aac878e65d2e26af32577e64.jpg" alt="Spring" className="w-full h-full object-cover grayscale-[10%] brightness-105" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/ec2954c0-a041-013e-ff9d-0a58a9feac02/iizuna_20220525-2.jpg" alt="Summer" className="w-full h-full object-cover grayscale-[10%] brightness-105" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/b0a34c40-a041-013e-b18a-0a58a9feac02/20231013_sweet-3.jpg" alt="Autumn" className="w-full h-full object-cover grayscale-[10%] brightness-105" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/120aadf0-a042-013e-ffb1-0a58a9feac02/iizuna_20250123-10.jpg" alt="Winter" className="w-full h-full object-cover grayscale-[10%] brightness-105" />
                                    </div>
                                </div>
                            </div>

                            {/* Poetic Caption (y=430 to 460) */}
                            <div className="w-full h-[30px] pl-1">
                                <p className="text-[9.5px] font-serif tracking-[0.15em] leading-relaxed text-ink/80">
                                    春の桃源郷、夏の涼風。<br />
                                    秋の黄金色と冬の静寂。
                                </p>
                            </div>

                            {/* Food Gallery (y=460 to 550) */}
                            <div className="w-full h-[90px] mt-auto">
                                <div className="flex items-start justify-between gap-1 mb-3">
                                    <div className="flex flex-col items-center gap-1 w-1/4">
                                        <div className="w-full aspect-square relative overflow-hidden bg-ink/5">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=200" alt="Apple" className="w-full h-full object-cover mix-blend-multiply" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 w-1/4 pt-1">
                                        <div className="w-[85%] aspect-square rounded-full relative overflow-hidden bg-ink/5 border-[0.5px] border-ink/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1519984388953-d240ec8ceab0?auto=format&fit=crop&q=80&w=200" alt="Soba" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                                        </div>
                                        <span className="text-[9px] font-serif tracking-widest text-ink/70">Soba</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 w-1/4 pt-2">
                                        <div className="w-[75%] aspect-[3/4] rounded-sm relative overflow-hidden bg-ink/5">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1522856351838-5110ce4cdbe8?auto=format&fit=crop&q=80&w=200" alt="Cider" className="w-full h-full object-cover mix-blend-multiply grayscale-[30%]" />
                                        </div>
                                        <span className="text-[9px] font-serif tracking-widest text-ink/70">Cider</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 w-1/4">
                                        <div className="w-[90%] aspect-square relative overflow-hidden bg-ink/5">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1596704179361-9f2df6f08fb7?auto=format&fit=crop&q=80&w=200" alt="Vegetables" className="w-full h-full object-cover mix-blend-multiply grayscale-[10%]" />
                                        </div>
                                        <span className="text-[9px] font-serif tracking-[0.1em] text-ink/70 pt-0.5">Vegeta</span>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center">
                                    <span className="text-[8px] font-serif tracking-[0.2em] text-ink/60">りんご、シードル、蕎麦、大地。</span>
                                </div>
                            </div>
                        </div>

                        {/* --- 中面：裏表紙 (Back Cover) --- */}
                        <div className="w-[280px] border-r border-ink/15 border-dashed relative z-10 flex flex-col items-center justify-center p-8 text-center text-ink print:border-none pt-24">
                            <div className="mb-14 space-y-4 font-bold tracking-wider leading-relaxed text-[15px]">
                                <p>「いいづなりんご」とは？</p>
                                <p>生産者の想いや<br />お店のこだわり</p>
                                <p>飯綱町での滞在や<br />暮らしの情報まで</p>
                                <p>「りんごのまち」が<br />広く”みわたせる”<br />プラットフォームです</p>
                            </div>

                            <div className="bg-white p-3 shadow-sm mb-16 rounded-sm">
                                <QRCodeSVG
                                    value="https://appletown-iizuna.com/?flayer"
                                    size={100}
                                    level="M"
                                    includeMargin={false}
                                />
                            </div>

                            <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 flex items-center gap-2 font-sans text-[13px] tracking-widest border-b border-ink/30 border-dashed pb-[2px] opacity-90 whitespace-nowrap">
                                appletown-iizuna.com
                            </div>
                        </div>

                        {/* --- 右面：表紙 (Front Cover) --- */}
                        <div
                            className="w-[280px] relative z-10 flex flex-col items-center justify-center text-white print:border-none overflow-hidden pb-[40px] transition-colors duration-300"
                            style={{ backgroundColor: coverColor }}
                        >

                            {/* "i" motif background */}
                            <div className="absolute inset-0 pointer-events-none z-0">
                                {/* Dot: starts at y=100, extends to 180 (height=80) */}
                                <div className={`absolute top-[100px] left-1/2 -translate-x-1/2 w-[50px] h-[80px] shadow-sm transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'bg-[#E88C83]' : 'bg-white'}`}></div>
                                {/* Body: starts at y=210, extends to 500 (height=290) */}
                                <div className={`absolute top-[210px] left-1/2 -translate-x-1/2 w-[50px] h-[290px] shadow-sm transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'bg-[#E88C83]' : 'bg-white'}`}></div>
                            </div>

                            {/* Apple Grid overlay (Staggered 4-3-4-3... over 8 rows, tightly clumped in center) */}
                            {/* Increased padding drastically squishes the flex justify-between space, pulling apples together */}
                            <div className="absolute inset-0 pt-[78px] pb-[136px] px-[50px] flex flex-col justify-between opacity-100 pointer-events-none z-10">
                                {[...Array(8)].map((_, rowIndex) => {
                                    const isFourRow = rowIndex % 2 === 0;
                                    const appleCount = isFourRow ? 4 : 3;
                                    const startIdx = Math.floor(rowIndex / 2) * 7 + (isFourRow ? 0 : 4);

                                    return (
                                        <div key={rowIndex} className={`flex justify-between w-full ${!isFourRow ? 'px-[30px]' : 'px-0'}`}>
                                            {[...Array(appleCount)].map((_, colIndex) => {
                                                const appleIndex = startIdx + colIndex;
                                                const appleUrl = randomApples[appleIndex];
                                                return (
                                                    // w-0 h-0 ensures justify-between distributes point centers mathematically perfectly
                                                    <div key={colIndex} className="relative flex items-center justify-center w-0 h-0">
                                                        {appleUrl ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={appleUrl}
                                                                alt="apple"
                                                                // w-[90px] making apples slightly smaller while maintaining grid density.
                                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] max-w-none h-auto object-contain"
                                                            />
                                                        ) : (
                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30px] leading-none text-center z-10">🍎</div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>

                            <h1 className={`absolute bottom-[44px] left-1/2 -translate-x-1/2 text-[18px] font-bold tracking-widest z-30 drop-shadow-md whitespace-nowrap transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'text-[#E88C83]' : 'text-white'}`}>
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

                        {/* --- 左面 (Mitoro Style Redesign: 知る / 暮らす) --- */}
                        <div className="w-[280px] border-r border-[#D5CD97] border-dashed relative z-10 p-8 flex flex-col justify-start print:border-none text-ink/90 overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-10 right-0 w-[150px] h-[150px] bg-white/20 rounded-full blur-2xl -z-10"></div>

                            <div className="flex flex-col h-full pt-[40px] relative">

                                {/* Section 1: 知る (Learn/History) */}
                                <div className="relative z-20 mb-[30px]">
                                    {/* Mitoro-style playful heading */}
                                    <div className="relative inline-block mb-3">
                                        <div className="absolute inset-0 bg-[#A1C23A]/20 -rotate-2 rounded-sm transform scale-105 origin-bottom-left z-[-1]"></div>
                                        <h3 className="text-[16px] font-bold tracking-widest flex items-end">
                                            知る <span className="text-[10px] font-normal pl-2 ml-2 pb-0.5 text-ink/70">歴史・栽培品種</span>
                                        </h3>
                                    </div>

                                    {/* Dynamic overlapping image composition */}
                                    <div className="relative w-full h-[140px] mt-2">
                                        {/* Main image */}
                                        <div className="absolute top-0 left-0 w-[160px] h-[110px] bg-white p-1.5 shadow-md rotate-[-3deg] z-10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1590005354167-6da97ce2b4fe?auto=format&fit=crop&q=80&w=300" alt="Apple history" className="w-full h-full object-cover filter contrast-110 saturate-110" />
                                        </div>
                                        {/* Secondary overlapping image */}
                                        <div className="absolute top-[30px] right-[10px] w-[100px] h-[100px] bg-white p-1 rounded-full shadow-lg rotate-[5deg] z-20 overflow-hidden border-2 border-[#EBE2AF]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200" alt="Varieties" className="w-full h-full object-cover" />
                                        </div>
                                        {/* Playful pop-out badge */}
                                        <div className="absolute bottom-1 left-4 bg-[#F1CE00] text-ink font-bold text-[9px] py-1 px-3 rotate-[-5deg] shadow-sm whitespace-nowrap z-30 transform border border-ink/10 rounded-sm">
                                            50種類以上の品種！
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: 暮らす (Live/Work) */}
                                <div className="relative z-20 pt-[20px]">
                                    {/* Mitoro-style playful heading */}
                                    <div className="relative inline-block mb-4">
                                        <div className="absolute bottom-1 left-0 right-0 h-[6px] bg-[#E88C83]/40 -rotate-1 rounded-sm z-[-1]"></div>
                                        <h3 className="text-[16px] font-bold tracking-widest flex items-end">
                                            暮らす <span className="text-[10px] font-normal pl-2 ml-2 pb-0.5 text-ink/70">移住・お仕事</span>
                                        </h3>
                                    </div>

                                    {/* Dynamic image composition with tape/scrapbook feel */}
                                    <div className="relative w-full h-[160px]">
                                        {/* Large lifestyle image */}
                                        <div className="absolute top-0 right-[-10px] w-[200px] h-[130px] shadow-sm rounded-lg overflow-hidden border-[3px] border-white rotate-[2deg] z-10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" alt="Living in nature" className="w-full h-full object-cover" />
                                        </div>
                                        {/* "Masking tape" effect */}
                                        <div className="absolute top-[-8px] right-[70px] w-[40px] h-[15px] bg-white/60 shadow-sm rotate-[-15deg] z-20 mix-blend-overlay"></div>
                                        <div className="absolute top-[-8px] right-[70px] w-[40px] h-[15px] bg-yellow-100/40 rotate-[-15deg] z-20"></div>

                                        {/* Small inset detail image */}
                                        <div className="absolute bottom-0 left-[-5px] w-[110px] h-[80px] bg-white p-1 shadow-md rotate-[-4deg] z-20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://images.unsplash.com/photo-1547989453-11e67af3610c?auto=format&fit=crop&q=80&w=200" alt="Workspace" className="w-full h-full object-cover filter contrast-125 saturate-110" />
                                        </div>

                                        {/* playful text arrow/label */}
                                        <div className="absolute top-[80px] left-[5px] flex flex-col items-center rotate-[-10deg] z-30">
                                            <span className="text-[8px] font-bold text-[#E88C83] bg-white px-1.5 py-0.5 rounded-sm shadow-sm whitespace-nowrap">自然の中で働く！</span>
                                            {/* Hand-drawn style line/arrow using SVG */}
                                            <svg width="20" height="20" viewBox="0 0 20 20" className="mt-0.5 text-[#E88C83] fill-current">
                                                <path d="M10 0 C15 5, 20 10, 15 15 L20 12 L15 20 L12 15 L15 15 C10 10, 5 5, 10 0 Z" transform="scale(0.8) translate(2,2)" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* --- 中面 --- */}
                        <div className="w-[280px] border-r border-[#D5CD97] border-dashed relative z-10 p-10 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[70px]">
                                <div className="relative z-20 mb-auto">
                                    <h3 className="text-[14px] font-bold tracking-widest flex items-center mb-6">
                                        味わう <span className="font-normal border-l border-ink/40 pl-2 ml-2">販売場所・生産者</span>
                                    </h3>
                                    <div className="w-full h-[100px] bg-white/40 flex items-center justify-center text-xs text-ink/40 border border-[#D5CD97]">Image Placeholder</div>
                                </div>
                            </div>
                        </div>

                        {/* --- 右面 --- */}
                        <div className="w-[280px] relative z-10 p-10 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[70px]">
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
