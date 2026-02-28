"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { t, Lang } from "./translations";

const APPLE_SVG_PATH = "M287.04,32.3c.29.17,1.01.63,1.46,1.55.57,1.19.29,2.29.2,2.57-7.08,18.09-14.18,36.17-21.26,54.26,5.96-.91,14.77-2.45,25.28-5.06,17.98-4.45,22.46-7.44,33.44-9.85,18.59-4.08,33.88-1.67,44.51,0,21.1,3.32,37.42,10.74,47.91,16.6-4.08,8.59-11.1,20.05-23.06,29.99-18.47,15.35-38.46,18.54-52.07,20.7-7.55,1.21-21.61,3.32-39.12.24-13.71-2.41-11-4.76-30.72-9.36-6.73-1.56-12.82-2.64-17.98-7.87-3.73-3.77-4.92-7.63-6.74-7.3-2.44.43-1.84,7.58-4.5,16.85-.98,3.46-5.56,19.45-14.05,21.35-5.5,1.23-9.85-4.07-17.02-9.79-17.52-13.96-36.26-17.94-45.91-19.99-7.62-1.62-25.33-5.16-45.19,1.36-6.6,2.17-19.57,7.82-35.2,23.74-48.04,48.93-49.39,127.17-49.69,143.97-.08,5-.47,48.18,16.56,90.06,6.63,16.3,14.21,28.27,24.85,38.3,4.2,3.97,12.19,11.37,24.85,16.56,13.72,5.63,26.8,6.15,31.06,6.21,8.06.12,9.06-1.03,14.49,0,10.22,1.95,13.47,7.33,22.77,12.42,10.16,5.56,19.45,6.3,30.02,7.25,8.15.73,18.56,1.67,31.15-1.99,9.83-2.85,16.44-7.18,25.24-12.93,2.47-1.61,9.94-6.61,20.55-16.18,12.76-11.51,21.35-21.79,25.53-26.87,26.39-32.12,39.71-48.12,50.73-71.43,12.87-27.23,17.2-49.56,18.63-57.97,3.23-18.95,5.82-35.27,0-54.87-2.24-7.54-6.98-23.94-21.74-37.27-5.26-4.76-12.9-11.66-24.85-13.46-17.04-2.58-30.24,7.19-33.13,9.32-9.71,7.17-13.91,16.56-21.93,35.04-1.81,4.19-8.26,19.38-14.31,43.63-2.82,11.32-6.43,25.97-8.28,45.55-1.47,15.61-3.27,34.6,1.04,59.01,4.92,27.9,15.01,47.01,17.6,51.76,5.58,10.26,12.02,21.83,24.85,33.13,6.45,5.69,17.55,15.24,35.2,19.77,19.17,4.92,34.7.98,38.3,0,14.29-3.9,24.02-11.27,28.99-15.63";

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
    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const l = params.get('lang');
            if (l === 'en' || l === 'zh') return l;
        }
        return 'ja';
    });
    const [coverColor, setCoverColor] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const c = params.get('color');
            if (c && /^#[0-9A-Fa-f]{6}$/.test(c)) return c;
        }
        return '#E88C83';
    });
    const [randomApples, setRandomApples] = useState<string[]>([]);
    const [exporting, setExporting] = useState(false);
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);

    const exportPDF = useCallback(async () => {
        setExporting(true);
        try {
            const response = await fetch(`/api/export-pdf?color=${encodeURIComponent(coverColor)}&lang=${lang}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.details || 'Export failed');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'iizuna-apple-pamphlet.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF export failed:', err);
            alert(t('ui.exportFailed', lang) + '\n' + String(err));
        } finally {
            setExporting(false);
        }
    }, [coverColor, lang]);

    const getBaseColor = (color: string) => {
        if (color === '#FFFFFF') return '#F5F5F5';
        // Generate a very light tint from the cover color (5% color, 95% white)
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const lr = Math.round(r + (255 - r) * 0.93);
        const lg = Math.round(g + (255 - g) * 0.93);
        const lb = Math.round(b + (255 - b) * 0.93);
        return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
    };

    // Darken a hex color by a factor (0-1, lower = darker)
    const getDarkerColor = (hex: string, factor = 0.65) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `#${Math.round(r * factor).toString(16).padStart(2, '0')}${Math.round(g * factor).toString(16).padStart(2, '0')}${Math.round(b * factor).toString(16).padStart(2, '0')}`;
    };

    const getLighterColor = (hex: string, factor = 0.85) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const lr = Math.round(r + (255 - r) * factor);
        const lg = Math.round(g + (255 - g) * factor);
        const lb = Math.round(b + (255 - b) * factor);
        return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
    };

    useEffect(() => {
        // Need about 30 apples for a 6x5 grid (30 items total limit)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setRandomApples(shuffleArray(APPLE_IMAGES).slice(0, 30));
    }, []);

    return (
        <div className="flex-1 overflow-auto relative flex flex-col items-center font-tsukushi font-bold">
            <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center items-center pointer-events-none print:hidden">
                <div className="max-w-[840px] w-full flex justify-end items-center gap-4 pointer-events-none">
                    {/* Cover Color Toggle */}
                    <div className="flex items-center gap-1.5 bg-washi rounded-full shadow-sm border border-ink/10 px-3 py-1 pointer-events-auto flex-wrap">
                        <span className="text-xs font-sans text-ink/60 mr-1">Cover:</span>
                        {[
                            { color: '#E88C83', label: 'Apple Pink' },
                            { color: '#C2857A', label: 'Terracotta' },
                            { color: '#D4A574', label: 'Caramel' },
                            { color: '#C6AD6E', label: 'Harvest Gold' },
                            { color: '#A8B06A', label: 'Matcha' },
                            { color: '#8B9E6B', label: 'Sage' },
                            { color: '#FFFFFF', label: 'White' },
                        ].map(({ color, label }) => (
                            <button key={color} onClick={() => setCoverColor(color)} className={`w-4 h-4 rounded-full border ${coverColor === color ? 'border-ink border-2' : 'border-ink/20'}`} style={{ backgroundColor: color }} title={label}></button>
                        ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-1 bg-washi rounded-full shadow-sm border border-ink/10 px-3 py-1 pointer-events-auto">
                        <span className="text-xs font-sans text-ink/60 mr-1">Lang:</span>
                        {(['ja', 'en', 'zh'] as Lang[]).map((l) => (
                            <button key={l} onClick={() => setLang(l)} className={`px-1.5 py-0.5 text-xs font-sans rounded ${lang === l ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'}`}>
                                {l === 'ja' ? '日本語' : l === 'en' ? 'EN' : '中文'}
                            </button>
                        ))}
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
                    <button
                        onClick={exportPDF}
                        disabled={exporting}
                        data-export-hide
                        className="flex items-center gap-2 rounded-full shadow-sm border bg-[#D45D56] text-white border-[#D45D56] px-4 py-1.5 pointer-events-auto text-xs font-sans hover:bg-[#c04d46] transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        <Download size={14} />
                        {exporting ? t('ui.exporting', lang) : t('ui.export', lang)}
                    </button>
                </div>
            </div>

            <div className="pt-[56px]">

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
                            ref={frontRef}
                            data-panel="front"
                            className="w-[840px] h-[594px] shadow-2xl relative overflow-hidden flex print:border-none print:shadow-none transition-colors duration-300"
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
                            <div className={`w-[280px] h-full relative z-10 flex flex-col justify-center py-[20px] ${lang === 'ja' ? 'px-[28px]' : 'px-[24px]'} text-ink print:border-none`}>

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

                                {/* 1. Title */}
                                <div className="w-full flex flex-col justify-start mb-2 mt-1 relative z-10">
                                    <h3 className="text-[15px] tracking-[0.18em] leading-[1.4] text-ink/85 whitespace-nowrap" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 700 }}>
                                        {t('insideFlap.heading', lang)}
                                    </h3>
                                    <div className="w-[60px] h-[2px] mt-2 transition-colors duration-300" style={{ backgroundColor: coverColor === '#FFFFFF' ? '#E88C83' : coverColor }}></div>
                                </div>

                                {/* 2. Tagline — short, punchy */}
                                <p className="text-[9.5px] font-serif tracking-[0.08em] text-ink/75 leading-[1.9] mb-3">
                                    {t('insideFlap.tagline', lang).split('\n').map((line, i, arr) => (
                                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                                    ))}
                                </p>

                                {/* 3. Seasons Photography (Hero Block) */}
                                <div className="w-full aspect-[4/3] relative mb-2">
                                    {/* Elegant 4-season grid with crisp white inner hairlines */}
                                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[1.5px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-[0.5px] border-ink/10">
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

                                {/* 4. Data Numbers */}
                                <div className="w-full mt-1">
                                    <div className="flex justify-between items-end mb-2 px-0.5">
                                        {[
                                            { num: t('data.population.num', lang), unit: t('data.population.unit', lang), label: t('data.population.label', lang) },
                                            { num: t('data.area.num', lang), unit: t('data.area.unit', lang), label: t('data.area.label', lang) },
                                            { num: t('data.elevation.num', lang), unit: t('data.elevation.unit', lang), label: t('data.elevation.label', lang) },
                                            { num: t('data.temp.num', lang), unit: t('data.temp.unit', lang), label: t('data.temp.label', lang) },
                                        ].map((d, i) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <span className="text-[11px] font-bold tracking-tight leading-none" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                                    {d.num}<span className="text-[8px] font-normal ml-[1px]">{d.unit}</span>
                                                </span>
                                                <span className="text-[8px] text-ink/40 tracking-[0.1em] mt-[2px] font-sans">{d.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 5. Access compact bar */}
                                    <div className="w-full bg-white/50 rounded-sm px-2.5 py-1.5 mb-2 flex items-center justify-center gap-3">
                                        <span className="text-[8px] text-ink/60 font-serif flex items-center gap-1">
                                            <svg className="w-[10px] h-[10px] text-ink/40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 3.5 4 7v9.5C4 17.88 5.12 19 6.5 19L5 20.5v.5h2l2-2h6l2 2h2v-.5L17.5 19c1.38 0 2.5-1.12 2.5-2.5V7c0-3.5-4-5-8-5zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V7h5v3zm2 0V7h5v3h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>
                                            {t('access.tokyo.prefix', lang)}<span className="font-bold text-ink/80">{t('access.tokyo.value', lang)}</span>
                                        </span>
                                        <span className="text-ink/20">|</span>
                                        <span className="text-[8px] text-ink/60 font-serif flex items-center gap-1">
                                            <svg className="w-[10px] h-[10px] text-ink/40" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" /></svg>
                                            {t('access.nagano.prefix', lang)}<span className="font-bold text-ink/80">{t('access.nagano.value', lang)}</span>
                                        </span>
                                    </div>

                                    {/* 6. Category highlights — 2×2 grid */}
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                                        {[
                                            { color: 'bg-leaf', titleKey: 'cat.agriculture.title' as const, l1Key: 'cat.agriculture.line1' as const, l2Key: 'cat.agriculture.line2' as const },
                                            { color: 'bg-[#5B9BD5]', titleKey: 'cat.nature.title' as const, l1Key: 'cat.nature.line1' as const, l2Key: 'cat.nature.line2' as const },
                                            { color: 'bg-[#E8C340]', titleKey: 'cat.migration.title' as const, l1Key: 'cat.migration.line1' as const, l2Key: 'cat.migration.line2' as const },
                                            { color: 'bg-[#C4956A]', titleKey: 'cat.school.title' as const, l1Key: 'cat.school.line1' as const, l2Key: 'cat.school.line2' as const },
                                        ].map((cat, i) => (
                                            <div key={i} className="flex items-start gap-1.5">
                                                <div className={`w-[4px] h-[4px] rounded-full ${cat.color} mt-[3px] flex-shrink-0`}></div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-ink/80 leading-none mb-[2px]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t(cat.titleKey, lang)}</p>
                                                    <p className="text-[8px] font-serif text-ink/50 leading-[1.5]">{t(cat.l1Key, lang)}<br />{t(cat.l2Key, lang)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* --- 中面：裏表紙 (Back Cover) --- */}
                            <div className="w-[280px] relative z-10 flex flex-col items-center justify-between p-6 pt-[60px] pb-[24px] text-center text-ink print:border-none">

                                {/* Top: Compelling headline */}
                                <div className="space-y-3 mb-6">
                                    <p className="text-[11px] tracking-[0.2em] leading-[2] font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('backCover.headline', lang).split('\n').map((line, i, arr) => (
                                            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                                        ))}
                                    </p>
                                    <p className="text-[9px] tracking-[0.12em] leading-[1.8] text-ink/60 font-serif">
                                        {t('backCover.subtext', lang).split('\n').map((line, i, arr) => (
                                            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                                        ))}
                                    </p>
                                </div>

                                {/* Center: QR Code */}
                                <div className="flex flex-col items-center gap-3 mb-6">
                                    <div className="bg-white p-3.5 shadow-sm rounded-sm relative">
                                        <QRCodeSVG
                                            value="https://appletown-iizuna.com/?flyer"
                                            size={110}
                                            level="H"
                                            includeMargin={false}
                                            fgColor={getDarkerColor(coverColor === '#FFFFFF' ? '#E88C83' : coverColor, 0.7)}
                                        />
                                        {/* Apple SVG overlay in QR center — white outline knocks out QR, colored stroke on top */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <svg width="34" height="42" viewBox="-100 -105 660 760" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d={APPLE_SVG_PATH} stroke="white" strokeWidth="220" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d={APPLE_SVG_PATH} stroke={getDarkerColor(coverColor === '#FFFFFF' ? '#E88C83' : coverColor, 0.7)} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-[12px] font-sans tracking-[0.15em] text-ink/80 font-medium">
                                        appletown-iizuna.com
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="w-full max-w-[200px] mx-auto space-y-1.5 mb-6">
                                    <div className="flex items-center gap-2 bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <svg className="w-[12px] h-[12px] text-ink/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" /></svg>
                                        <p className="text-[8px] text-ink/70 font-serif text-left">{t('backCover.feat.multilang', lang)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <svg className="w-[12px] h-[12px] text-ink/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                        <p className="text-[8px] text-ink/70 font-serif text-left">{t('backCover.feat.stories', lang)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/50 rounded-sm px-2.5 py-1.5">
                                        <svg className="w-[12px] h-[12px] text-ink/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                                        <p className="text-[8px] text-ink/70 font-serif text-left">{t('backCover.feat.search', lang)}</p>
                                    </div>
                                </div>

                                {/* Footer: 発行元情報 */}
                                <div className="w-full pt-3 border-t border-ink/10">
                                    <p className="text-[8px] text-ink/40 font-sans leading-[1.8] tracking-[0.05em]">
                                        {t('backCover.issuer', lang).split('\n').map((line, i, arr) => (
                                            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                                        ))}
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

                                <h1 className={`absolute bottom-[44px] left-1/2 -translate-x-1/2 text-[15px] tracking-[0.2em] z-30 whitespace-nowrap transition-colors duration-300`} style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 900, color: coverColor === '#FFFFFF' ? '#E88C83' : getLighterColor(coverColor, 0.85) }}>
                                    {t('cover.title', lang)}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* =========================================================
            【裏面】 Inner Spread (Left / Center / Right)
           ========================================================= */}
                    <div className="flex flex-col gap-3 print:gap-0 mt-8">
                        <h2 className="text-ink/60 font-medium text-sm px-2 flex items-center gap-2 tracking-widest font-sans print:hidden">
                            {t('ui.backSideLabel', lang)}
                        </h2>
                        <div ref={backRef} data-panel="back" className="w-[840px] h-[594px] shadow-2xl relative flex print:shadow-none bg-[#FBF5DC]">
                            <div className="absolute inset-0 texture-washi pointer-events-none z-0" />




                            {/* 北信五岳 mountain silhouette background — with drop shadow */}
                            <svg className="absolute left-0 w-full pointer-events-none z-[1]" viewBox="0 431 3580 680" preserveAspectRatio="none" style={{ top: '300px', height: '294px' }}>
                                <path d="
                                M0,505.5
                                L7.5,505.5 61.38,495.41 101.79,502.14 189.34,468.5 239.85,444.96 273.52,444.96 317.29,431.5 357.7,455.05 425.05,461.77 468.82,458.41 522.7,455.05 576.58,468.5 643.93,502.14 691.07,525.68 724.74,532.41 781.99,532.41 842.6,545.86 879.64,532.41 909.94,515.59 936.88,505.5 984.03,498.77 1044.64,522.32 1078.31,532.41 1095.15,542.5 1135.55,549.23 1186.06,552.59 1229.84,555.95 1307.29,549.23 1367.9,525.68 1384.74,515.59 1415.04,508.86 1431.88,508.86 1472.29,498.77 1546.37,508.86 1613.72,552.59 1684.43,579.5 1718.1,582.86 1771.98,586.23 1869.63,589.59 1930.24,576.14 2007.69,559.32 2044.73,539.14 2095.24,539.14 2108.71,542.5 2132.28,515.59 2169.32,515.59 2226.57,562.68 2290.55,572.77 2327.59,572.77 2347.79,576.14 2381.47,586.23 2398.3,569.41 2435.34,589.59 2485.85,606.41 2499.32,616.5 2519.53,603.05 2559.93,603.05 2603.71,616.5 2637.38,606.41 2697.99,603.05 2745.14,586.23 2785.55,586.23 2819.22,576.14 2866.36,579.5 2896.67,582.86 2940.44,572.77 2987.58,552.59 3044.83,552.59 3078.5,552.59 3091.97,542.5 3098.71,529.05 3135.75,529.05 3176.16,522.32 3250.24,539.14 3297.38,566.05 3347.89,576.14 3408.5,586.23 3459.01,586.23 3506.15,589.59 3573.5,586.23
                                L3580,586.23 L3580,1111 L0,1111 Z
                            " fill="#EEDBA8" fillOpacity="1" />
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
                            <div className="absolute top-[25px] left-[24px] z-20">
                                <h2 className="tracking-[0.15em] whitespace-nowrap" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 700 }}>
                                    <span className="text-[25px]" style={{ color: '#D45D56' }}>{t('back.mainTitle.apple', lang)}</span>{' '}<span className="text-[22px] text-ink/90 font-medium">{t('back.mainTitle.suffix', lang)}</span>
                                </h2>
                            </div>

                            {/* 高坂林檎 PNG — absolute in 裏面 container */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="absolute pointer-events-none z-20" style={{ left: '230px', top: '460px', transform: 'translate(-50%, -50%)' }}>
                                <img src="https://appletown-iizuna.s3.ap-northeast-1.amazonaws.com/apples/images/%E9%AB%98%E5%9D%82%E6%9E%97%E6%AA%8E.png" alt="高坂林檎" className="w-[110px] h-[110px] object-contain" />
                            </div>
                            <span className="absolute text-[6px] text-ink/40 tracking-[0.05em] pointer-events-none z-20" style={{ left: '230px', top: '435px', transform: 'translateX(-50%)', fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('back.monument', lang)}</span>
                            <span className="absolute text-[6px] text-ink/40 tracking-[0.05em] pointer-events-none z-20" style={{ left: '230px', top: '480px', transform: 'translateX(-50%)', fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('back.kosaka', lang)}</span>

                            {/* プチコラムエリア区切り線 — 3面通し y=510 */}
                            <div className="absolute z-20 border-t border-white/50" style={{ top: '510px', left: '20px', right: '20px' }}></div>

                            {/* --- 左面：知る (Full panel) --- */}
                            <div className="w-[280px] relative z-10 flex flex-col print:border-none text-ink/90 pt-[70px] px-[20px] pb-[12px]">

                                {/* 知る header */}
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-[3px] h-[16px] bg-[#E8C340] rounded-full"></div>
                                    <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('section.shiru', lang)}</span>
                                </div>
                                <p className="text-[8px] font-serif text-ink/55 leading-[1.8] mb-2 tracking-[0.04em]">
                                    {t('section.shiru.sub', lang)}
                                </p>

                                {/* Hero image */}
                                <div className="w-full h-[50px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/8ae3ad00-8d6a-013e-bcd3-0a58a9feac02/IMG_2898.jpg" alt="いいづなりんご" className="w-full h-full object-cover" />
                                </div>

                                <div className="bg-white/40 rounded-sm px-2.5 py-2 mb-2">
                                    <p className="text-[9px] font-bold tracking-[0.1em] mb-1.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('timeline.title', lang)}
                                    </p>
                                    <div className="flex flex-col">
                                        {[
                                            { year: '1860〜', key: 'timeline.1860' as const },
                                            { year: '1890〜', key: 'timeline.1890' as const },
                                            { year: '1929〜', key: 'timeline.1929' as const },
                                            { year: '1965〜', key: 'timeline.1965' as const },
                                            { year: '1968', key: 'timeline.1968' as const },
                                            { year: '1980〜', key: 'timeline.1980' as const },
                                            { year: '1987', key: 'timeline.1987' as const },
                                            { year: '1990〜', key: 'timeline.1990' as const },
                                            { year: '2005', key: 'timeline.2005a' as const },
                                            { year: '2005', key: 'timeline.2005b' as const },
                                            { year: '2020〜', key: 'timeline.2020' as const },
                                            { year: t('timeline.now.label', lang), key: 'timeline.now' as const },
                                        ].map((item, i, arr) => (
                                            <div key={i} className="flex items-start mb-[2px]">
                                                <div className="flex flex-col items-center flex-shrink-0 w-[8px] mt-[4px]">
                                                    <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${i === arr.length - 1 ? 'bg-[#D45D56]' : 'bg-[#E8C340]'}`}></div>
                                                    {i < arr.length - 1 && <div className="w-px h-[6px] bg-[#E8C340]/40"></div>}
                                                </div>
                                                <span className="text-[8px] text-ink/40 flex-shrink-0 w-[34px] leading-[1.4]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{item.year}</span>
                                                <p className="text-[8px] font-serif text-ink/70 leading-[1.4]">{t(item.key, lang)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Variety highlight — positioned at y=420 */}
                                <div className="absolute left-[20px] right-[20px] z-10" style={{ top: '420px' }}>
                                    <div className="bg-white/50 rounded-sm p-2.5 mb-2 relative overflow-visible">
                                        <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                            {t('variety.title', lang)}
                                        </p>
                                        <p className="text-[8px] font-serif text-ink/55 leading-[1.8] tracking-[0.03em]" style={{ maxWidth: '180px' }}>
                                            {t('variety.desc', lang)}
                                        </p>
                                        {/* 高坂林檎 PNG is rendered at 裏面 container level */}
                                    </div>
                                </div>
                            </div>

                            {/* Science box — positioned in プチコラム area at 裏面 container level */}
                            <div className="absolute left-[20px] z-20" style={{ top: '520px', width: '240px' }}>
                                <div className="border-l-2 border-leaf pl-2.5">
                                    <p className="text-[9px] font-bold tracking-[0.08em] mb-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('science.title', lang)}
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.7]">
                                        {t('science.desc', lang)}
                                    </p>
                                </div>
                            </div>

                            {/* 中面プチコラム — 日本一のりんごのまちを目指して */}
                            <div className="absolute z-20" style={{ top: '520px', left: '300px', width: '240px' }}>
                                <div className="border-l-2 border-[#D45D56] pl-2.5">
                                    <p className="text-[9px] font-bold tracking-[0.08em] mb-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('vision.title', lang)}
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.7]">
                                        {t('vision.desc', lang)}
                                    </p>
                                </div>
                            </div>

                            {/* 右面プチコラム — 移住地として人気 */}
                            <div className="absolute z-20" style={{ top: '520px', left: '580px', width: '240px' }}>
                                <div className="border-l-2 border-ink/25 pl-2.5">
                                    <p className="text-[9px] font-bold tracking-[0.08em] mb-0.5" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('migration.title', lang)}
                                    </p>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.7]">
                                        {t('migration.desc', lang)}
                                    </p>
                                </div>
                            </div>

                            {/* --- 中面：味わう＋体験する --- */}
                            <div className="w-[280px] relative z-10 flex flex-col print:border-none text-ink/90 pt-[70px] px-[20px] pb-[12px]">

                                {/* 味わう section */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-[3px] h-[16px] bg-[#D45D56] rounded-full"></div>
                                        <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('section.ajiwau', lang)}</span>
                                    </div>
                                    <p className="text-[8px] font-serif text-ink/55 leading-[1.8] mb-1.5 tracking-[0.04em]">
                                        {t('section.ajiwau.sub', lang)}
                                    </p>

                                    {/* Hero image */}
                                    <div className="w-full h-[50px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/6e2a2080-8d6a-013e-bcbf-0a58a9feac02/applejuice-8.jpg" alt="りんご" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Shops */}
                                    <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('shops.title', lang)}
                                    </p>
                                    <div className="space-y-1 mb-2">
                                        {[
                                            { name: t('shop.muchan.name', lang), desc: t('shop.muchan.desc', lang), type: 'shop' },
                                            { name: t('shop.sanchan.name', lang), desc: t('shop.sanchan.desc', lang), type: 'shop' },
                                            { name: t('shop.shikisai.name', lang), desc: t('shop.shikisai.desc', lang), type: 'shop' },
                                            { name: t('shop.farm.name', lang), desc: t('shop.farm.desc', lang), type: 'farm' },
                                            { name: t('shop.mitsudon.name', lang), desc: t('shop.mitsudon.desc', lang), type: 'ec' },
                                        ].map((shop, i) => (
                                            <div key={i} className="bg-white/50 rounded-sm px-2 py-1 flex items-center gap-1.5">
                                                {shop.type === 'shop' ? (
                                                    <svg className="w-[10px] h-[10px] flex-shrink-0 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 21V9l9-7 9 7v12H3z" /><rect x="9" y="13" width="6" height="8" />
                                                    </svg>
                                                ) : shop.type === 'farm' ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src="https://icon-pit.com/wp-content/uploads/2025/05/farmer_icon_29620.png" alt="農家" className="w-[14px] h-[14px] object-contain flex-shrink-0 opacity-60 -m-[2px]" />
                                                ) : (
                                                    <svg className="w-[10px] h-[10px] flex-shrink-0 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a1 1 0 001 .61h9.72a1 1 0 001-.76L23 6H6" />
                                                    </svg>
                                                )}
                                                <span className="text-[8px] font-bold tracking-[0.06em] flex-shrink-0" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{shop.name}</span>
                                                <span className="text-[8px] font-serif text-ink/45 flex-1">{shop.desc}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Events with photos */}
                                    <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                        {t('events.title', lang)}
                                    </p>
                                    <div className="grid grid-cols-3 gap-1">
                                        <div className="bg-white/50 rounded-sm overflow-hidden">
                                            <div className="w-full h-[45px] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/cd850820-8d6a-013e-c3bf-0a58a9feac02/%E3%83%95%E3%82%99%E3%83%A9%E3%83%A0%E3%83%AA%E3%83%BC_5.jpg" alt="英国りんごフェア" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="px-1 py-1">
                                                <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('event.ukfair.title', lang)}</p>
                                                <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">{t('event.ukfair.desc', lang)}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 rounded-sm overflow-hidden">
                                            <div className="w-full h-[45px] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/2772b080-f5f2-013e-83c3-0a58a9feac02/20230915_izumigaoka-14.jpg" alt="スイーツフェア" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="px-1 py-1">
                                                <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('event.sweets.title', lang)}</p>
                                                <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">{t('event.sweets.desc', lang)}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 rounded-sm overflow-hidden">
                                            <div className="w-full h-[45px] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="https://prcdn.freetls.fastly.net/release_image/76519/225/76519-225-6ea93e73c8a86d34e9806be5df3449a4-1240x827.png?width=1950&height=1350&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff" alt="スイーツコンクール" className="w-full h-full object-cover" style={{ transform: 'scale(1.15)' }} />
                                            </div>
                                            <div className="px-1 py-1">
                                                <p className="text-[7px] font-bold leading-[1.3]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('event.concours.title', lang)}</p>
                                                <p className="text-[7px] font-serif text-ink/45 leading-[1.3] mt-0.5">{t('event.concours.desc', lang)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* アップルミュージアム プチコラム — positioned at y=420 */}
                                <div className="absolute left-[20px] right-[20px] z-10" style={{ top: '420px' }}>
                                    <div className="bg-white/50 rounded-sm p-2.5 flex gap-2">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-bold tracking-[0.1em] mb-1" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                                                {t('museum.title', lang)}
                                            </p>
                                            <p className="text-[8px] font-serif text-ink/55 leading-[1.8] tracking-[0.03em]">
                                                {t('museum.desc', lang)}
                                            </p>
                                        </div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <div className="w-[55px] h-[60px] rounded-sm overflow-hidden flex-shrink-0 self-center">
                                            <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/bd27e610-8eef-013e-f63d-0a58a9feac02/____01.jpg" alt="アップルミュージアム" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- 右面：体験する＋暮らす＋営む --- */}
                            <div className="w-[280px] relative z-10 flex flex-col print:border-none text-ink/90 pt-[25px] px-[20px] pb-[12px]">

                                {/* 体験する section */}
                                <div className="mb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-[3px] h-[16px] bg-leaf rounded-full"></div>
                                        <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('section.taiken', lang)}</span>
                                        <span className="text-[8px] font-serif text-ink/55 tracking-[0.04em] ml-1">{t('section.taiken.sub', lang)}</span>
                                    </div>

                                    {/* Hero image */}
                                    <div className="w-full h-[35px] rounded-sm overflow-hidden mb-2 border border-[#D5CD97]/30">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/f2837410-8f03-013e-e63d-0a58a9feac02/photo-intermediate.jpg" alt="体験" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="bg-white/50 rounded-sm px-2 py-[5px] flex items-center gap-2">
                                            <div
                                                className="w-[20px] h-[20px] flex-shrink-0"
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
                                                    opacity: 0.5,
                                                }}
                                            />
                                            <div>
                                                <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('exp.farming.title', lang)}</p>
                                                <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">{t('exp.farming.desc', lang)}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 rounded-sm px-2 py-[5px] flex items-center gap-2">
                                            <svg className="w-[20px] h-[20px] flex-shrink-0" viewBox="0 0 24 24" fill="none" opacity="0.7">
                                                {/* Trunk with Y-branch */}
                                                <path d="M12 23V15M12 15L9.5 12M12 15L14.5 12" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                {/* Bushy canopy - overlapping circles for モサモサ */}
                                                <circle cx="8" cy="9" r="5" fill="#7B9B4B" />
                                                <circle cx="16" cy="9" r="5" fill="#7B9B4B" />
                                                <circle cx="12" cy="6" r="5.5" fill="#7B9B4B" />
                                                <circle cx="6" cy="12" r="3.5" fill="#7B9B4B" />
                                                <circle cx="18" cy="12" r="3.5" fill="#7B9B4B" />
                                                {/* Red apples */}
                                                <circle cx="8" cy="8" r="1.3" fill="#D45D56" />
                                                <circle cx="15" cy="7" r="1.3" fill="#D45D56" />
                                                <circle cx="11" cy="11" r="1.3" fill="#D45D56" />
                                                <circle cx="17" cy="11" r="1.3" fill="#D45D56" />
                                            </svg>
                                            <div>
                                                <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('exp.owner.title', lang)}</p>
                                                <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">{t('exp.owner.desc', lang)}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 rounded-sm px-2 py-[5px] flex items-center gap-2">
                                            <svg className="w-[20px] h-[20px] flex-shrink-0" viewBox="0 0 512 512" fill="#5B7B9B" opacity="0.6">
                                                <path d="M362.625,190.484V56.172H149.344v134.313L0,190.797v265.031h210.969v-96.375h90.047v96.375H512V190.797L362.625,190.484z M105.188,404.484h-39.75V360.75h39.75V404.484z M105.188,292.563h-39.75v-43.75h39.75V292.563z M275.875,292.563h-39.766v-43.75h39.766V292.563z M256,180.719c-27.313,0-49.531-22.234-49.531-49.547c0-27.297,22.219-49.516,49.531-49.516s49.531,22.219,49.531,49.516C305.531,158.484,283.313,180.719,256,180.719z M446.563,404.484h-39.781V360.75h39.781V404.484z M446.563,292.563h-39.781v-43.75h39.781V292.563z" />
                                                <path d="M256,92.969c-21.078,0-38.219,17.141-38.219,38.203c0,21.078,17.141,38.219,38.219,38.219c21.063,0,38.219-17.141,38.219-38.219C294.219,110.109,277.063,92.969,256,92.969z M263.594,133.625c0,2.734-1.781,5.016-4.188,5.891c-1.031,0.672-2.281,1.094-3.625,1.094h-19.594c-3.641,0-6.594-2.953-6.594-6.578c0-3.641,2.953-6.594,6.594-6.594h14.844v-20.797c0-3.453,2.813-6.266,6.281-6.266s6.281,2.813,6.281,6.266V133.625z" />
                                            </svg>
                                            <div>
                                                <p className="text-[8px] font-bold tracking-[0.08em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('exp.school.title', lang)}</p>
                                                <p className="text-[8px] font-serif text-ink/55 leading-[1.6] mt-0.5">{t('exp.school.desc', lang)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 滞在支援情報 - text only */}
                                    <div className="text-[8px] font-serif text-ink/65 leading-[1.7] mt-1.5 space-y-0.5">
                                        <p className="flex items-start gap-1"><svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg><span><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('stay.dining.label', lang)}</span> —— {t('stay.dining.desc', lang)}</span></p>
                                        <p className="flex items-start gap-1"><svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg><span><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('stay.transport.label', lang)}</span> —— {t('stay.transport.desc', lang)}</span></p>
                                        <p className="flex items-start gap-1"><svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg><span><span className="font-bold" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('stay.lodging.label', lang)}</span> —— {t('stay.lodging.desc', lang)}</span></p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full border-t border-white/40 mb-2"></div>

                                {/* 暮らす section */}
                                <div className="mb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-[3px] h-[16px] bg-ink/25 rounded-full"></div>
                                        <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('section.kurasu', lang)}</span>
                                        <span className="text-[8px] font-serif text-ink/55 tracking-[0.04em] ml-1">{t('section.kurasu.sub', lang)}</span>
                                    </div>
                                    {/* Hero image */}
                                    <div className="w-full h-[35px] rounded-sm overflow-hidden mb-1.5 border border-[#D5CD97]/30">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://cdn.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/a681db10-8ee6-013e-065b-0a58a9feac02/slide-01.jpg" alt="飯綱町の暮らし" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[8px] font-serif text-ink/65 leading-[1.7] flex items-start gap-1">
                                            <svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg>
                                            <span><span className="font-bold">{t('live.relocation.label', lang)}</span> —— {t('live.relocation.desc', lang)}</span>
                                        </p>
                                        <p className="text-[8px] font-serif text-ink/65 leading-[1.7] flex items-start gap-1">
                                            <svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg>
                                            <span><span className="font-bold">{t('live.work.label', lang)}</span> —— {t('live.work.desc', lang)}</span>
                                        </p>
                                        <p className="text-[8px] font-serif text-ink/65 leading-[1.7] flex items-start gap-1">
                                            <svg className="w-[7px] h-[7px] flex-shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="#7B9B4B" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" /></svg>
                                            <span><span className="font-bold">{t('live.farming.label', lang)}</span> —— {t('live.farming.desc', lang)}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full border-t border-white/40 mb-2"></div>

                                {/* 営む section */}
                                <div className="mb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-[3px] h-[16px] bg-[#C4956A] rounded-full"></div>
                                        <span className="text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>{t('section.itonamu', lang)}</span>
                                        <span className="text-[8px] font-serif text-ink/55 tracking-[0.04em] ml-1">{t('section.itonamu.sub', lang)}</span>
                                    </div>
                                    {/* Hero image */}
                                    <div className="w-full h-[35px] rounded-sm overflow-hidden mb-1.5 border border-[#D5CD97]/30">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://s3-ap-northeast-1.amazonaws.com/s3.peraichi.com/userData/cadd36d5-015f-4440-aa3c-b426c32c22a0/img/b41733e0-8d6a-013e-bcf2-0a58a9feac02/sunfuji_kodama_1207-25.jpg" alt="果樹園" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[8px] font-serif text-ink/60 leading-[1.7]">
                                            {t('work.line1', lang)}
                                        </p>
                                        <p className="text-[8px] font-serif text-ink/60 leading-[1.7]">
                                            {t('work.line2', lang)}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
}
