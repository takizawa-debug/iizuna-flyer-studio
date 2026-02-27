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

                        {/* --- 中面：裏表紙 (Back Cover) --- */}
                        <div className="w-[280px] border-r border-ink/15 border-dashed relative z-10 flex flex-col items-center justify-center p-8 text-center text-ink print:border-none pt-24">
                            <div className="mb-14 space-y-4 font-bold tracking-wider leading-relaxed text-[15px]">
                                <p>「いいづなりんご」とは？</p>
                                <p>生産者の想いや<br />お店のこだわり</p>
                                <p>飯綱町での滞在や<br />暮らしの情報まで</p>
                                <p>「りんごのまち」が<br />広く&#x201C;みわたせる&#x201D;<br />プラットフォームです</p>
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
                        <div className="absolute inset-0 texture-washi pointer-events-none z-0" />

                        {/* 北信五岳 mountain silhouette background */}
                        <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-[1]" viewBox="0 0 840 175" preserveAspectRatio="none" style={{ height: '175px' }}>
                            <path d="
                                M0,175 L0,120
                                C20,115 35,100 50,85
                                C60,75 70,55 85,40
                                C95,30 100,28 105,35
                                C115,50 120,60 130,70
                                C140,60 150,50 160,42
                                C170,35 175,30 180,38
                                C190,50 200,65 215,75
                                C225,70 235,62 250,55
                                C260,48 270,40 280,35
                                C290,30 295,32 305,40
                                C315,50 325,58 340,60
                                C350,55 360,48 375,42
                                C385,36 395,30 405,25
                                C415,20 420,18 430,22
                                C440,28 450,38 460,45
                                C470,50 480,55 495,58
                                C505,55 515,48 530,40
                                C540,35 550,30 560,28
                                C570,26 575,28 580,32
                                C590,40 600,50 615,55
                                C625,52 635,48 650,42
                                C660,38 670,35 680,38
                                C690,42 700,50 715,55
                                C725,52 735,48 745,45
                                C755,42 765,40 775,35
                                C785,30 790,28 800,32
                                C810,38 820,45 830,50
                                L840,55 L840,175 Z
                            " fill="#D9C96E" fillOpacity="0.7" />
                        </svg>

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
                                {/* X-axis labels */}
                                {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800].map(x => (
                                    <div key={`bx-${x}`} className="absolute top-0 text-[9px] font-sans text-white bg-black/50 px-0.5" style={{ left: `${x}px` }}>{x}</div>
                                ))}
                                {/* Y-axis labels */}
                                {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map(y => (
                                    <div key={`by-${y}`} className="absolute left-0 text-[9px] font-sans text-white bg-black/50 px-0.5" style={{ top: `${y}px` }}>{y}</div>
                                ))}
                            </div>
                        )}


                        {/* Title across left panel only */}
                        <div className="absolute top-[16px] left-[24px] z-20">
                            <h2 className="text-[18px] tracking-[0.15em] text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}>
                                いいづなりんごからはじまる物語
                            </h2>
                            <div className="w-[50px] h-[2px] bg-[#E8C340] mt-1"></div>
                        </div>

                        {/* --- 左面：知る (Full panel) --- */}
                        <div className="w-[280px] border-r border-[#D5CD97]/50 border-dashed relative z-10 flex flex-col print:border-none text-ink/90 pt-[70px] px-[20px] pb-[12px]">

                            {/* 知る header */}
                            <div className="flex items-baseline gap-2 mb-1">
                                <div className="w-[3px] h-[16px] bg-[#E8C340] rounded-full"></div>
                                <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>知る</span>
                            </div>
                            <p className="text-[8px] font-serif text-ink/55 leading-[1.8] mb-2 tracking-[0.04em]">
                                町の歴史・品種図鑑・栽培の科学
                            </p>

                            {/* Hero image */}
                            <div className="w-full h-[50px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/8ae3ad00-8d6a-013e-bcd3-0a58a9feac02/IMG_2898.jpg" alt="いいづなりんご" className="w-full h-full object-cover" />
                            </div>

                            <div className="bg-white/40 rounded-sm px-2.5 py-2 mb-2">
                                <p className="text-[9px] font-bold tracking-[0.1em] mb-1.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    りんご栽培のあゆみ
                                </p>
                                <div className="flex flex-col">
                                    {[
                                        { year: '1860〜', text: <><span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>高坂林檎</span>が善光寺門前で信濃名物として人気</> },
                                        { year: '1890〜', text: <>本格的なりんご栽培の始まり、徐々に拡大</> },
                                        { year: '1929〜', text: <>世界恐慌で蚕糸業衰退、桑畑→りんご畑へ</> },
                                        { year: '1965〜', text: <><span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>うまいくだものづくり運動</span>で主力が<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>ふじ</span>に</> },
                                        { year: '1968', text: <>旧三水村で9,560t産出、<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>日本一のりんご村</span>に</> },
                                        { year: '1980〜', text: <>絶滅寸前の<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>高坂林檎</span>を有志が保存</> },
                                        { year: '1987', text: <>ニュートン品種<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>フラワー・オブ・ケント</span>植樹</> },
                                        { year: '1990〜', text: <>英国王立園芸協会から<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>ブラムリー</span>等16品種渡来</> },
                                        { year: '2005', text: <><span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>高坂林檎</span>原木2本が天然記念物に指定</> },
                                        { year: '2005', text: <>旧牟礼村と旧三水村が合併し<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>飯綱町</span>誕生</> },
                                        { year: '2020〜', text: <><span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>高坂林檎</span>にふじの約10倍の機能性成分を確認</> },
                                        { year: '現在', text: <>50品種以上を栽培、<span className="font-extrabold text-ink/90" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>日本一のりんごのまち</span>へ</> },
                                    ].map((item, i, arr) => (
                                        <div key={i} className="flex items-start mb-[2px]">
                                            <div className="flex flex-col items-center flex-shrink-0 w-[8px] mt-[4px]">
                                                <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${i === arr.length - 1 ? 'bg-[#D45D56]' : 'bg-[#E8C340]'}`}></div>
                                                {i < arr.length - 1 && <div className="w-px h-[6px] bg-[#E8C340]/40"></div>}
                                            </div>
                                            <span className="text-[8px] text-ink/40 flex-shrink-0 w-[34px] leading-[1.4]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{item.year}</span>
                                            <p className="text-[8px] font-serif text-ink/70 leading-[1.4]">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Variety highlight — positioned at y=420 */}
                            <div className="absolute left-[20px] right-[20px] z-10" style={{ top: '420px' }}>
                                <div className="bg-white/50 rounded-sm p-2.5 mb-2">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                                50品種を超えるりんごの宝庫
                                            </p>
                                            <p className="text-[8px] font-serif text-ink/55 leading-[1.8] tracking-[0.03em]">
                                                ふじ、つがる、王林の定番から、シナノスイート、<br />
                                                シナノゴールド、秋映。英国品種ブラムリー。<br />
                                                幻の和りんご「高坂りんご」まで。
                                            </p>
                                        </div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%AB%98%E5%9D%82%E6%9E%97%E6%AA%8E.png" alt="高坂林檎" className="w-[50px] h-[50px] object-contain flex-shrink-0" />
                                    </div>
                                </div>

                                {/* Science box */}
                                <div className="border-l-2 border-[#E8C340] pl-2.5">
                                    <p className="text-[9px] font-bold tracking-[0.08em] mb-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        科学が証明する、飯綱の美味しさ
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.7]">
                                        昼夜の寒暖差が糖度を凝縮。糖酸比30〜40——<br />
                                        科学的に「美味しい」数値域。シャキシャキの<br />
                                        食感は、破断強度で実証済み。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* --- 中面：味わう＋体験する --- */}
                        <div className="w-[280px] border-r border-[#D5CD97]/50 border-dashed relative z-10 flex flex-col print:border-none text-ink/90 pt-[70px] px-[20px] pb-[12px]">

                            {/* 味わう section */}
                            <div className="mb-3">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <div className="w-[3px] h-[16px] bg-[#D45D56] rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>味わう</span>
                                </div>
                                <p className="text-[8px] font-serif text-ink/55 leading-[1.8] mb-1.5 tracking-[0.04em]">
                                    直売所・生産者・加工品・イベント
                                </p>

                                {/* Hero image */}
                                <div className="w-full h-[50px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/6e2a2080-8d6a-013e-bcbf-0a58a9feac02/applejuice-8.jpg" alt="りんご" className="w-full h-full object-cover" />
                                </div>

                                {/* Shops */}
                                <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    りんごが買えるお店
                                </p>
                                <div className="space-y-1 mb-2">
                                    {[
                                        { name: 'むーちゃん', desc: 'カフェ併設、農業体験の相談窓口', type: 'shop' },
                                        { name: 'さんちゃん', desc: '手作りジャム、アップルパイが人気', type: 'shop' },
                                        { name: '四季彩', desc: '雪むろ熟成りんご、収穫体験も', type: 'shop' },
                                        { name: 'みつどんマルシェ', desc: 'EC全国配送。30品種食べ比べ', type: 'ec' },
                                    ].map((shop, i) => (
                                        <div key={i} className="bg-white/50 rounded-sm px-2 py-1 flex items-center gap-1.5">
                                            <span className="text-[8px] font-bold tracking-[0.06em] flex-shrink-0" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{shop.name}</span>
                                            <span className="text-[8px] font-serif text-ink/45 flex-1">{shop.desc}</span>
                                            {shop.type === 'shop' ? (
                                                <svg className="w-[10px] h-[10px] flex-shrink-0 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 21V9l9-7 9 7v12H3z" /><rect x="9" y="13" width="6" height="8" />
                                                </svg>
                                            ) : (
                                                <svg className="w-[10px] h-[10px] flex-shrink-0 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a1 1 0 001 .61h9.72a1 1 0 001-.76L23 6H6" />
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Events with photos */}
                                <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                    季節のイベント
                                </p>
                                <div className="grid grid-cols-3 gap-1">
                                    <div className="bg-white/50 rounded-sm overflow-hidden">
                                        <div className="w-full h-[45px] overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/cd850820-8d6a-013e-c3bf-0a58a9feac02/%E3%83%95%E3%82%99%E3%83%A9%E3%83%A0%E3%83%AA%E3%83%BC_5.jpg" alt="英国りんごフェア" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="px-1 py-1">
                                            <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>英国りんごフェア</p>
                                            <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">料理用りんごの魅力を発信</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/50 rounded-sm overflow-hidden">
                                        <div className="w-full h-[45px] bg-[#D45D56]/10 flex items-center justify-center">
                                            <span className="text-[7px] text-[#D45D56]/40" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>PHOTO</span>
                                        </div>
                                        <div className="px-1 py-1">
                                            <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>スイーツフェア</p>
                                            <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">町のスイーツを食べ歩き</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/50 rounded-sm overflow-hidden">
                                        <div className="w-full h-[45px] bg-[#D45D56]/10 flex items-center justify-center">
                                            <span className="text-[7px] text-[#D45D56]/40" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>PHOTO</span>
                                        </div>
                                        <div className="px-1 py-1">
                                            <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>スイーツコンクール</p>
                                            <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">パティシエが腕を競う</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-[#D5CD97]/40 mb-2"></div>

                            {/* アップルミュージアム プチコラム — positioned at y=420 */}
                            <div className="absolute left-[20px] right-[20px] z-10" style={{ top: '420px' }}>
                                <div className="bg-white/50 rounded-sm p-2.5">
                                    <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        アップルミュージアム
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.8] tracking-[0.03em]">
                                        ニュートンのりんごの木から初代Macまで。<br />
                                        全国でも珍しいりんご専門の博物館。<br />
                                        りんごの歴史と文化を一度に体験。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* --- 右面：体験する＋暮らす＋営む --- */}
                        <div className="w-[280px] relative z-10 flex flex-col print:border-none text-ink/90 pt-[30px] px-[20px] pb-[12px]">

                            {/* 体験する section */}
                            <div className="mb-2">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <div className="w-[3px] h-[16px] bg-leaf rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>体験する</span>
                                </div>

                                {/* Hero image */}
                                <div className="w-full h-[30px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/f2837410-8f03-013e-e63d-0a58a9feac02/photo-intermediate.jpg" alt="体験" className="w-full h-full object-cover" />
                                </div>

                                <div className="space-y-1">
                                    <div className="bg-white/50 rounded-sm p-2">
                                        <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>農業体験・ワーキングホリデー</p>
                                        <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">
                                            3泊4日、農家に入り込む実践型。就農の入口。
                                        </p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm p-2">
                                        <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>りんごの木オーナー制度</p>
                                        <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">
                                            1本の木を契約し、秋に自分だけの収穫を。
                                        </p>
                                    </div>
                                    <div className="bg-white/50 rounded-sm p-2">
                                        <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>信州いいづなりんご学校</p>
                                        <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">
                                            日帰り〜上級まで段階的に学べる体験型。
                                        </p>
                                    </div>
                                </div>

                                {/* 滞在支援情報 - text only */}
                                <div className="text-[8px] font-serif text-ink/50 leading-[1.7] mt-1.5 space-y-0">
                                    <p><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>食事</span> —— りんご／郷土料理・そば・カフェ・レストラン</p>
                                    <p><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>移動</span> —— バス／タクシー・レンタカー・レンタル自転車</p>
                                    <p><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>宿泊</span> —— ホテル・民泊／一棟貸し・キャンプ／グランピング</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-[#D5CD97]/40 mb-2"></div>

                            {/* 暮らす section */}
                            <div className="mb-2">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <div className="w-[3px] h-[16px] bg-ink/25 rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>暮らす</span>
                                </div>
                                {/* Hero image */}
                                <div className="w-full h-[30px] rounded-sm overflow-hidden mb-1.5 border border-[#D5CD97]/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/a681db10-8ee6-013e-065b-0a58a9feac02/slide-01.jpg" alt="飯綱町の暮らし" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-serif text-ink/65 leading-[1.7]">
                                        <span className="font-bold">移住体験住宅</span>——古民家に最長6泊7日のお試し滞在
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/65 leading-[1.7]">
                                        <span className="font-bold">就農里親制度</span>——約3年で独立。里親農家が伴走
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/65 leading-[1.7]">
                                        <span className="font-bold">いいコネワークス</span>——複業で収入と暮らしの安定
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-[#D5CD97]/40 mb-2"></div>

                            {/* 営む section */}
                            <div className="mb-2">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <div className="w-[3px] h-[16px] bg-[#C4956A] rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>営む</span>
                                </div>
                                {/* Hero image */}
                                <div className="w-full h-[30px] rounded-sm overflow-hidden mb-1.5 border border-[#D5CD97]/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/b41733e0-8d6a-013e-bcf2-0a58a9feac02/sunfuji_kodama_1207-25.jpg" alt="果樹園" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-serif text-ink/60 leading-[1.7]">
                                        <span className="font-bold">JAりんご部会講習会</span> / 苗木導入補助 / 大型機械整備
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/60 leading-[1.7]">
                                        <span className="font-bold">共同利用機械</span>補助 / 三本松加工所 / JAフルーツセンター
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
