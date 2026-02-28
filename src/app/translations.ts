export type Lang = 'ja' | 'en' | 'zh';

const translations = {
    // ===== COVER (表面 右面) =====
    'cover.title': {
        ja: 'りんごのまち いいづな',
        en: 'Apple Town Iizuna',
        zh: '蘋果之鎮 飯綱',
    },

    // ===== INSIDE FLAP (表面 左面：中折り) =====
    'insideFlap.heading': {
        ja: 'ようこそ、りんごのまちへ。',
        en: 'Welcome to Apple Town.',
        zh: '歡迎來到蘋果之鎮。',
    },
    'insideFlap.tagline': {
        ja: '北信濃の五岳が肩を並べ、\n空からの風が、そっと頬をなでる。\n冷たい空気と、温かな土をぎゅっと抱きしめて、\n色あざやかに輝くりんごと\n人々の心が、しずかに、響きあう。\nここは、実りの鼓動と、私の呼吸が交わる\nちょうど \u201cいい\u201d 場所。',
        en: 'Five peaks stand shoulder to shoulder,\na highland breeze grazes your cheek.\nCrisp air, warm earth — and orchards\nthat glow in every shade of red and gold.\nHere, the rhythm of the harvest\nand your own heartbeat align.\nA place that simply feels right.',
        zh: '北信濃五嶽比肩而立，\n高原的微風輕拂臉龐。\n清冽空氣與溫潤土壤緊緊相擁，\n漫山遍野的蘋果閃耀紅金光芒。\n收穫的律動與心跳的節拍，\n在這裡悄然合一。\n恰到好處的美好所在。',
    },

    // Data numbers
    'data.population.num': { ja: '約1万', en: '~10K', zh: '約1萬' },
    'data.population.unit': { ja: '人', en: '', zh: '人' },
    'data.population.label': { ja: '人口', en: 'Population', zh: '人口' },
    'data.area.num': { ja: '75', en: '75', zh: '75' },
    'data.area.unit': { ja: 'km²', en: 'km²', zh: 'km²' },
    'data.area.label': { ja: '面積', en: 'Area', zh: '面積' },
    'data.elevation.num': { ja: '500–900', en: '500–900', zh: '500–900' },
    'data.elevation.unit': { ja: 'm', en: 'm', zh: 'm' },
    'data.elevation.label': { ja: '標高', en: 'Elevation', zh: '海拔' },
    'data.temp.num': { ja: '12.7', en: '12.7', zh: '12.7' },
    'data.temp.unit': { ja: '℃', en: '℃', zh: '℃' },
    'data.temp.label': { ja: '年平均気温', en: 'Avg. Temp.', zh: '年均溫' },

    // Access bar
    'access.tokyo.prefix': { ja: '東京から', en: 'Tokyo ', zh: '從東京 ' },
    'access.tokyo.value': { ja: '約2時間', en: '~2 hrs', zh: '約2小時' },
    'access.nagano.prefix': { ja: '長野市街から', en: 'Nagano ', zh: '長野市 ' },
    'access.nagano.value': { ja: '約20分', en: '~20 min', zh: '約20分鐘' },

    // Category highlights
    'cat.agriculture.title': { ja: '農業', en: 'Agriculture', zh: '農業' },
    'cat.agriculture.line1': { ja: '「りんご」が町花', en: 'Apple is the town flower', zh: '「蘋果」是町花' },
    'cat.agriculture.line2': { ja: 'そば、米の栽培も盛ん', en: 'Soba & rice also thrive', zh: '蕎麥、稻米栽培也興盛' },
    'cat.nature.title': { ja: '自然', en: 'Nature', zh: '自然' },
    'cat.nature.line1': { ja: '飯綱山、霊仙寺湖', en: 'Mt. Iizuna, Lake Reisenji', zh: '飯綱山、靈仙寺湖' },
    'cat.nature.line2': { ja: 'いいづなリゾートスキー場', en: 'Iizuna Resort Ski Area', zh: '飯綱度假滑雪場' },
    'cat.migration.title': { ja: '移住', en: 'Settling In', zh: '移居' },
    'cat.migration.line1': { ja: '近年は社会増傾向', en: 'Growing population', zh: '近年人口持續增長' },
    'cat.migration.line2': { ja: '移住・子育て支援に積極的', en: 'Relocation & childcare aid', zh: '移居・育兒支援充實' },
    'cat.school.title': { ja: '廃校活用', en: 'Community Hub', zh: '廢校再生' },
    'cat.school.line1': { ja: 'いいづなコネクトを', en: 'Iizuna Connect —', zh: '以飯綱Connect為據點' },
    'cat.school.line2': { ja: '拠点に新たな交流を創出', en: 'a new hub for exchange', zh: '創造嶄新的交流空間' },

    // ===== BACK COVER (表面 中面) =====
    'backCover.headline': {
        ja: '多様な品種の特徴、\n生産者のこだわり、\n滞在や暮らしの情報まで—',
        en: 'Discover our varieties,\nmeet the growers,\nplan your stay & more —',
        zh: '品種特色、\n生產者的堅持、\n停留與生活的一切資訊—',
    },
    'backCover.subtext': {
        ja: 'このパンフレットの詳しい記事や\n最新情報はWebサイトでご覧いただけます',
        en: 'Read full stories and the latest\nnews on our website',
        zh: '更多精彩文章與最新資訊\n歡迎至官方網站瀏覽',
    },
    'backCover.url': { ja: 'appletown-iizuna.com', en: 'appletown-iizuna.com', zh: 'appletown-iizuna.com' },
    'backCover.feat.multilang': {
        ja: '多言語対応（日本語 / English / 繁體中文）',
        en: 'Multilingual (日本語 / English / 繁體中文)',
        zh: '多語言支援（日本語 / English / 繁體中文）',
    },
    'backCover.feat.stories': {
        ja: 'りんごの奥にあるストーリーが読める',
        en: 'Stories behind every apple',
        zh: '閱讀每顆蘋果背後的故事',
    },
    'backCover.feat.search': {
        ja: '気になる情報を検索・テーマで探せる',
        en: 'Search and explore by topic',
        zh: '依主題搜尋感興趣的資訊',
    },
    'backCover.issuer': {
        ja: '発行：飯綱町 / りんごのまち いいづな 事務局\n〒389-1293 長野県上水内郡飯綱町牟礼2795-1\nTEL 026-253-2511',
        en: 'Published by: Iizuna Town / Apple Town Iizuna Office\n〒389-1293 Mure 2795-1, Iizuna, Kamiminochi, Nagano\nTEL 026-253-2511',
        zh: '發行：飯綱町 / 蘋果之鎮飯綱事務局\n〒389-1293 長野縣上水內郡飯綱町牟禮2795-1\nTEL 026-253-2511',
    },

    // ===== BACK SIDE (裏面) =====
    'back.mainTitle.apple': { ja: 'いいづなりんご', en: 'Iizuna Apples', zh: '飯綱蘋果' },
    'back.mainTitle.suffix': { ja: 'からはじまる物語', en: '— Where Stories Begin', zh: '開啟的故事' },
    'back.monument': { ja: '町天然記念物', en: 'Town Heritage Tree', zh: '町天然紀念物' },
    'back.kosaka': { ja: '高坂林檎', en: 'Kosaka Apple', zh: '高坂蘋果' },

    // Section headers — aligned to user category table
    'section.shiru': { ja: '知る', en: 'Discover', zh: '探索' },
    'section.shiru.sub': { ja: '町の歴史・品種の特徴', en: 'Heritage & varieties', zh: '歷史・品種特徵' },
    'section.ajiwau': { ja: '味わう', en: 'Savor', zh: '品味' },
    'section.ajiwau.sub': { ja: '直売所・生産者・加工品・イベント', en: 'Farm stands, producers & events', zh: '直銷所・生產者・加工品・活動' },
    'section.taiken': { ja: '体験する', en: 'Experience', zh: '體驗' },
    'section.taiken.sub': { ja: '農業体験・滞在・アクセス', en: 'Farming, stays & access', zh: '農事體驗・住宿・交通' },
    'section.kurasu': { ja: '暮らす', en: 'Lifestyle', zh: '定居' },
    'section.kurasu.sub': { ja: '仕事・移住支援・就農支援', en: 'Work, relocation & farming support', zh: '工作・移居支援・務農支援' },
    'section.itonamu': { ja: '営む', en: 'Business', zh: '推廣' },
    'section.itonamu.sub': { ja: '生産支援・販促素材', en: 'Production support & promotion', zh: '生產支援・行銷素材' },

    // Timeline
    'timeline.title': { ja: 'これまでのあゆみ', en: 'Our Heritage', zh: '歷史沿革' },
    'timeline.1860': {
        ja: '高坂林檎が善光寺門前で信濃名物として人気',
        en: 'Kosaka Apple famous at Zenkoji',
        zh: '高坂蘋果於善光寺門前成為名產',
    },
    'timeline.1890': {
        ja: '本格的なりんご栽培の始まり、徐々に拡大',
        en: 'Commercial apple farming begins',
        zh: '正式開始商業蘋果栽培',
    },
    'timeline.1929': {
        ja: '世界恐慌で蚕糸業衰退、桑畑→りんご畑へ',
        en: 'Silk declines; orchards replace mulberry',
        zh: '蠶絲業衰退，桑田改為蘋果園',
    },
    'timeline.1965': {
        ja: 'うまいくだものづくり運動で主力がふじに',
        en: '"Better Fruit" drive shifts to Fuji',
        zh: '「優質水果」運動，主力轉向富士',
    },
    'timeline.1968': {
        ja: '旧三水村で9,560t産出、日本一のりんご村に',
        en: '9,560 t — Japan\'s top apple village',
        zh: '舊三水村產9,560噸，日本第一蘋果村',
    },
    'timeline.1980': {
        ja: '絶滅寸前の高坂林檎を有志が保存',
        en: 'Volunteers rescue endangered Kosaka',
        zh: '志願者搶救瀕臨絕種的高坂蘋果',
    },
    'timeline.1987': {
        ja: 'ニュートン品種フラワー・オブ・ケント植樹',
        en: "Newton's Flower of Kent planted",
        zh: '種植牛頓品種「肯特之花」',
    },
    'timeline.1990': {
        ja: '英国王立園芸協会からブラムリー等16品種渡来',
        en: '16 UK varieties inc. Bramley arrive',
        zh: '英國引進布拉姆利等16品種',
    },
    'timeline.2005a': {
        ja: '高坂林檎原木2本が天然記念物に指定',
        en: '2 Kosaka originals named heritage',
        zh: '高坂蘋果原木2棵列為天然紀念物',
    },
    'timeline.2005b': {
        ja: '旧牟礼村と旧三水村が合併し飯綱町誕生',
        en: 'Mure & Samizu merge → Iizuna Town',
        zh: '牟禮村與三水村合併，飯綱町誕生',
    },
    'timeline.2020': {
        ja: '高坂林檎にふじの約10倍の機能性成分を確認',
        en: 'Kosaka: 10× the antioxidants of Fuji',
        zh: '高坂蘋果含富士約10倍機能性成分',
    },
    'timeline.now': {
        ja: '50品種以上を栽培、日本一のりんごのまちへ',
        en: '50+ varieties — toward Japan\'s best',
        zh: '栽培逾50種，邁向日本第一蘋果鎮',
    },
    'timeline.now.label': { ja: '現在', en: 'Now', zh: '現在' },

    // Variety highlight
    'variety.title': {
        ja: '50品種を超えるりんごの宝庫',
        en: 'Over 50 Varieties to Explore',
        zh: '超過50品種的蘋果寶庫',
    },
    'variety.desc': {
        ja: 'ふじ、つがる、王林の定番から、シナノスイート、シナノゴールド、秋映。英国品種ブラムリー。幻の和りんご「高坂林檎」まで。',
        en: 'Fuji, Tsugaru, Orin, Shinano Sweet, Gold, Akibae, UK heritage Bramley, and the legendary Kosaka Apple.',
        zh: '從富士、津輕、王林等經典，到長野原創的信濃甜、信濃金、秋映，英國傳統布拉姆利，以及夢幻的高坂蘋果。',
    },

    // Science column
    'science.title': {
        ja: '科学的にみる、美味しさのひみつ',
        en: 'Flavor & Science',
        zh: '科學解密美味的祕密',
    },
    'science.desc': {
        ja: '昼夜の寒暖差が糖度を凝縮。飯綱町産「ふじ」の味のバランスを示す「糖酸比」は30〜40と科学的にも「美味しい」数値域。他産地に比べシャキシャキの食感（高破断強度）も特徴。',
        en: 'Day-night temperature swings concentrate sugars. Iizuna Fuji scores 30–40 on the sugar-acid ratio — certified "excellent." Its crisp, snappy bite is another hallmark.',
        zh: '晝夜溫差大幅凝聚糖分。飯綱產「富士」的糖酸比達30〜40，科學認證的「美味」區間。清脆爽口的口感（高斷裂強度）更是一大特色。',
    },

    // Town vision column
    'vision.title': {
        ja: '日本一のりんごのまちを目指して',
        en: 'Becoming Japan\'s Premier Apple Town',
        zh: '邁向日本第一蘋果之鎮',
    },
    'vision.desc': {
        ja: '飯綱町は「りんご」を核に地域資源を磨き上げる独自のまちづくりを推進中。農業に留まらず健康・文化・働き方まで含めた持続可能な地域モデルを展開しています。',
        en: 'Iizuna is building a sustainable community with apples at its heart — weaving agriculture, wellness, culture, and new ways of working into a single vision.',
        zh: '飯綱町以「蘋果」為核心，推動獨特的造鎮計畫。不僅限於農業，更涵蓋健康、文化與工作型態的永續地域模式。',
    },

    // Migration column
    'migration.title': {
        ja: '選ばれる移住先として',
        en: 'A Community Worth Calling Home',
        zh: '備受青睞的理想移居地',
    },
    'migration.desc': {
        ja: '2025年、2年連続の社会増を達成。「信州やまほいく」認定園が4施設あり、自然の中での子育て環境が人気の要因に。移住体験住宅や空き家情報など丁寧な相談体制も整っています。',
        en: 'Growing population, four nature-based nurseries, trial housing, and dedicated relocation support make moving here easy.',
        zh: '連續兩年實現人口正增長。擁有4所「信州山之幼兒園」認定園所，大自然中的育兒環境備受好評。移居體驗住宅、空屋媒合等諮詢體制完善。',
    },

    // Shops — user table: "Where to Buy"
    'shops.title': { ja: '買えるお店', en: 'Where to Buy', zh: '購買地點' },
    'shop.muchan.name': { ja: 'いいづなマルシェ むーちゃん', en: 'Iizuna Marché Mu-chan', zh: '飯綱市集 姆醬' },
    'shop.muchan.desc': { ja: 'カフェ併設、景色も魅力', en: 'Café & scenic views', zh: '附設咖啡廳，風景宜人' },
    'shop.sanchan.name': { ja: '直売所 さんちゃん', en: 'Farm Stand San-chan', zh: '三醬農產直銷所' },
    'shop.sanchan.desc': { ja: 'アップルパイ、おやきなども人気', en: 'Apple pies & oyaki popular', zh: '蘋果派、御燒也很受歡迎' },
    'shop.shikisai.name': { ja: '横手直売所 四季彩', en: 'Yokote Shikisai', zh: '四季彩農產直銷所' },
    'shop.shikisai.desc': { ja: '雪むろ熟成りんご、そばも人気', en: 'Snow-aged apples & soba', zh: '雪室熟成蘋果・手打蕎麥' },
    'shop.farm.name': { ja: '農家直売', en: 'Direct from Farmers', zh: '農家直銷' },
    'shop.farm.desc': { ja: '農家から直接購入・直売所／通販など', en: 'Buy direct / farm stands / online', zh: '產地直購・直銷所・網路訂購' },
    'shop.mitsudon.name': { ja: 'みつどんマルシェ', en: 'Mitsudon Marché', zh: '蜜咚市集' },
    'shop.mitsudon.desc': { ja: '町公式通販サイト。全国配送。', en: 'Official shop. Ships Japan-wide.', zh: '官方網購平台，全國配送。' },

    // Events — user table: "Seasonal Events"
    'events.title': { ja: '季節のイベント', en: 'Seasonal Events', zh: '季節活動' },
    'event.ukfair.title': { ja: '英国りんごフェア', en: 'British Apple Fair', zh: '英國蘋果嘉年華' },
    'event.ukfair.desc': { ja: '酸味の効いた料理用りんごが味わえる', en: 'Savor tart UK apples', zh: '品嚐英式酸味料理蘋果' },
    'event.sweets.title': { ja: 'スイーツフェア', en: 'Sweets Fair', zh: '甜點嘉年華' },
    'event.sweets.desc': { ja: '町内飲食店がりんごスイーツを提供', en: 'Local cafés serve apple treats', zh: '町內餐廳推出蘋果甜點' },
    'event.concours.title': { ja: 'スイーツコンクール', en: 'Sweets Concours', zh: '甜點大賽' },
    'event.concours.desc': { ja: 'りんごを使い、料理人たちが腕を競う', en: 'Chefs compete with apple dishes', zh: '廚師以蘋果為題一較高下' },

    // Apple Museum
    'museum.title': { ja: 'いいづなアップルミュージアム', en: 'Iizuna Apple Museum', zh: '飯綱蘋果博物館' },
    'museum.desc': {
        ja: 'ニュートンのりんごの木から初代Macまで。全国でも珍しいりんご専門の博物館。りんごの歴史と文化を一度に体験。',
        en: "From Newton's tree to the original Macintosh. A rare apple museum — history and culture in one visit.",
        zh: '從牛頓的蘋果樹到初代麥金塔電腦。全國罕見的蘋果專門博物館，一次體驗蘋果的歷史與文化。',
    },

    // Experience section — user table: "Hands-on Farming"
    'exp.farming.title': { ja: '農業体験・ワーキングホリデー', en: 'Hands-on Farming', zh: '農事體驗・農業打工度假' },
    'exp.farming.desc': { ja: '収穫や作業体験・宿泊は一部町の補助あり。', en: 'Harvest & work with lodging support.', zh: '收穫及農事體驗，部分住宿有町補助。' },
    'exp.owner.title': { ja: 'りんごの木オーナー制度', en: 'Apple Tree Patronage', zh: '蘋果樹認養制度' },
    'exp.owner.desc': { ja: '1本の木を契約し、秋には自分のりんごを収穫。', en: 'Adopt a tree; harvest your own apples.', zh: '認養一棵樹，秋天採收專屬蘋果。' },
    'exp.school.title': { ja: '信州いいづなりんご学校', en: 'Iizuna Apple School', zh: '飯綱蘋果學校' },
    'exp.school.desc': { ja: '日帰り〜上級まで段階的に学べる体験型講座。', en: 'Day trips to advanced courses, step by step.', zh: '從一日體驗到進階課程，循序漸進。' },

    // Stay info — user table: "Dining" / "Local Transport" / "Accommodations"
    'stay.dining.label': { ja: '食事', en: 'Dining', zh: '餐飲' },
    'stay.dining.desc': { ja: 'りんご／郷土料理・そば・カフェ・レストラン', en: 'Apple cuisine, soba, cafés & more', zh: '蘋果料理・蕎麥・咖啡廳・餐廳' },
    'stay.transport.label': { ja: '移動', en: 'Transport', zh: '交通' },
    'stay.transport.desc': { ja: 'バス／タクシー・レンタカー・レンタル自転車', en: 'Bus, taxi, car & bike rental', zh: '巴士・計程車・租車・自行車' },
    'stay.lodging.label': { ja: '宿泊', en: 'Lodging', zh: '住宿' },
    'stay.lodging.desc': { ja: 'ホテル・民泊／一棟貸し・キャンプ／グランピング', en: 'Hotels, private stays, glamping', zh: '飯店・民宿・露營・豪華露營' },

    // Live section — user table: "Lifestyle" > "Settling In" / "Work Opportunities" / "Start Farming"
    'live.relocation.label': { ja: '移住', en: 'Settling In', zh: '移居' },
    'live.relocation.desc': { ja: '体験住宅あり・最長6泊7日のお試し滞在可能', en: 'Trial stays up to 7 days available', zh: '提供體驗住宅，最長可試住7天' },
    'live.work.label': { ja: '働く', en: 'Work', zh: '就業' },
    'live.work.desc': { ja: '地域おこし協力隊／いいコネワークスで複業など', en: 'Community corps & co-working options', zh: '地方振興協力隊／共創空間複業等' },
    'live.farming.label': { ja: '就農', en: 'Start Farming', zh: '務農' },
    'live.farming.desc': { ja: '約3年で独立を目指す新規就農里親研修制度など', en: '3-year mentorship to independence', zh: '約3年獨立的新農里親研修制度' },

    // Work/Business section — user table: "Business" > "Grower Support"
    'work.line1': {
        ja: 'りんごフォーラム／栽培講習会／加工施設／フルーツセンター／',
        en: 'Forums / workshops / processing / fruit center /',
        zh: '蘋果論壇／技術講習／加工設施／水果中心／',
    },
    'work.line2': {
        ja: '苗木導入補助／機械整備補助 など',
        en: 'sapling & equipment grants',
        zh: '苗木引進補助／機械整備補助等',
    },

    // PDF export UI
    'ui.exporting': { ja: 'PDF出力中...', en: 'Exporting PDF...', zh: 'PDF輸出中...' },
    'ui.export': { ja: 'PDF出力', en: 'Export PDF', zh: 'PDF輸出' },
    'ui.exportFailed': {
        ja: 'PDF出力に失敗しました。もう一度お試しください。',
        en: 'PDF export failed. Please try again.',
        zh: 'PDF輸出失敗，請再試一次。',
    },

    // Back side section labels
    'ui.backSideLabel': { ja: '裏面（左面 / 中面 / 右面）', en: 'Back (Left / Center / Right)', zh: '背面（左面 / 中面 / 右面）' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
    const entry = translations[key];
    return entry?.[lang] ?? entry?.['ja'] ?? key;
}

export default translations;
