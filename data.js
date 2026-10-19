/* ===================================================================
   編集ガイド（全体）
   - このファイルを編集すれば index.html / japan.html / world.html すべてに反映されます
   - 都道府県・国は videos: [] という配列を持っています
   - 動画が1本のとき   ：videos:[{title:"金沢編", url:"https://..."}]
                          → クリックするとモーダルウィンドウが開き、サムネイルとタイトルが表示されます
   - 動画が複数のとき ：videos:[{title:"金沢編", url:"..."},{title:"能登編", url:"..."}]
                          → 同じくモーダルに全部並びます
   - サムネイルはYouTubeのURLなら自動で取得されます
   - 自動取得できない動画（YouTube以外、または画像を用意できない場合）は
     thumb: "" のまま（空欄）にしておけば「準備中」のプレースホルダーが表示されます。
     画像を用意できたら thumb: "https://画像のURL" のように入れれば差し替わります
   - 訪れていない場所は videos: [] のままにしておく
=================================================================== */

/* ---------- ホーム画面・写真枠（YouTubeのサムネイルが自動で切り替わります） ---------- */
// url：YouTubeの動画URL（サムネイルを自動で取得して表示します）
// heroSlideSeconds：サムネイルを切り替える間隔（秒）
// 全部のurlが空欄の場合はサンプルのイラストが表示されます
const heroSlideSeconds = 5;

const heroVideos = [
  {url:"https://youtu.be/4BMXgev_Ce4?si=O7lBOwoMyIfe_VAZ"},
  {url:"https://youtu.be/kGfGfo0KHAM?si=RD2Yc6i7MhOg-Vf7"},
  {url:"https://youtu.be/f1JeJUbXehE?si=EFObG6A68iIn3y4H"},
  {url:"https://youtu.be/9zRV1wIk_Ks?si=G3b8eWSkKquWCLgv"},
];

/* ---------- ホームの横スクロール文字列（クリックでURLへ） ---------- */
// url を入れるとクリックでそのページが開きます。空欄なら押しても何も起きません
const tickerItems = [
  {icon:"🍜", label:"#山形ラーメン", url:"https://youtu.be/EFn3dG6aIXw?si=fVsyGFB1ZcV3lLW_"},
  {icon:"🏝️", label:"#瀬戸内海", url:"https://youtu.be/MsskOx7ROis?si=xmxVmUmQmt7aSo98"},
  {icon:"🦓", label:"#サファリ", url:"https://youtu.be/lDJ4_PsV03U?si=9ZhXWx67pRJXzC3q"},
  {icon:"🧋", label:"#タピオカ台湾ティー", url:"https://youtu.be/KvNzyiciJfY?si=PNhlMgHmBaD5g5Lr"},
  {icon:"🐵", label:"#サルが遊びに来た", url:"https://youtu.be/jLq06sSBxcw?si=qDqfSoCjIcPoWneN"},
  {icon:"🐘", label:"#象と友達になりました", url:"https://youtu.be/f1JeJUbXehE?si=VHeG3S39c9VA6SMZ"},
  {icon:"🏵️", label:"#伝説の花探し", url:"https://youtu.be/vgf5g8BnywQ?si=qMbohBaxOyLEj_iz"},
  {icon:"🍣", label:"#YUUさんの手料理", url:"https://youtu.be/LrFmhT6pOEM?si=FI8-9EqWJ6TOudse"},
  {icon:"🫧", label:"#バブルリング", url:"https://youtu.be/e1OC5q2qEyQ?si=jTbi7igWOPx0W4xO"},
  {icon:"💃", label:"#ウ～マンボ", url:"https://youtu.be/4BMXgev_Ce4?si=GryV72vP7it9LtbX"},
];

/* ---------- 国内ページ・海外ページの画像（写真） ----------
   image：差し替えたい画像のファイル名（このフォルダに置いた画像）か、画像のURL
          例）"japan-photo.jpg" / "https://example.com/world.png"
          空欄("")のままなら、サンプルのイラスト（日本列島・世界地図）が表示されます
          ※指定した画像が見つからない時も、サンプルのイラストに戻ります
   fit  ：画像の収め方
          "cover"   = 枠いっぱいに表示（写真向き。はみ出た部分は切り取られます）
          "contain" = 画像全体を枠に収める（地図の切り抜き画像など、切り取りたくない時向き）
   alt  ：画像の説明文（読み上げ・画像が表示できない時用）               */
const pageImages = {
  japan: { image:"Japan11.jpg", fit:"cover", alt:"国内の旅の写真" },
  world: { image:"world11.jpg", fit:"cover", alt:"海外の旅の写真" },
};

/* ---------- 台湾特集（ホーム画面・おすすめ動画の下） ----------
   image    ：左側に表示する画像（ファイル名かURL）。空欄なら videoUrl のサムネイルを使います
   videoUrl ：YouTubeの動画URL。image が空欄の時、この動画のサムネイルを表示します
   fit      ："cover"=枠いっぱいに表示 / "contain"=画像全体を収める
   heading  ：セクションの見出し
   title    ：右側の大きな見出し
   description：右側の説明文
   link     ：クリック先（"taiwan.html" など）。http で始まるURLは新しいタブで開きます
   linkLabel：右側の「…を見る ↗」の文字 */
const taiwanFeature = {
  image: "",
  videoUrl: "https://youtu.be/KvNzyiciJfY?si=0xkWaIArnCAEvOFT",
  fit: "cover",
  heading: "台湾特集",
  title: "巡る、台湾の素顔。",
  description: "街並み、台湾グルメ、夜市、豊かな自然まで。台湾を地域ごとに動画をまとめました。",
  link: "taiwan.html",
  linkLabel: "台湾の旅を見る",
};

/* ---------- チャンネル登録者数・投稿動画本数 ---------- */
// 好きな表記でOK（例: "105万人" "418本"）
const channelStats = {
  subscribers: "105万人",
  videoCount: "418本"
};

/* ---------- 再生数ランキング TOP3 ---------- */
// views も好きな表記でOK（例: "120万回再生"）
const rankingVideos = [
  {rank:1, title:"行き先は日本の夏休み🌿長良川を巡る岐阜の鉄道旅｜水のまち郡上八幡、伝統の鵜飼、美濃", views:"260万回再生", url:"https://youtu.be/Kpad7SvrMvA?si=G-zYMlp_FilmzJAv"},
  {rank:2, title:"心に残る、あの夏へ。山陰の城下町、津和野で見つけた日本の夏｜島根を巡る鉄道旅｜有福温泉", views:"220万回再生", url:"https://youtu.be/URTTB81Wn78?si=cdGRDhLCqYRW4Ub0"},
  {rank:3, title:"台湾てこんなに楽しい！１日で台北を遊び尽くす方法🇹🇼今なら２万円貰って格安旅行", views:"217万回再生", url:"https://youtu.be/KvNzyiciJfY?si=L-4Dn9coMQ0NEGlu"},
];

/* ---------- おすすめ動画（横スクロールカルーセル・5件） ---------- */
const recommendedVideos = [
  {title:"時が止まる600年の宿と紅葉の松島・仙台、2泊3日の大人旅｜鎌先温泉｜宮城旅行", url:"https://youtu.be/Q136JTVBJnc?si=jcsl5gIQRNutDXYp"},
  {title:"秋の兵庫を縦断する旅🍁 天空の城と城崎温泉を目指して｜竹田城跡・姫路城", url:"https://youtu.be/un5qfRREwBE?si=O9qTsZE57CQqlNwp"},
  {title:"韓国旅行🇰🇷紅葉のソウル人気スポットと韓国グルメ9選｜南大門市場｜聖水洞｜昌徳宮｜ロッテマート", url:"https://youtu.be/2AIcXuzvEuM?si=NEMmgIvuGhQcXXzt"},
  {title:"紅葉の奈良🍁1日で巡る奈良グルメと観光スポット｜東大寺｜奈良公園", url:"https://youtu.be/G5e1LqoiZjc?si=IeoDw5IHz6osgsnb"},
  {title:"そうだ、ベストシーズンの京都行こう🍁2泊3日でめぐる秋の京都旅行", url:"https://youtu.be/N3AH0-6F5iA?si=dvPK7dTY0OiuS-dn"},
  {title:"美しき日本の原風景へ🌾秋の飛騨地方を巡る2泊3日の旅｜白川郷｜飛騨古川｜飛騨小坂", url:"https://youtu.be/ATWu-0gFKYY?si=bfwPIiwtwg5SQLu5"},
  {title:"会津鉄道で巡る1泊2日🍁ぶらり途中下車の旅、美しい日本の秋と絶品グルメ｜大内宿｜芦ノ牧温泉｜会津若松｜福島県", url:"https://youtu.be/zTpXlhjKW5Q?si=5Wz6rKs4jIUxK6rn"},
  {title:"日光を楽しみ尽くす黄金ルート🍁奥日光で癒される1泊2日の旅｜日光東照宮｜中禅寺湖｜戦場ヶ原｜栃木県", url:"https://youtu.be/U1ug4tCXQ5I?si=2h54SMWqt2kZIY_t"},
  {title:"時が止まる600年の宿と紅葉の松島・仙台、2泊3日の大人旅｜鎌先温泉｜宮城旅行", url:"https://youtu.be/Q136JTVBJnc?si=jcsl5gIQRNutDXYp"},
  {title:"秋の兵庫を縦断する旅🍁 天空の城と城崎温泉を目指して｜竹田城跡・姫路城", url:"https://youtu.be/un5qfRREwBE?si=O9qTsZE57CQqlNwp"},
  {title:"韓国旅行🇰🇷紅葉のソウル人気スポットと韓国グルメ9選｜南大門市場｜聖水洞｜昌徳宮｜ロッテマート", url:"https://youtu.be/2AIcXuzvEuM?si=NEMmgIvuGhQcXXzt"},
  {title:"紅葉の奈良🍁1日で巡る奈良グルメと観光スポット｜東大寺｜奈良公園", url:"https://youtu.be/G5e1LqoiZjc?si=IeoDw5IHz6osgsnb"},
  {title:"そうだ、ベストシーズンの京都行こう🍁2泊3日でめぐる秋の京都旅行", url:"https://youtu.be/N3AH0-6F5iA?si=dvPK7dTY0OiuS-dn"},
  {title:"美しき日本の原風景へ🌾秋の飛騨地方を巡る2泊3日の旅｜白川郷｜飛騨古川｜飛騨小坂", url:"https://youtu.be/ATWu-0gFKYY?si=bfwPIiwtwg5SQLu5"},
  {title:"会津鉄道で巡る1泊2日🍁ぶらり途中下車の旅、美しい日本の秋と絶品グルメ｜大内宿｜芦ノ牧温泉｜会津若松｜福島県", url:"https://youtu.be/zTpXlhjKW5Q?si=5Wz6rKs4jIUxK6rn"},
  {title:"日光を楽しみ尽くす黄金ルート🍁奥日光で癒される1泊2日の旅｜日光東照宮｜中禅寺湖｜戦場ヶ原｜栃木県", url:"https://youtu.be/U1ug4tCXQ5I?si=2h54SMWqt2kZIY_t"},
];

/* ---------- Instagram 最近の投稿（3件） ---------- */
// url には投稿ページのURL（https://www.instagram.com/p/XXXXXXXXX/ の形）を入れてください
const instagramPosts = [
  {url:"https://www.instagram.com/p/DdyTB5kE6xA/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
  {url:"https://www.instagram.com/p/Dc8KXbYE1hb/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
  {url:"https://www.instagram.com/p/DcVIzVkE8_o/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
  {url:"https://www.instagram.com/p/DbiNSH3E-V7/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
  {url:"https://www.instagram.com/p/DZi0AB4z3Fw/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
  {url:"https://www.instagram.com/p/DX_oE9Jk5mc/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="},
];

/* ---------- note ---------- */
const notePage = {
  url: "https://note.com/maibaru55",
  description: "旅の裏側やコラムをnoteでも公開中。"
};

/* ---------- note+ 最近の投稿（3件） ---------- */
// url には記事のURL（https://note.com/maibaru55/n/nXXXXXXXXXXXX の形）を入れてください
const notePosts = [
  {url:"https://note.com/maibaru55/n/n1623e0cdbc19?sub_rt=share_sb"},
  {url:"https://note.com/maibaru55/n/n18d53b8dcde4?sub_rt=share_sb"},
  {url:"https://note.com/maibaru55/n/n135b137b0844?sub_rt=share_sb"},
  {url:"https://note.com/maibaru55/n/n12b3a47229de?sub_rt=share_sb"},
];

const REGIONS = [
  { key:"hokkaido", label:"北海道地方" },
  { key:"tohoku",   label:"東北地方" },
  { key:"kanto",    label:"関東地方" },
  { key:"chubu",    label:"中部地方" },
  { key:"kinki",    label:"近畿地方" },
  { key:"chugoku",  label:"中国地方" },
  { key:"shikoku",  label:"四国地方" },
  { key:"kyushu",   label:"九州・沖縄地方" },
];

const prefectures = [
  {name:"北海道", region:"hokkaido", videos:[
    {title:"【メンバー限定】函館旅行｜朝市で贅沢して、港町の美しさにひたる1泊2日Vlog", url:"https://youtu.be/9JoMnSHj0rQ?si=Jnw5s2om6xN8vZ1I", thumb:""},
    {title:"冬の北海道｜富良野線で巡る、白銀の美瑛・富良野・旭川 2泊3日の旅", url:"https://youtu.be/6fL9aDhAlzs?si=Lnp_uzalA052iNny", thumb:""}
  ]},
  {name:"青森県", region:"tohoku", videos:[{title:"【 青森旅行 】日本一美しい春を旅しよう🌸桜満開の春の青森｜弘前さくらまつり", url:"https://youtu.be/M7-DoXO2x80?si=t6AsIKjPpNAhANgt"}]},
  {name:"岩手県", region:"tohoku", videos:[{title:"【 岩手旅行 】盛岡グルメ、温泉、世界遺産で岩手県を大満喫｜大沢温泉山水閣｜平泉｜盛岡", url:"https://youtu.be/ugFitCsSEY0?si=kqf_rDG1SAyWMfwe"}]},
  {name:"宮城県", region:"tohoku", videos:[{title:"時が止まる600年の宿と紅葉の松島・仙台、2泊3日の大人旅｜鎌先温泉｜宮城旅行", url:"https://youtu.be/Q136JTVBJnc?si=8pASihYyKhwR5x7T"}]},
  {name:"秋田県", region:"tohoku", videos:[{title:"冬の秋田❄️幻想的なかまくら祭りと憧れの秘湯「鶴の湯」を巡る旅", url:"https://youtu.be/MWIhng67IjA?si=3lUNyGCp3NlJw8DH"}]},
  {name:"山形県", region:"tohoku", videos:[
    {title:"美しい日本のふるさとへ。春の山形をローカル線で巡る｜味覚と原風景の旅", url:"https://youtu.be/EFn3dG6aIXw?si=0n7DAIFzNpE61IVU", thumb:""},
    {title:"夏の山形⛰️知らなかった、美しき高山の世界！はじめての月山登山｜寒河江市", url:"https://youtu.be/mScREnckwTc?si=cYzcJNFrZiPTxZ8l", thumb:""},
    {title:"冬の山形を巡る旅❄️美しい日本の冬と温泉を味わう1泊2日｜銀山温泉｜山寺", url:"https://youtu.be/2uk1Cv0jNzo?si=mmJBBqHvsOs8tFRx", thumb:""},
    {title:"山形旅行β版", url:"https://youtu.be/BYOZZD1s-8I?si=DoHz5twyCbw7UrWq", thumb:""}
  ]},
  {name:"福島県", region:"tohoku", videos:[{title:"会津鉄道で巡る1泊2日🍁ぶらり途中下車の旅、美しい日本の秋と絶品グルメ｜大内宿｜芦ノ牧温泉｜会津若松｜福島県", url:"https://youtu.be/zTpXlhjKW5Q?si=56QrmQMp-EmppoGj"}]},
  {name:"茨城県", region:"kanto", videos:[]},
  {name:"栃木県", region:"kanto", videos:[{title:"日光を楽しみ尽くす黄金ルート🍁奥日光で癒される1泊2日の旅｜日光東照宮｜中禅寺湖｜戦場ヶ原｜栃木県", url:"https://youtu.be/U1ug4tCXQ5I?si=YH29imazcMAGrBdc"}]},
  {name:"群馬県", region:"kanto", videos:[]},
  {name:"埼玉県", region:"kanto", videos:[]},
  {name:"千葉県", region:"kanto", videos:[{title:"千葉への日帰りプチトリップ｜成田と佐原で素敵な休日を過ごそう", url:"https://youtu.be/jNsgVLHG02s?si=8eY-TQgZUb1PmSuZ"}]},
  {name:"東京都", region:"kanto", videos:[
    {title:"【 春の東京 】下町で過ごす、穏やかな休日🌸桜咲く路地裏と老舗の味｜谷中", url:"https://youtu.be/NUENGBh22Ho?si=Frc9_DgytVNm67R4", thumb:""},
    {title:"春の谷中散歩", url:"https://youtu.be/1MmQPmiBWLE?si=N6Rthp6m0wxxzhQz", thumb:""},
    {title:"【 東京観光 】下町・根津で過ごすレトロな休日🗼ふくろうカフェ｜根津神社", url:"https://youtu.be/S6g6KRTuSDI?si=mgIa9C76HS1raXQT", thumb:""},
    {title:"東京観光🗼外国人に人気の下町・谷中で過ごすレトロな休日｜谷中銀座商店街", url:"https://youtu.be/_jnjwt_wpQM?si=mzwYw3-xYg3D0v-K", thumb:""},
    {title:"まいばるの地元！東京最後の秘境、奥多摩…", url:"https://youtu.be/MIKyCZvErzE?si=o2hlvFjgII65xYhr", thumb:""}
  ]},
  {name:"神奈川県", region:"kanto", videos:[
    {title:"１泊で横浜を楽しみ尽くす！船で行く中華街と憧れのクラシックホテルに泊まる大人の定番旅", url:"https://youtu.be/pDoEt6czjRU?si=f760l_XCDWJNIGME", thumb:""},
    {title:"箱根ってこんなに楽しい！1泊2日で巡る最高の箱根旅行｜芦ノ湖｜強羅｜大涌谷｜山のホテル", url:"https://youtu.be/mu-QIku2Ls0?si=XfYpz-CXBvmbbS8K", thumb:""},
    {title:"江ノ電で巡る秋晴れの鎌倉🚃グルメと非日常を求めて｜鶴岡八幡宮｜鎌倉大仏", url:"https://youtu.be/gdcEUGs_A4s?si=_vCjjsGYlczAHEAM", thumb:""}
  ]},
  {name:"新潟県", region:"chubu", videos:[{title:"ノスタルジーに包まれる、夏の佐渡島🌾1泊2日であの頃の夏休みを旅しよう｜宿根木｜佐渡金山｜新潟", url:"https://youtu.be/jKVWu91PbE8?si=u0Q1pWogUlTiCZ5G"}]},
  {name:"富山県", region:"chubu", videos:[{title:"美しき富山の冬、童話の世界へ❄️雪深い隠れ里と絶景を巡る旅｜雨晴海岸｜氷見｜相倉合掌造り集落｜高岡", url:"https://youtu.be/t9U8QfOxMMw?si=yArdFc5iunrdi8XT"}]},
  {name:"石川県", region:"chubu", videos:[{title:"1泊2日でちょっと贅沢な金沢旅行！北陸グルメと人気スポット｜ひがし茶屋街｜兼六園", url:"https://youtu.be/NTJB7reMSpw?si=ERkpMmwbn2PIxsjP"}]},
  {name:"福井県", region:"chubu", videos:[]},
  {name:"山梨県", region:"chubu", videos:[{title:"【 山梨旅行 】東京からすぐ！山間の村で暮らすように過ごす週末｜小菅村", url:"https://youtu.be/mACoB6idQKo?si=5HnQq-BCf1TnIy_T"}]},
  {name:"長野県", region:"chubu", videos:[
    {title:"鉄道で巡る冬の長野❄️1泊2日の癒し温泉旅行｜地獄谷温泉｜湯田中｜小布施｜善光寺", url:"https://youtu.be/mAFECx4XWrk?si=rYd3y7ULMI_U8z6_", thumb:""},
    {title:"日本の美しい夏を旅する🌾ローカル線で巡る1泊2日の長野旅行｜安曇野｜松本｜麻績村", url:"https://youtu.be/1FxydtMSorg?si=U6-WiBJAcdzJjjY-", thumb:""},
    {title:"古き良き日本へ🍃奈良井宿に泊まって江戸時代にタイムスリップ｜中山道｜長野旅行", url:"https://youtu.be/exEd5pT6sdY?si=prTOPw3IowwUw3kn", thumb:""},
    {title:"息を呑むほど美しい⛰️日帰りで満喫するベストシーズンの上高地｜長野旅行", url:"https://youtu.be/JexgGtA00H8?si=pkp3ri51S0LVZ72v", thumb:""},
    {title:"【長野/岐阜旅】江戸時代の宿場町を歩く🍃馬籠宿と妻籠宿で出会う、日本の原風景｜中山道", url:"https://youtu.be/lmzde489Fsg?si=ya5EGHInbC-3SJFn", thumb:""}
  ]},
  {name:"岐阜県", region:"chubu", videos:[
    {title:"冬の岐阜旅！郡上八幡と下呂温泉", url:"https://youtu.be/ih_LDWO2Wi8?si=O26GNmx39EAdj-Wp", thumb:""},
    {title:"美しき日本の原風景へ🌾秋の飛騨地方を巡る2泊3日の旅｜白川郷｜飛騨古川｜飛騨小坂", url:"https://youtu.be/ATWu-0gFKYY?si=B97E-8L3Jt9cCM1z", thumb:""},
    {title:"古き良き日本の冬へ❄️飛騨高山と白川郷を巡る、２泊３日の冬の岐阜旅", url:"https://youtu.be/tPTFTmVdQJQ?si=hbDQASBRTVp1zzM4",thumb:""},
    {title:"行き先は日本の夏休み🌿長良川を巡る岐阜の鉄道旅｜水のまち郡上八幡、伝統の鵜飼、美濃", url:"https://youtu.be/Kpad7SvrMvA?si=wKpBk2lJ1Ky3cnVg",thumb:""},
    {title:"【長野/岐阜旅】江戸時代の宿場町を歩く🍃馬籠宿と妻籠宿で出会う、日本の原風景｜中山道", url:"https://youtu.be/lmzde489Fsg?si=ya5EGHInbC-3SJFn", thumb:""}
  ]},
  {name:"静岡県", region:"chubu", videos:[{title:"【 伊豆旅行 】昭和の風情ただよう伊東温泉で1泊2日｜大室山｜伊豆シャボテン公園", url:"https://youtu.be/yScAzoHWmw8?si=neU6963WIzyZgkeY"}]},
  {name:"愛知県", region:"chubu", videos:[{title:"【 名古屋観光 】絶対行きたいスポットとグルメ8選｜熱田神宮｜名古屋城｜犬山城下町", url:"https://youtu.be/N1kQYn3zBqg?si=53M6fHRQj_N8Vahg"}]},
  {name:"三重県", region:"kinki", videos:[{title:"1泊2日で巡る伊勢志摩、心洗われる三重の旅｜伊勢神宮｜おかげ横丁｜松坂牛", url:"https://youtu.be/-asjRYxL4Ec?si=Ykq8Yll3tP5v1XqV"}]},
  {name:"滋賀県", region:"kinki", videos:[{title:"懐かしき水郷 🍃近江八幡から始まる、琵琶湖の歴史と自然を巡る滋賀旅｜彦根城｜竹生島", url:"https://youtu.be/VtXBq71Cjbg?si=vwGfIgkfijrNURHC"}]},
  {name:"京都府", region:"kinki", videos:[
    {title:"1泊2日の京都旅行❄️雪の金閣寺と幻の天ガニを求めて｜京丹後｜天橋立", url:"https://youtu.be/gazFnegU6yY?si=mBBopZzgkj1lafTm", thumb:""},
    {title:"【 京都観光 】嵐山と最新ホテルで過ごす1泊2日の癒し旅｜シックスセンシズ京都", url:"https://youtu.be/J-Z2z5R6yTg?si=J3qTgYs-DSmc2VCA", thumb:""},
    {title:"【 海の京都 】日本の原風景を巡る2日間の夏旅｜天橋立｜伊根｜与謝野", url:"https://youtu.be/ecqPS0iL0c8?si=suvOggJc9q01Q-al", thumb:""},
    {title:"そうだ、ベストシーズンの京都行こう🍁2泊3日でめぐる秋の京都旅行", url:"https://youtu.be/N3AH0-6F5iA?si=_3tPZ_KZkur3bHSx", thumb:""}
  ]},
  {name:"大阪府", region:"kinki", videos:[{title:"【 大阪観光 】定番グルメから穴場スポットまで全部盛りの１泊２日｜道頓堀｜大阪城｜富田林", url:"https://youtu.be/GPTN07dUzv4?si=lcwjTfsglAsz7hr1"}]},
  {name:"兵庫県", region:"kinki", videos:[{title:"秋の兵庫を縦断する旅🍁 天空の城と城崎温泉を目指して｜竹田城跡・姫路城", url:"https://youtu.be/un5qfRREwBE?si=1XFcmDgxvOTahB70"}]},
  {name:"奈良県", region:"kinki", videos:[{title:"紅葉の奈良🍁1日で巡る奈良グルメと観光スポット｜東大寺｜奈良公園", url:"https://youtu.be/G5e1LqoiZjc?si=XMEcLrodMH2r_4q7"}]},
  {name:"和歌山県", region:"kinki", videos:[]},
  {name:"鳥取県", region:"chugoku", videos:[{title:"時が止まる夏、鳥取へ｜白壁の町・倉吉から、青い日本海と鳥取砂丘へ", url:"https://youtu.be/WNy-yJb632U?si=b_gy4E8LkSNEu0NL"}]},
  {name:"島根県", region:"chugoku", videos:[
    {title:"心に残る、あの夏へ。山陰の城下町、津和野で見つけた日本の夏｜島根を巡る鉄道旅｜有福温泉", url:"https://youtu.be/URTTB81Wn78?si=L-gjJm2uwVDlRLju", thumb:""},
    {title:"【 島根旅行 】伝統と温泉を満喫する1泊2日｜石見銀山｜石見神楽｜温泉津温泉", url:"https://youtu.be/3DrYWgzRJXg?si=iVlz69A16KP1hpoY", thumb:""}
  ]},
  {name:"岡山県", region:"chugoku", videos:[
    {title:"江戸時代の風情残る街、倉敷へ。1泊2日で巡る岡山｜備中高梁の夏祭り", url:"https://youtu.be/eJ3GehNdu9A?si=iSccjnsvdSctKfHk", thumb:""},
    {title:"【 岡山旅行 】日本で最も美しい村へ🌸出雲街道の宿場町を辿る旅｜新庄村｜津山", url:"https://youtu.be/mE1T11B_s_I?si=02bCNCMVTJoHEHfI", thumb:""},
    {title:"【 岡山観光 】日本昔ばなしの世界へ🌸1泊2日で備中地方を大満喫", url:"https://youtu.be/ywJlybnCnOg?si=6iqbu_hUi4ynCU92", thumb:""}
  ]},
  {name:"広島県", region:"chugoku", videos:[{title:"あの夏を、旅する🍃瀬戸内海の絶景と古い町並みを巡るノスタルジックな1泊2日｜尾道｜鞆の浦", url:"https://youtu.be/AnBmbR7U3a8?si=KMPJhhNdS3KIvseA"}]},
  {name:"山口県", region:"chugoku", videos:[{title:"憧れの世界遺産の町、萩で過ごす1泊2日｜日本海グルメと歴史探訪｜松下村塾｜山口旅行", url:"https://youtu.be/iYkbzFGPUis?si=urZi82SXE89jliNA"}]},
  {name:"徳島県", region:"shikoku", videos:[]},
  {name:"香川県", region:"shikoku", videos:[{title:"日本の夏に会いに行く旅。瀬戸内海の島で過ごす懐かしい時間｜男木島｜豊島", url:"https://youtu.be/MsskOx7ROis?si=hZ4Mq4GxLwJobJrk"}]},
  {name:"愛媛県", region:"shikoku", videos:[{title:"日本の夏休みへ🚃下灘駅から始まる、涙が出るほど懐かしい旅｜愛媛｜四国", url:"https://youtu.be/Kj25d00_7wU?si=ESktRVFtWHbJMg7p"}]},
  {name:"高知県", region:"shikoku", videos:[]},
  {name:"福岡県", region:"kyushu", videos:[{title:"歴史もグルメも観光も🌸春の福岡を全部楽しむ２泊３日｜博多｜太宰府天満宮｜柳川", url:"https://youtu.be/C2TpXkXAjKk?si=PDDJfSjhDbDbXUub"}]},
  {name:"佐賀県", region:"kyushu", videos:[]},
  {name:"長崎県", region:"kyushu", videos:[{title:"長崎旅行｜列車でたどる日本の原風景、海辺の駅から棚田と温泉の町をめぐる2泊3日", url:"https://youtu.be/E0ux_as0N-s?si=8pkCGAKBxqnV8_M3"}]},
  {name:"熊本県", region:"kyushu", videos:[]},
  {name:"大分県", region:"kyushu", videos:[{title:"豪華特急列車で行く別府温泉！湯の街で癒される極上の休日｜特急かんぱち｜大分県", url:"https://youtu.be/opxHyplduA4?si=F23XlPBrS_rXZ5Zc"}]},
  {name:"宮崎県", region:"kyushu", videos:[]},
  {name:"鹿児島県", region:"kyushu", videos:[]},
  {name:"沖縄県", region:"kyushu", videos:[
    {title:"最高の沖縄旅行！本島をのんびり巡る、ノスタルジックな2泊3日｜古宇利島｜今帰仁村｜南城市", url:"https://youtu.be/hD2Ty6SL7wQ?si=bYXe2y-8ItSX5753", thumb:""},
    {title:"今帰仁村 - Nakijin Village", url:"https://youtu.be/CgWOFglYz0Y?si=LyaxxOL8DZGNyGH5", thumb:""}
  ]},
];

const CONTINENTS = [
  { key:"asia",    label:"アジア" },
  { key:"europe",  label:"ヨーロッパ" },
  { key:"africa",  label:"アフリカ" },
  { key:"namerica",label:"北アメリカ" },
  { key:"samerica",label:"南アメリカ" },
  { key:"oceania", label:"オセアニア" },
];

//{title:"", url:""}
const countries = [
  {name:"韓国", continent:"asia", videos:[
    {title:"🇰🇷ソウルの可愛い街で見つけた韓牛のおすすめレストラン", url:"https://youtu.be/wirPDYHW1HQ?si=ju47sGW3rjEXKLux", thumb:""},
    {title:"韓国旅行🇰🇷紅葉のソウル人気スポットと韓国グルメ9選｜南大門市場｜聖水洞｜昌徳宮｜ロッテマート", url:"https://youtu.be/2AIcXuzvEuM?si=Pa0c4FkwsMb36oZF", thumb:""},
    {title:"韓国旅行🇰🇷鉄道で巡る東海岸、途中下車の旅。こんな韓国知らなかった｜江原道・江陵", url:"https://youtu.be/U01etibo81o?si=dL5lLVWIJRdT9WXT", thumb:""},
    {title:"韓国ってこんなに楽しい🇰🇷１泊２日で初めてのソウルを遊び尽くす", url:"https://youtu.be/-KGh2TTQqzQ?si=gd4SZc7B0Zqc-z98", thumb:""}
  ]},
  {name:"台湾（特設サイト）", continent:"asia", videos:[], link:"taiwan.html"},
  {name:"マカオ", continent:"asia", videos:[{title:"マカオ旅行🇲🇴香港から日帰りじゃもったいない！２泊３日で観光もカジノも大満喫！", url:"https://youtu.be/QHvSiiuiiQo?si=b97Dzl0CkrQNfyvM"}]},
  {name:"香港", continent:"asia", videos:[
    {title:"【香港グルメ9選】これ食べなきゃ損🇭🇰唯一無二の絶品香港グルメを食べ歩き｜香港旅行", url:"https://youtu.be/nnwoem0eZmY?si=vnSpRzvdHdVWoQbA", thumb:""},
    {title:"香港旅行🇭🇰1泊2日で大満喫！初めての香港は異世界でした…", url:"https://youtu.be/uzCC1Gbu4wo?si=8Q3PyIgwh7B9OKHz", thumb:""}
  ]},
  {name:"中国", continent:"asia", videos:[]},
  {name:"タイ", continent:"asia", videos:[
    {title:"タイ旅行🇹🇭人生で一度は行きたい！タイで最も美しい島、クート島", url:"https://youtu.be/SgFnGfHiTT0?si=gMN7hirD3DJyRvSI", thumb:""},
    {title:"タイ旅行🇹🇭これだけは食べたい！バンコク絶品グルメ6選", url:"https://youtu.be/SzN9Ak-KKag?si=GXoG3Xbin2E6fPho", thumb:""},
    {title:"最強のタイ旅行🇹🇭３泊４日でバンコクを120%楽しむ完全版｜ワットアルン｜カオサン", url:"https://youtu.be/DTLO-113PB0?si=xHS2U-Vz9pTXRxLs", thumb:""}
  ]},
  {name:"ベトナム", continent:"asia", videos:[]},
  {name:"インドネシア", continent:"asia", videos:[]},
  {name:"フィリピン", continent:"asia", videos:[]},
  {name:"マレーシア", continent:"asia", videos:[]},
  {name:"シンガポール", continent:"asia", videos:[{title:"シンガポール観光と絶品グルメを2日間で満喫する旅🇸🇬セントーサ島｜マリーナベイサンズ", url:"https://youtu.be/cu5CIdIVsdc?si=8Tj2ZvYS4XyPv1BE"}]},
  {name:"インド", continent:"asia", videos:[]},
  {name:"ネパール", continent:"asia", videos:[]},
  {name:"ラオス", continent:"asia", videos:[{title:"🇱🇦ラオスVLOG // ヴァンビエン", url:"https://youtu.be/6H-JhC5oZFY?si=kK8BBdT4fOQ456ao"}]},
  {name:"スリランカ", continent:"asia", videos:[{title:"紅茶鉄道で巡るスリランカ絶景旅🇱🇰世界遺産シギリヤロック｜聖地キャンディ｜要塞都市ゴール｜コロンボ", url:"https://youtu.be/oyQrGEdmGeg?si=fsDEeiB-8nft8Jw7"}]},
  {name:"モンゴル", continent:"asia", videos:[]},
  {name:"ウズベキスタン", continent:"asia", videos:[{title:"ウズベキスタン旅行🇺🇿シルクロードを巡る8日間の旅｜青の都サマルカンド｜ヒヴァ｜ブハラ｜タシケント｜中央アジア", url:"https://youtu.be/6dci0QI4oHI?si=1gNSLXr7z3Q7YE20"}]},
  {name:"イギリス", continent:"europe", videos:[]},
  {name:"フランス", continent:"europe", videos:[{title:"フランスの美しい街を巡る、1週間の旅🇫🇷憧れのパリとモンサンミッシェル、魔法のようなロワールの古城｜フランス旅行", url:"https://youtu.be/wuc2pjeAUVM?si=Gqje6p8qNWZ4RMIh"}]},
  {name:"イタリア", continent:"europe", videos:[{title:"最高のイタリア旅行🇮🇹7泊8日で巡るローマ・フィレンツェ・ミラノ・ベネチア", url:"https://youtu.be/m0iGPkIqos0?si=EMkh3E4PDEPQMBnc"}]},
  {name:"ドイツ", continent:"europe", videos:[{title:"最高のドイツ旅行🇩🇪１週間で巡るクリスマスシーズンのヨーロッパ｜ミュンヘン｜ローテンブルク｜ニュルンベルク｜フランクフルト｜プラハ", url:"https://youtu.be/9zG_w-QsdLs?si=KUhYxeT6UF8ryQzn"}]},
  {name:"スペイン", continent:"europe", videos:[{title:"初めてのスペイン旅行🇪🇸マドリードとバスク地方を巡る5日間の美食旅", url:"https://youtu.be/aGO-zLf2mlI?si=rDBxKupAAlbZ_umD"}]},
  {name:"スイス", continent:"europe", videos:[{title:"スイスを巡る８日間、美しい街から湖を渡りアルプスへ｜チューリッヒ｜マッターホルン", url:"https://youtu.be/HHcS7msn2VQ?si=9ZP0WhnE1sDNKBwV"}]},
  {name:"オランダ", continent:"europe", videos:[]},
  {name:"ポルトガル", continent:"europe", videos:[
     {title:"ポルトガル縦断の旅🇵🇹北から南へ、町を辿りながら世界の果てを目指す1週間｜リスボン・ポルト", url:"https://youtu.be/g_tgj4HWYB8?si=u88_htpaTdXjri2n", thumb:""},
     {title:"ポルトガル旅の本編に入りきらなかった未公開シーン集🇵🇹", url:"https://youtu.be/iWTdzLQ9vzI?si=AyJUqkWx0Lict2Uj", thumb:""}
  ]},
  {name:"ギリシャ", continent:"europe", videos:[]},
  {name:"デンマーク", continent:"europe", videos:[{title:"最高の北欧旅行｜７日間で巡るデンマーク・ノルウェー・スウェーデン｜童話の街からフィヨルドへ", url:"https://youtu.be/9q4vaFIf9Pw?si=bCq-9VkHjNJKwmnR"}]},
  {name:"ノルウェー", continent:"europe", videos:[{title:"最高の北欧旅行｜７日間で巡るデンマーク・ノルウェー・スウェーデン｜童話の街からフィヨルドへ", url:"https://youtu.be/9q4vaFIf9Pw?si=bCq-9VkHjNJKwmnR"}]},
  {name:"スウェーデン", continent:"europe", videos:[{title:"最高の北欧旅行｜７日間で巡るデンマーク・ノルウェー・スウェーデン｜童話の街からフィヨルドへ", url:"https://youtu.be/9q4vaFIf9Pw?si=bCq-9VkHjNJKwmnR"}]},
  {name:"オーストリア", continent:"europe", videos:[{title:"街歩きと絶景に癒される中欧4カ国の旅🇦🇹 6泊7日で巡るオーストリア・チェコ・ハンガリー・スロバキア", url:"https://youtu.be/4gBfX7u42Lw?si=OJeEwMOcJKGGPFpo"}]},
  {name:"チェコ", continent:"europe", videos:[{title:"街歩きと絶景に癒される中欧4カ国の旅🇦🇹 6泊7日で巡るオーストリア・チェコ・ハンガリー・スロバキア", url:"https://youtu.be/4gBfX7u42Lw?si=OJeEwMOcJKGGPFpo"}]},
  {name:"ハンガリー", continent:"europe", videos:[{title:"街歩きと絶景に癒される中欧4カ国の旅🇦🇹 6泊7日で巡るオーストリア・チェコ・ハンガリー・スロバキア", url:"https://youtu.be/4gBfX7u42Lw?si=OJeEwMOcJKGGPFpo"}]},
  {name:"スロバキア", continent:"europe", videos:[{title:"街歩きと絶景に癒される中欧4カ国の旅🇦🇹 6泊7日で巡るオーストリア・チェコ・ハンガリー・スロバキア", url:"https://youtu.be/4gBfX7u42Lw?si=OJeEwMOcJKGGPFpo"}]},
  {name:"エジプト", continent:"africa", videos:[]},
  {name:"モロッコ", continent:"africa", videos:[]},
  {name:"南アフリカ", continent:"africa", videos:[]},
  {name:"ケニア", continent:"africa", videos:
    [
    {title:"初めてのアフリカ旅行🇰🇪野生動物に出会えるホテルと人生を変えるサファリ7日間 ｜ケニア", url:"https://youtu.be/lDJ4_PsV03U?si=d9m8DEQxFMBSGFam", thumb:""},
    {title:"アフリカ未公開シーン集/Africa Deleted Scenes", url:"https://youtu.be/MeaJkdn9rDQ?si=_a4F_5qeOSFHddRK", thumb:""}
    ]},
  {name:"タンザニア", continent:"africa", videos:[]},
  {name:"アメリカ", continent:"namerica", videos:[]},
  {name:"カナダ", continent:"namerica", videos:[]},
  {name:"メキシコ", continent:"namerica", videos:[]},
  {name:"ブラジル", continent:"samerica", videos:[]},
  {name:"ペルー", continent:"samerica", videos:[]},
  {name:"アルゼンチン", continent:"samerica", videos:[]},
  {name:"チリ", continent:"samerica", videos:[]},
  {name:"オーストラリア", continent:"oceania", videos:[]},
  {name:"ニュージーランド", continent:"oceania", videos:[]},
  {name:"フィジー", continent:"oceania", videos:[]},
];
