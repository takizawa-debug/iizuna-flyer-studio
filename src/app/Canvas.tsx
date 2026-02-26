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
                        {/* --- 左面：中折り (Inside Flap) --- */}
                        {/* --- 左面：中折り (Inside Flap) - Editorial Masterpiece --- */}
                        <div className="w-[280px] h-full relative z-10 flex flex-col pt-[45px] pb-[35px] px-[28px] text-ink print:border-none">

                            {/* Dynamic Absolute Background Silhouette - Using user's specific PNG */}
                            <div
                                className="absolute -bottom-[60px] -left-[100px] w-[500px] h-[500px] opacity-[0.09] pointer-events-none z-0 transform rotate-[10deg] transition-colors duration-500"
                                style={{
                                    backgroundColor: coverColor === '#FFFFFF' ? '#E88C83' : coverColor,
                                    WebkitMaskImage: `url('/apple-silhouette.png')`,
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: `url('/apple-silhouette.png')`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                }}
                            />

                            {/* 1. Header Area — Editorial Magazine Typography */}
                            <div className="w-full flex flex-col justify-start mb-6 mt-1 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-sans tracking-[0.35em] text-ink/50 uppercase mb-1">Welcome to</span>
                                    <h3 className="text-[18px] font-serif tracking-[0.08em] leading-[1.3] text-ink/90 font-bold">
                                        りんごのまちへ。
                                    </h3>
                                </div>
                                {/* Refined thick yellow line */}
                                <div className="w-[70%] h-[3px] bg-[#E8C340] mt-3"></div>
                            </div>

                            {/* 2. Access Section — Grid: [Tokyo | Icon | Route line | Iizuna] */}
                            <div className="w-full grid grid-cols-[auto_18px_1fr_auto] gap-x-1.5 gap-y-3 items-center py-2 mb-5">
                                {/* Tokyo (row-span-2, far left, boxed) */}
                                <div className="row-span-2 flex items-center">
                                    <div className="border border-ink/30 px-1.5 py-1">
                                        <span className="text-[9px] font-bold tracking-widest text-ink">東京</span>
                                    </div>
                                </div>

                                {/* Row 1: Train icon */}
                                <div className="text-ink/50 flex justify-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8 2 4 4 4 12v4c0 1.1.9 2 2 2h2v2h2v-2h4v2h2v-2h2c1.1 0 2-.9 2-2v-4c0-8-4-10-8-10zm0 2c3.2 0 6 1.6 6 8H6c0-6.4 2.8-8 6-8zm-3.5 13c-.83 0-1.5-.67-1.5-1.5S7.67 14 8.5 14s1.5.67 1.5 1.5S9.33 17 8.5 17zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 12H6V9h12v3z" />
                                    </svg>
                                </div>

                                {/* Row 1: Train route dashed line */}
                                <div className="flex items-center w-full relative h-[22px]">
                                    {/* Full-width dashed line */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-[1px] border-dashed border-ink/25 z-0"></div>
                                    {/* Label: Shinkansen 1.5H */}
                                    <div className="bg-[#FBF4F0] px-1 z-10 text-center flex flex-col leading-none mx-auto">
                                        <span className="text-[5px] text-ink/45 leading-[1.3]">新幹線</span>
                                        <span className="text-[6px] text-ink/70 font-bold leading-[1.3]">1.5H</span>
                                    </div>
                                    {/* Nagano waypoint */}
                                    <div className="bg-[#FBF4F0] px-1 z-10 flex-shrink-0">
                                        <span className="text-[8px] font-bold text-ink">長野</span>
                                    </div>
                                    {/* Label: Local train 20min */}
                                    <div className="bg-[#FBF4F0] px-1 z-10 text-center flex flex-col leading-none mx-auto">
                                        <span className="text-[5px] text-[#D45D56]/70 leading-[1.3]">電車</span>
                                        <span className="text-[6px] text-[#D45D56]/90 font-bold leading-[1.3]">20MIN</span>
                                    </div>
                                </div>

                                {/* Iizuna (row-span-2, far right, boxed red) */}
                                <div className="row-span-2 flex items-center">
                                    <div className="bg-[#D45D56] text-white px-2 py-1.5 shadow-sm">
                                        <span className="text-[9px] font-bold tracking-[0.1em]">飯綱町</span>
                                    </div>
                                </div>

                                {/* Row 2: Car icon */}
                                <div className="text-ink/50 flex justify-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
                                        <circle cx="7.5" cy="14.5" r="1.5" /><circle cx="16.5" cy="14.5" r="1.5" />
                                    </svg>
                                </div>

                                {/* Row 2: Car route dashed line */}
                                <div className="flex items-center w-full relative h-[22px]">
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-[1px] border-dashed border-ink/25 z-0"></div>
                                    <div className="bg-[#FBF4F0] px-1 z-10 text-center flex flex-col leading-none mx-auto">
                                        <span className="text-[5px] text-ink/45 leading-[1.3]">車</span>
                                        <span className="text-[6px] text-ink/70 font-bold leading-[1.3]">3H</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subtext describing the town */}
                            <div className="w-full mb-6">
                                <p className="text-[8px] font-serif tracking-[0.1em] text-ink/80 leading-[1.8] pl-2 border-l border-ink/20">
                                    長野から約2時間。<br />
                                    標高500m〜900m、寒暖差のある冷涼な地域です。
                                </p>
                            </div>

                            {/* 3. Seasons Photography (Hero Block) */}
                            <div className="w-full aspect-[4/3] relative mb-4">
                                {/* Elegant 4-season grid with crisp white inner hairlines */}
                                <div className="absolute inset-0 bg-white grid grid-cols-2 grid-rows-2 gap-[1.5px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-[0.5px] border-ink/10">
                                    <div className="relative overflow-hidden w-full h-full bg-ink/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/bd0a2240-8eef-013e-f636-0a58a9feac02/08d38714aac878e65d2e26af32577e64.jpg" alt="Spring" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%]" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full bg-ink/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/ec2954c0-a041-013e-ff9d-0a58a9feac02/iizuna_20220525-2.jpg" alt="Summer" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%]" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full bg-ink/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/b0a34c40-a041-013e-b18a-0a58a9feac02/20231013_sweet-3.jpg" alt="Autumn" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%]" />
                                    </div>
                                    <div className="relative overflow-hidden w-full h-full bg-ink/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/120aadf0-a042-013e-ffb1-0a58a9feac02/iizuna_20250123-10.jpg" alt="Winter" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%]" />
                                    </div>
                                </div>
                            </div>

                            {/* Poetic Caption tied to the grid */}
                            <div className="w-full flex items-end justify-between mb-auto">
                                <p className="text-[9px] font-serif tracking-[0.2em] leading-[1.8] text-ink/80">
                                    春の桃源郷、夏の涼風。<br />
                                    秋の黄金色と冬の静寂。
                                </p>
                                <span className="text-[4px] font-sans tracking-[0.3em] uppercase text-ink/30 transform -translate-y-1">The Four Seasons</span>
                            </div>

                            {/* 4. Food Index (High-end catalog style) */}
                            <div className="w-full pt-1 pb-1">
                                <div className="w-full h-[0.5px] bg-ink/10 mb-4"></div>
                                <div className="flex justify-between items-start">
                                    {[
                                        { url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=200', name: 'りんご', sub: 'APPLE' },
                                        { url: 'https://images.unsplash.com/photo-1519984388953-d240ec8ceab0?auto=format&fit=crop&q=80&w=200', name: '蕎麦', sub: 'SOBA' },
                                        { url: 'https://images.unsplash.com/photo-1522856351838-5110ce4cdbe8?auto=format&fit=crop&q=80&w=200', name: 'シードル', sub: 'CIDER' },
                                        { url: 'https://images.unsplash.com/photo-1596704179361-9f2df6f08fb7?auto=format&fit=crop&q=80&w=200', name: '高原野菜', sub: 'VEGETA' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center w-[45px]">
                                            <div className="w-[32px] h-[40px] mb-2 bg-[#EBE2AF]/50 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-[0.5px] border-ink/5">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.url} alt={item.name} className="w-full h-full object-cover filter grayscale-[15%] contrast-110 sepia-[10%] mix-blend-multiply opacity-90" />
                                            </div>
                                            <span className="text-[7px] font-serif tracking-widest text-ink font-bold">{item.name}</span>
                                            <span className="text-[4px] font-sans tracking-[0.2em] text-ink/40 uppercase mt-0.5">{item.sub}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex justify-center mt-5">
                                    <span className="text-[7px] font-serif tracking-[0.3em] text-ink/60">りんご、シードル、蕎麦、大地。</span>
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

                            {/* "Information (i)" abstract motif background */}
                            <div className="absolute inset-0 pointer-events-none z-0">
                                {/* Dot: Abstract Rectangle */}
                                <div className={`absolute top-[100px] left-1/2 -translate-x-1/2 w-[50px] h-[80px] transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'bg-black opacity-5' : 'bg-white opacity-[0.25]'}`}></div>

                                {/* Body: Stem with subtle serifs, rendered as a single cohesive SVG to avoid any overlapping lines */}
                                <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-[100px] h-[290px]">
                                    <svg width="100%" height="100%" viewBox="0 0 100 290" xmlns="http://www.w3.org/2000/svg" className={`transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'fill-black opacity-5' : 'fill-white opacity-[0.25]'}`}>
                                        <path d="M 75 0 V 270 H 100 V 290 H 0 V 270 H 25 V 16 H 9 V 0 Z" />
                                    </svg>
                                </div>
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
                                                                style={{
                                                                    // High-end layered realistic shadow:
                                                                    // 1. Sharp dark contact shadow right at the edge
                                                                    // 2. Soft, wide diffuse shadow cast to the bottom-right
                                                                    filter: `
                                                                        drop-shadow(1.5px 2px 1.5px rgba(0,0,0,0.4))
                                                                        drop-shadow(6px 10px 8px rgba(0,0,0,0.25))
                                                                        contrast(1.05) saturate(1.05) brightness(0.98)
                                                                    `
                                                                }}
                                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] max-w-none h-auto object-contain transition-transform duration-500 hover:scale-105"
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

                        {/* --- 左面 --- */}
                        <div className="w-[280px] border-r border-[#D5CD97] border-dashed relative z-10 p-10 flex flex-col print:border-none text-ink/90">
                            <div className="flex flex-col h-full pt-[70px]">
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
