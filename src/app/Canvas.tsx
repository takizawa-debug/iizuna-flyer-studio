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

                            {/* 1. Header Area — Editorial Typography */}
                            <div className="w-full flex flex-col justify-start mb-3 mt-1 relative z-10">
                                <h3 className="text-[15px] tracking-[0.18em] leading-[1.4] text-ink/85 whitespace-nowrap" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>
                                    ようこそ、りんごのまちへ。
                                </h3>
                                {/* Yellow underline extending to x=250 */}
                                <div className="w-[222px] h-[3px] bg-[#E8C340] mt-2"></div>
                            </div>

                            {/* 2. Access Section — Grid layout with icons centered between route rows */}
                            <div className="w-full grid grid-cols-[auto_1fr_auto] gap-x-0 gap-y-0 items-center mb-2">
                                {/* Tokyo pictogram (spans both route rows) */}
                                <div className="row-span-2 flex flex-col items-center justify-center pr-1" style={{ height: '62px' }}>
                                    <svg viewBox="0 0 512 512" className="w-[28px] h-[48px]" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="currentColor" className="text-ink/60">
                                            <path d="M319.625,312.844l19.938-41.75v-48.781h-37.516l-2.406-46.625l20.953-32.188V96h-56.422V0h-16.344v96h-56.422v46.594l21.031,31.469l-2.484,48.25h-37.516v47.531l20.234,40.938L164.609,512h71.953l2.094-5.031c4.094-9.828,11.672-25.516,17.344-37.016c5.672,11.5,13.234,27.172,17.328,37.016l2.094,5.031h71.969L319.625,312.844z M315.125,398.969h-50.953v-30.297h46.734L315.125,398.969z M264.172,352.328v-33.703h39.75l4.703,33.703H264.172z M247.828,352.328h-44.453l4.688-33.703h39.766V352.328z M201.094,368.672h46.734v30.297h-50.969L201.094,368.672z M247.828,415.313v30.297h-57.469l4.234-30.297H247.828z M264.172,415.313h53.234l4.234,30.297h-57.469V415.313z M283.547,180.766l2.141,41.547h-21.516v-41.547H283.547z M207.75,112.344h96.5v26.297l-16.781,25.797h-61.813l-17.906-26.813V112.344z M228.469,180.766h19.359v41.547h-21.516L228.469,180.766z M188.781,238.656h20.328h93.781h20.328v28.75l-16.672,34.891h-99.844l-17.922-36.266V238.656z M225.734,495.656h-42.344l4.703-33.703h53.625C236.781,471.938,230.266,485.375,225.734,495.656z M286.25,495.656c-4.531-10.281-11.047-23.719-15.984-33.703h53.641l4.703,33.703H286.25z" />
                                            <rect x="218.219" y="258.375" width="12.25" height="28.594" />
                                            <rect x="249.875" y="258.375" width="12.25" height="28.594" />
                                            <rect x="281.531" y="258.375" width="12.25" height="28.594" />
                                            <rect x="234.047" y="124.25" width="12.25" height="28.594" />
                                            <rect x="265.703" y="124.25" width="12.25" height="28.594" />
                                        </g>
                                    </svg>
                                    <span className="text-[7px] font-bold text-ink/50 tracking-wider leading-none mt-px" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>東京</span>
                                </div>

                                {/* Row 1: Train route */}
                                <div className="flex items-center w-full gap-0">
                                    <div className="flex-1 border-t-[1px] border-dashed border-ink/25"></div>
                                    <div className="px-1 text-center flex flex-col leading-none flex-shrink-0">
                                        <span className="text-[8px] text-ink/50 leading-[1.3]">新幹線</span>
                                        <span className="text-[9px] text-ink/80 font-bold leading-[1.3]">1.5H</span>
                                    </div>
                                    <div className="flex-1 border-t-[1px] border-dashed border-ink/25"></div>
                                    <div className="px-1 flex-shrink-0 flex items-center">
                                        <span className="text-[10px] font-bold text-ink leading-none">長野</span>
                                    </div>
                                    <div className="flex-1 border-t-[1px] border-dashed border-[#D45D56]/40"></div>
                                    <div className="px-1 text-center flex flex-col leading-none flex-shrink-0">
                                        <span className="text-[8px] text-[#D45D56]/70 leading-[1.3]">電車</span>
                                        <span className="text-[9px] text-[#D45D56] font-bold leading-[1.3]">20MIN</span>
                                    </div>
                                    <div className="flex-1 border-t-[1px] border-dashed border-[#D45D56]/40"></div>
                                </div>

                                {/* Iizuna apple pictogram (spans both route rows) */}
                                <div className="row-span-2 flex flex-col items-center justify-center pl-1" style={{ height: '62px' }}>
                                    <div
                                        className="w-[32px] h-[32px]"
                                        style={{
                                            backgroundColor: '#D45D56',
                                            WebkitMaskImage: `url('/apple-silhouette.png')`,
                                            WebkitMaskSize: 'contain',
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center',
                                            maskImage: `url('/apple-silhouette.png')`,
                                            maskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            opacity: 0.6,
                                        }}
                                    />
                                    <span className="text-[7px] font-bold text-[#D45D56]/60 tracking-wider leading-none mt-px" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>飯綱町</span>
                                </div>

                                {/* Row 2: Car route */}
                                <div className="flex items-center w-full gap-0">
                                    <div className="flex-1 border-t-[1px] border-dashed border-ink/25"></div>
                                    <div className="px-1.5 flex items-center gap-1 flex-shrink-0">
                                        <span className="text-[8px] text-ink/50 leading-none">車</span>
                                        <span className="text-[9px] text-ink/80 font-bold leading-none">3H</span>
                                    </div>
                                    <div className="flex-1 border-t-[1px] border-dashed border-ink/25"></div>
                                </div>
                            </div>

                            {/* Subtext describing the town */}
                            <div className="w-full mb-3">
                                <p className="text-[8px] font-serif tracking-[0.1em] text-ink/80 leading-[1.8] pl-2 border-l border-ink/20">
                                    東京から約2時間。標高500m～900m。<br />
                                    四季の移ろいが美しい、ちょうどいい田舎。<br />
                                    冷涼な気候と豊かな土壌が「いいづなりんご」を育てます。
                                </p>
                            </div>

                            {/* 3. Seasons Photography (Hero Block) */}
                            <div className="w-full aspect-[4/3] relative mb-2">
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
                                <div className="w-full h-[0.5px] bg-ink/10 mb-2"></div>
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

                        {/* --- 中面：裏表紙 (Back Cover) — Editorial Index --- */}
                        <div className="w-[280px] border-r border-ink/15 border-dashed relative z-10 flex flex-col pt-[40px] pb-[35px] px-[24px] text-ink print:border-none">

                            {/* Section header */}
                            <div className="mb-5">
                                <span className="text-[9px] tracking-[0.3em] text-ink/40 uppercase" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>APPLETOWN IIZUNA</span>
                                <h2 className="text-[16px] tracking-[0.12em] leading-[1.5] text-ink mt-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>
                                    りんごから広がる、<br />町のすべて。
                                </h2>
                                <div className="w-[40px] h-[2px] bg-[#E8C340] mt-2"></div>
                            </div>

                            {/* Intro paragraph */}
                            <p className="text-[7.5px] font-serif tracking-[0.08em] text-ink/70 leading-[1.9] mb-5">
                                50種以上のりんご、受け継がれる里山の知恵、<br />
                                そして新しい暮らし方——。<br />
                                このパンフレットでは伝えきれない<br />
                                飯綱町の物語が、ウェブサイトに広がっています。
                            </p>

                            {/* 5 editorial sections */}
                            <div className="flex flex-col gap-3 mb-5">

                                {/* 知る */}
                                <div className="flex items-start gap-2">
                                    <div className="w-[3px] h-[28px] bg-[#E8C340] rounded-full flex-shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>知る</span>
                                            <span className="text-[5px] tracking-[0.2em] text-ink/35 uppercase">STORY</span>
                                        </div>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7] mt-0.5 tracking-[0.05em]">
                                            「日本一のりんごの町」の歴史。<br />
                                            科学が証明する、美味しさの理由。
                                        </p>
                                    </div>
                                </div>

                                {/* 味わう */}
                                <div className="flex items-start gap-2">
                                    <div className="w-[3px] h-[28px] bg-[#D45D56] rounded-full flex-shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>味わう</span>
                                            <span className="text-[5px] tracking-[0.2em] text-ink/35 uppercase">DELICIOUS</span>
                                        </div>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7] mt-0.5 tracking-[0.05em]">
                                            直売所、シードル醸造所、生産者の顔。<br />
                                            英国りんごフェアやスイーツコンクールも。
                                        </p>
                                    </div>
                                </div>

                                {/* 体験する */}
                                <div className="flex items-start gap-2">
                                    <div className="w-[3px] h-[28px] bg-leaf rounded-full flex-shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>体験する</span>
                                            <span className="text-[5px] tracking-[0.2em] text-ink/35 uppercase">DISCOVER</span>
                                        </div>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7] mt-0.5 tracking-[0.05em]">
                                            りんごの木のオーナー制度。<br />
                                            りんご学校、ワーキングホリデー。
                                        </p>
                                    </div>
                                </div>

                                {/* 暮らす */}
                                <div className="flex items-start gap-2">
                                    <div className="w-[3px] h-[28px] bg-ink/30 rounded-full flex-shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>暮らす</span>
                                            <span className="text-[5px] tracking-[0.2em] text-ink/35 uppercase">LIFE</span>
                                        </div>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7] mt-0.5 tracking-[0.05em]">
                                            移住体験住宅、就農里親制度。<br />
                                            「ちょうどいい田舎」で始める新生活。
                                        </p>
                                    </div>
                                </div>

                                {/* 営む */}
                                <div className="flex items-start gap-2">
                                    <div className="w-[3px] h-[28px] bg-[#C4956A] rounded-full flex-shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>営む</span>
                                            <span className="text-[5px] tracking-[0.2em] text-ink/35 uppercase">PARTNERS</span>
                                        </div>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7] mt-0.5 tracking-[0.05em]">
                                            栽培講習会、補助金、加工所。<br />
                                            事業者を支えるしくみがここに。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-ink/10 mb-4"></div>

                            {/* CTA + QR */}
                            <div className="flex items-start gap-3">
                                <div className="bg-white p-2 shadow-sm rounded-sm flex-shrink-0">
                                    <QRCodeSVG
                                        value="https://appletown-iizuna.com/?flayer"
                                        size={64}
                                        level="M"
                                        includeMargin={false}
                                    />
                                </div>
                                <div className="flex flex-col justify-center pt-1">
                                    <p className="text-[6.5px] font-serif text-ink/55 leading-[1.8] tracking-[0.05em]">
                                        サイトでは記事ごとにQRコード付き<br />
                                        A4印刷にも対応。気になる記事は<br />
                                        そのまま持ち歩けます。
                                    </p>
                                    <div className="mt-2 border-b border-ink/25 border-dashed pb-px inline-block self-start">
                                        <span className="text-[9px] tracking-[0.12em] text-ink/80" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>appletown-iizuna.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom tagline */}
                            <div className="mt-auto pt-4 text-center">
                                <p className="text-[6px] tracking-[0.25em] text-ink/30 uppercase" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    The gateway to Apple Town Iizuna
                                </p>
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

                            <h1 className={`absolute bottom-[44px] left-1/2 -translate-x-1/2 text-[18px] tracking-[0.2em] z-30 drop-shadow-md whitespace-nowrap transition-colors duration-300 ${coverColor === '#FFFFFF' ? 'text-[#E88C83]' : 'text-white'}`} style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>
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

                        {/* Title across panels */}
                        <div className="absolute top-[28px] left-[30px] z-20">
                            <span className="text-[8px] tracking-[0.3em] text-ink/35 uppercase" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>APPLETOWN IIZUNA — THE STORIES</span>
                            <h2 className="text-[20px] tracking-[0.15em] text-ink/90 mt-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>
                                いいづなりんごからはじまる物語
                            </h2>
                            <div className="w-[50px] h-[2px] bg-[#E8C340] mt-1.5"></div>
                        </div>

                        {/* --- 左面：知る＋暮らす --- */}
                        <div className="w-[280px] border-r border-[#D5CD97]/50 border-dashed relative z-10 flex flex-col print:border-none text-ink/90 pt-[80px] px-[22px] pb-[22px]">

                            {/* 知る section */}
                            <div className="mb-5">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <div className="w-[3px] h-[16px] bg-[#E8C340] rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>知る</span>
                                    <span className="text-[6px] tracking-[0.2em] text-ink/30 uppercase">STORY</span>
                                </div>
                                <p className="text-[7px] font-serif text-ink/55 leading-[1.8] mb-2.5 tracking-[0.04em]">
                                    町の歴史・品種図鑑・栽培の科学
                                </p>

                                {/* Apple varieties highlight */}
                                <div className="bg-white/50 rounded-sm p-3 mb-3">
                                    <p className="text-[8px] font-bold tracking-[0.1em] mb-1.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        50種を超えるりんごの宝庫
                                    </p>
                                    <p className="text-[6.5px] font-serif text-ink/60 leading-[1.8] tracking-[0.03em]">
                                        ふじ、つがる、王林の定番から、長野県生まれの<br />
                                        シナノスイート、シナノゴールド、秋映。<br />
                                        英国品種ブラムリーやグラニー・スミス。<br />
                                        幻の和りんご「高坂りんご」まで。
                                    </p>
                                </div>

                                {/* Science box */}
                                <div className="border-l-2 border-[#E8C340] pl-2.5 mb-1">
                                    <p className="text-[7px] font-bold tracking-[0.08em] mb-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        科学が証明する、飯綱の美味しさ
                                    </p>
                                    <p className="text-[6px] font-serif text-ink/55 leading-[1.8]">
                                        昼夜の寒暖差が糖度を凝縮し、実を引き締める。<br />
                                        糖酸比30〜40——科学的に「美味しい」数値域。<br />
                                        シャキシャキの食感は、破断強度で実証済み。
                                    </p>
                                </div>

                                {/* Museum callout */}
                                <div className="bg-[#E8C340]/10 rounded-sm px-2.5 py-1.5 mt-2">
                                    <p className="text-[6.5px] font-serif text-ink/55 leading-[1.6]">
                                        <span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>アップルミュージアム</span>——ニュートンのりんごの木や初代Macまで展示。全国でも珍しいりんご博物館。
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-[#D5CD97]/40 mb-4"></div>

                            {/* 暮らす section */}
                            <div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <div className="w-[3px] h-[16px] bg-ink/25 rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>暮らす</span>
                                    <span className="text-[6px] tracking-[0.2em] text-ink/30 uppercase">LIFE</span>
                                </div>
                                <p className="text-[7px] font-serif text-ink/55 leading-[1.8] mb-2.5 tracking-[0.04em]">
                                    移住・就職・就農の支援
                                </p>
                                <div className="space-y-2">
                                    <div className="flex gap-2 items-start">
                                        <span className="text-[6px] text-ink/30 mt-[2px]">●</span>
                                        <p className="text-[6.5px] font-serif text-ink/65 leading-[1.7]">
                                            <span className="font-bold">移住体験住宅</span>——古民家に最長6泊7日。<br />
                                            生活導線を体感できるお試し滞在。
                                        </p>
                                    </div>
                                    <div className="flex gap-2 items-start">
                                        <span className="text-[6px] text-ink/30 mt-[2px]">●</span>
                                        <p className="text-[6.5px] font-serif text-ink/65 leading-[1.7]">
                                            <span className="font-bold">就農里親制度</span>——約3年で独立。<br />
                                            里親農家の実地指導で基礎から伴走。
                                        </p>
                                    </div>
                                    <div className="flex gap-2 items-start">
                                        <span className="text-[6px] text-ink/30 mt-[2px]">●</span>
                                        <p className="text-[6.5px] font-serif text-ink/65 leading-[1.7]">
                                            <span className="font-bold">いいコネワークス</span>——複数の仕事を<br />
                                            組み合わせ、収入と暮らしの安定を。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- 中面：味わう --- */}
                        <div className="w-[280px] border-r border-[#D5CD97]/50 border-dashed relative z-10 flex flex-col print:border-none text-ink/90 pt-[80px] px-[22px] pb-[22px]">

                            <div className="flex items-baseline gap-2 mb-2">
                                <div className="w-[3px] h-[16px] bg-[#D45D56] rounded-full"></div>
                                <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>味わう</span>
                                <span className="text-[6px] tracking-[0.2em] text-ink/30 uppercase">DELICIOUS</span>
                            </div>
                            <p className="text-[7px] font-serif text-ink/55 leading-[1.8] mb-3 tracking-[0.04em]">
                                直売所・生産者・加工品・イベント
                            </p>

                            {/* Direct sales shops */}
                            <div className="mb-4">
                                <p className="text-[8px] font-bold tracking-[0.1em] mb-2" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    りんごが買えるお店
                                </p>
                                <div className="space-y-1.5">
                                    <div className="bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <p className="text-[7px] font-bold tracking-[0.06em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>むーちゃん</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.6]">カフェ併設、農業体験の相談窓口も</p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <p className="text-[7px] font-bold tracking-[0.06em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>さんちゃん</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.6]">手作りジャム、アップルパイが人気</p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <p className="text-[7px] font-bold tracking-[0.06em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>四季彩</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.6]">雪むろ熟成りんご、収穫体験も併設</p>
                                    </div>
                                </div>
                            </div>

                            {/* Processed goods */}
                            <div className="mb-4">
                                <p className="text-[8px] font-bold tracking-[0.1em] mb-2" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    加工品
                                </p>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <div className="bg-white/40 rounded-sm p-1.5 text-center">
                                        <p className="text-[7px] font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>ジュース</p>
                                        <p className="text-[5.5px] text-ink/45 leading-[1.5] mt-0.5">品種別の<br />飲み比べ</p>
                                    </div>
                                    <div className="bg-white/40 rounded-sm p-1.5 text-center">
                                        <p className="text-[7px] font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>シードル</p>
                                        <p className="text-[5.5px] text-ink/45 leading-[1.5] mt-0.5">2つの<br />醸造所</p>
                                    </div>
                                    <div className="bg-white/40 rounded-sm p-1.5 text-center">
                                        <p className="text-[7px] font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>ジャム</p>
                                        <p className="text-[5.5px] text-ink/45 leading-[1.5] mt-0.5">多品種の<br />味わい</p>
                                    </div>
                                </div>
                            </div>

                            {/* Events */}
                            <div className="border-t border-[#D5CD97]/40 pt-3">
                                <p className="text-[8px] font-bold tracking-[0.1em] mb-2" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    季節のイベント
                                </p>
                                <div className="space-y-1.5">
                                    <div className="flex items-start gap-1.5">
                                        <span className="text-[7px] text-[#D45D56]/60 font-bold flex-shrink-0 mt-px" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>秋</span>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.6]">英国りんごフェア — 料理用りんごの魅力を発信</p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <span className="text-[7px] text-[#D45D56]/60 font-bold flex-shrink-0 mt-px" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>冬</span>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.6]">ふじまつり — 開始2時間で完売の人気</p>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <span className="text-[7px] text-[#D45D56]/60 font-bold flex-shrink-0 mt-px" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>通年</span>
                                        <p className="text-[6.5px] font-serif text-ink/60 leading-[1.6]">スイーツコンクール — パティシエが腕を競う</p>
                                    </div>
                                </div>
                            </div>

                            {/* Online shop callout */}
                            <div className="mt-auto pt-3">
                                <div className="rounded-sm px-2.5 py-2 border border-[#D45D56]/15" style={{ backgroundColor: 'rgba(212, 93, 86, 0.08)' }}>
                                    <p className="text-[7px] font-bold tracking-[0.06em] text-[#D45D56]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>みつどんマルシェ</p>
                                    <p className="text-[6px] font-serif text-ink/55 leading-[1.6]">オンラインで全国配送。30品種食べ比べ定期便も。</p>
                                </div>
                            </div>
                        </div>

                        {/* --- 右面：体験する＋営む --- */}
                        <div className="w-[280px] relative z-10 flex flex-col print:border-none text-ink/90 pt-[80px] px-[22px] pb-[22px]">

                            {/* 体験する section */}
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <div className="w-[3px] h-[16px] bg-leaf rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>体験する</span>
                                    <span className="text-[6px] tracking-[0.2em] text-ink/30 uppercase">DISCOVER</span>
                                </div>
                                <p className="text-[7px] font-serif text-ink/55 leading-[1.8] mb-2.5 tracking-[0.04em]">
                                    農業体験・滞在・フォトスポット
                                </p>

                                <div className="space-y-2 mb-3">
                                    <div className="bg-white/50 rounded-sm p-2.5">
                                        <p className="text-[7.5px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>りんごの木オーナー制度</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.7] mt-0.5">
                                            1本の木を契約し、秋に自分だけの収穫を。<br />
                                            管理はプロに任せる安心プランも。
                                        </p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm p-2.5">
                                        <p className="text-[7.5px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>信州いいづなりんご学校</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.7] mt-0.5">
                                            日帰りから上級まで段階的に学べる<br />
                                            体験型プログラム。農家との交流も。
                                        </p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm p-2.5">
                                        <p className="text-[7.5px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>ワーキングホリデー</p>
                                        <p className="text-[6px] font-serif text-ink/55 leading-[1.7] mt-0.5">
                                            3泊4日、農家に入り込む実践型。<br />
                                            就農の入り口として。
                                        </p>
                                    </div>
                                </div>

                                {/* Photo spots mini */}
                                <div className="flex gap-1.5 text-center">
                                    <div className="flex-1 bg-white/30 rounded-sm py-1.5 px-1">
                                        <p className="text-[5.5px] text-ink/50 leading-[1.5]">りんご畑の<br />四季の風景</p>
                                    </div>
                                    <div className="flex-1 bg-white/30 rounded-sm py-1.5 px-1">
                                        <p className="text-[5.5px] text-ink/50 leading-[1.5]">ニュートン<br />りんご並木</p>
                                    </div>
                                    <div className="flex-1 bg-white/30 rounded-sm py-1.5 px-1">
                                        <p className="text-[5.5px] text-ink/50 leading-[1.5]">りんごの<br />カーブミラー</p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-[#D5CD97]/40 mb-3"></div>

                            {/* 営む section */}
                            <div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <div className="w-[3px] h-[16px] bg-[#C4956A] rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>営む</span>
                                    <span className="text-[6px] tracking-[0.2em] text-ink/30 uppercase">PARTNERS</span>
                                </div>
                                <p className="text-[7px] font-serif text-ink/55 leading-[1.8] mb-2 tracking-[0.04em]">
                                    栽培支援・補助金・施設情報
                                </p>
                                <div className="space-y-1">
                                    <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7]">
                                        <span className="font-bold">JAりんご部会講習会</span> / 苗木導入補助 / 大型機械整備
                                    </p>
                                    <p className="text-[6.5px] font-serif text-ink/60 leading-[1.7]">
                                        <span className="font-bold">共同利用機械</span>補助 / 三本松加工所 / JAフルーツセンター
                                    </p>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-auto pt-3 text-center">
                                <div className="bg-ink/5 rounded-sm px-3 py-2">
                                    <p className="text-[6.5px] font-serif text-ink/50 leading-[1.7] tracking-[0.04em]">
                                        すべての記事は<br />
                                        <span className="font-bold text-ink/70" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>appletown-iizuna.com</span><br />
                                        でお読みいただけます
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
