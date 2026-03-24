import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
});

const zenMaru = Zen_Maru_Gothic({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
  display: "swap",
  preload: false,
});


export const metadata: Metadata = {
  title: "Iizuna Apple Flyer Studio",
  description: "A tool to create flyers with the warmth of Iizuna Town.",
};

// All unique Chinese characters used in translations — forces Google Fonts CDN
// to download every required unicode-range subset for Noto Sans TC.
// This ensures Chrome's print-to-PDF embeds all necessary glyphs.
const ZH_PRELOAD_TEXT = "蘋果之町飯綱歡迎來到約萬人口面積海拔年均溫從東京小時長野市分鐘農業是花稻米蕎麥栽培也興盛自然飯繩山靈仙寺湖度假滑雪場移居近人持續增長育兒支援充實廢校再生以連接為據點創造嶄新的交流空間品種特色生產者堅外停留與活一切資訊更多精彩文章最新歡迎至官方網站瀏覽語言日本英繁體中閱讀每顆背後故事依主題搜尋感趣發行事務局縣上水內郡牟禮開啟物語天紀念探索歷史徵味直銷所加工活動體驗農住宿通定居工作務支援經營行銷素材沿革高坂林檎於善光門前作為信濃名受歡正式始首次種下苗木世界恐慌導致繭價暴跌蠶絲業衰退而轉向急速擴展發成重要產地舊三村出噸頂級之優質水運推力轉富士向更新推進有志搶救瀕臨絕與牛頓淵源深厚肯特花植英國皇家園藝協會個合併誕皇居東御苑古樹實施分析科學揭示美祕超過朝著第邁寶庫津輕王等經典到縣培信甜心金秋映珍稀布拉姆利以及夢幻和解析理由晝夜溫差顯日照足糖高風濃郁香醇清脆爽口感大透已角實證獨琢磨地域資獨獨造鎮計畫不僅限健康文化型態展永續模式備受青睞想連兩社擁所山保認園大受家藏體屋空資細心諮詢完善購買點農直等集姆醬附設咖啡廳景宜三派御燒很受歡四季菜雪室熟成手打產購訂蜜咚台全配送季節嘉華嚐使用製作餐甜賽師較下博館代麥塔電腦罕一打工收及部分補體收提供最試天就振興協創複輔導立親研修制等論壇技講習設施中心引機械";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Preload Noto Sans TC with high priority to ensure all CJK subsets are available for print */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${shippori.variable} ${zenKaku.variable} ${zenMaru.variable} font-serif antialiased bg-washi text-ink texture-paper min-h-screen`}
      >
        {/* Hidden preload element — forces browser to download all Noto Sans TC subsets
            containing characters used in our Chinese translations.
            Without this, Chrome may not embed all CJK glyphs when printing to PDF. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
            fontFamily: '"Noto Sans TC", sans-serif',
            fontWeight: 400,
          }}
        >
          {ZH_PRELOAD_TEXT}
        </div>
        {/* SVG Filter for Ink Bleed effect (Wabi-sabi) */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <filter id="ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}

