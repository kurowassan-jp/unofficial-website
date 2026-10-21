function hasVideo(item){
  return (item.videos || []).some(v => v.url) || !!item.link;
}

// サムネイル未設定時のプレースホルダー。絵文字やSVGだとスクロール/アニメーション中に
// 一瞬描画されないことがあるため、CSSの図形（円+三角形）だけで作った再生ボタンを使う
const PLACEHOLDER_ICON_SVG =
  '<span class="ph-circle"><span class="ph-triangle"></span></span>';

// 画像を先にすべて読み込み終えてから表示するためのヘルパー
function preloadImages(urls){
  const unique = [...new Set(urls.filter(Boolean))];
  return Promise.all(unique.map(src => new Promise(resolve => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // 読み込みに失敗しても表示自体は止めない
    img.src = src;
  })));
}

/* ---------- YouTube URLからサムネイルを自動生成 ---------- */
function extractYouTubeId(url){
  if(!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for(const p of patterns){
    const m = url.match(p);
    if(m) return m[1];
  }
  return null;
}
function ytThumb(url){
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}
// サムネイル解決：thumbが指定されていればそれを使い、なければYouTubeから自動取得。
// どちらも無ければ空文字を返す（呼び出し側でプレースホルダー表示になる）
function resolveThumb(v){
  return v.thumb || ytThumb(v.url) || "";
}

/* ---------- チャンネル登録者数 ---------- */
function renderSubscribers(){
  const el = document.getElementById("subscriberDisplay");
  if(!el) return;
  const parsed = parseNumberSuffix(channelStats.subscribers);
  if(!parsed){
    el.textContent = channelStats.subscribers || "未入力";
    return;
  }
  el.textContent = formatCount(0, parsed.decimals, parsed.hasComma) + parsed.suffix;
  whenVisible(el, () => {
    animateNumber(el, parsed.value, { decimals: parsed.decimals, suffix: parsed.suffix, hasComma: parsed.hasComma });
  });
}

/* ---------- 投稿動画本数 ---------- */
function renderVideoCount(){
  const el = document.getElementById("videoCountDisplay");
  if(!el) return;
  const parsed = parseNumberSuffix(channelStats.videoCount);
  if(!parsed){
    el.textContent = channelStats.videoCount || "未入力";
    return;
  }
  el.textContent = formatCount(0, parsed.decimals, parsed.hasComma) + parsed.suffix;
  whenVisible(el, () => {
    animateNumber(el, parsed.value, { decimals: parsed.decimals, suffix: parsed.suffix, hasComma: parsed.hasComma });
  });
}

/* ---------- 再生数ランキング TOP3 ---------- */
function renderRanking(){
  const container = document.getElementById("rankingGrid");
  if(!container) return;
  container.innerHTML = "";
  rankingVideos.forEach(v => {
    if(!v.title && !v.url) return;
    const card = document.createElement(v.url ? "a" : "div");
    card.className = "ranking-card";
    if(v.url){ card.href = v.url; card.target = "_blank"; card.rel = "noopener"; }

    const badge = document.createElement("span");
    badge.className = "rank-badge en";
    badge.textContent = v.rank;
    card.appendChild(badge);

    const thumbUrl = resolveThumb(v);
    if(thumbUrl){
      const img = document.createElement("img");
      img.className = "ranking-thumb";
      img.src = thumbUrl;
      img.alt = v.title || "";
      card.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "ranking-thumb ranking-thumb-placeholder";
      ph.innerHTML = PLACEHOLDER_ICON_SVG;
      card.appendChild(ph);
    }

    const title = document.createElement("p");
    title.className = "ranking-title";
    title.textContent = v.title || "（未入力）";
    card.appendChild(title);

    if(v.views){
      const views = document.createElement("p");
      views.className = "ranking-views en";
      views.textContent = v.views;
      card.appendChild(views);
    }
    container.appendChild(card);
  });
}

/* ---------- おすすめ動画カルーセル ---------- */
function renderCarousel(){
  const track = document.getElementById("carTrack");
  if(!track) return;
  const items = recommendedVideos.filter(v => v.url || v.title);
  if(items.length === 0) return;

  // サムネイル画像を先にすべて読み込み終えてから、カルーセル本体を組み立てて表示する
  // （これにより、切り替えアニメーション中に画像の読み込み待ちで一瞬欠けるのを防ぐ）
  const thumbUrls = items.map(v => resolveThumb(v));
  preloadImages(thumbUrls).then(() => buildCarousel());

  function buildSlide(v){
    const slide = document.createElement(v.url ? "a" : "div");
    slide.className = "car-slide";
    if(v.url){ slide.href = v.url; slide.target = "_blank"; slide.rel = "noopener"; }

    const thumbUrl = resolveThumb(v);
    if(thumbUrl){
      const img = document.createElement("img");
      img.className = "car-thumb";
      img.src = thumbUrl;
      img.alt = v.title || "";
      slide.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "car-thumb car-thumb-placeholder";
      ph.innerHTML = PLACEHOLDER_ICON_SVG;
      slide.appendChild(ph);
    }
    const title = document.createElement("p");
    title.className = "car-title";
    title.textContent = v.title || "（未入力）";
    slide.appendChild(title);
    return slide;
  }

  // 従来方式：trackをtransformで動かして表示位置を切り替える
  function buildCarousel(){
    track.innerHTML = "";
    const realCount = items.length;
    // 前後にクローンを1枚ずつ足しておき、端に来ても同じ方向に動き続けたように見せる
    track.appendChild(buildSlide(items[realCount - 1]));
    items.forEach(v => track.appendChild(buildSlide(v)));
    track.appendChild(buildSlide(items[0]));

    const viewport = track.parentElement;
    const prevBtn = document.getElementById("carPrev");
    const nextBtn = document.getElementById("carNext");
    let index = 1; // 1〜realCount が実スライド（0とrealCount+1はクローン）
    let timer = null;
    let animating = false;

    const slides = () => Array.from(track.children);

    function updatePosition(){
      const list = slides();
      if(list.length === 0) return;
      list.forEach((s, i) => s.classList.toggle("active", i === index));
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      let x = 0;
      for(let i = 0; i < index; i++){
        x += list[i].offsetWidth + gap;
      }
      const offset = (viewport.offsetWidth - list[index].offsetWidth) / 2;
      track.style.transform = `translateX(${offset - x}px)`;
    }

    function animateTo(newIndex){
      track.style.transition = "transform .5s ease";
      index = newIndex;
      updatePosition();
    }

    function jumpTo(newIndex){
      track.style.transition = "none";
      index = newIndex;
      updatePosition();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = "transform .5s ease";
        });
      });
    }

    function afterTransition(cb){
      const handler = () => {
        track.removeEventListener("transitionend", handler);
        cb();
      };
      track.addEventListener("transitionend", handler);
    }

    function next(){
      if(animating) return;
      animating = true;
      animateTo(index + 1);
      afterTransition(() => {
        if(index === slides().length - 1){
          jumpTo(1);
        }
        animating = false;
      });
    }
    function prev(){
      if(animating) return;
      animating = true;
      animateTo(index - 1);
      afterTransition(() => {
        if(index === 0){
          jumpTo(slides().length - 2);
        }
        animating = false;
      });
    }
    function restartTimer(){
      if(timer) clearInterval(timer);
      timer = setInterval(next, 3000);
    }

    nextBtn?.addEventListener("click", () => { next(); restartTimer(); });
    prevBtn?.addEventListener("click", () => { prev(); restartTimer(); });
    window.addEventListener("resize", () => jumpTo(index));

    jumpTo(1);
    restartTimer();
  }
}

/* ---------- Instagram 埋め込み ---------- */
function renderInstagram(){
  const container = document.getElementById("igPosts");
  if(!container) return;
  const posts = instagramPosts.filter(p => p.url);
  if(posts.length === 0) return;
  posts.forEach(p => {
    const card = document.createElement("div");
    card.className = "ig-card";
    const bq = document.createElement("blockquote");
    bq.className = "instagram-media";
    bq.setAttribute("data-instgrm-permalink", p.url);
    bq.setAttribute("data-instgrm-version", "14");
    card.appendChild(bq);
    container.appendChild(card);
  });
  (function tryProcess(){
    if(window.instgrm && window.instgrm.Embeds){
      window.instgrm.Embeds.process();
    } else {
      setTimeout(tryProcess, 300);
    }
  })();
}

/* ---------- note ---------- */
function renderNote(){
  const linkEl = document.getElementById("noteLink");
  const descEl = document.getElementById("noteDesc");
  if(linkEl) linkEl.href = notePage.url;
  if(descEl) descEl.textContent = notePage.description;
}

/* ---------- note+ 最近の投稿の埋め込み ---------- */
function extractNoteId(url){
  if(!url) return null;
  const m = url.match(/\/n\/(n[\w]+)/);
  return m ? m[1] : null;
}
function renderNotePosts(){
  const container = document.getElementById("notePosts");
  if(!container) return;
  const posts = (typeof notePosts !== "undefined" ? notePosts : []).filter(p => p.url);
  if(posts.length === 0) return;
  posts.forEach(p => {
    const id = extractNoteId(p.url);
    if(!id) return;
    const iframe = document.createElement("iframe");
    iframe.className = "note-embed";
    iframe.src = `https://note.com/embed/notes/${id}`;
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "143px";
    iframe.style.margin = "0";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "0");
    container.appendChild(iframe);
  });
  if(!document.getElementById("noteEmbedScript")){
    const script = document.createElement("script");
    script.id = "noteEmbedScript";
    script.src = "https://assets.note.com/note-embed.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  }
}

/* ---------- 画面内に入ったら実行する ---------- */
function whenVisible(el, callback){
  if(!el) return;
  if(!("IntersectionObserver" in window)){ callback(); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  observer.observe(el);
}

/* ---------- 数字のカウントアップ演出 ---------- */
function parseNumberSuffix(str){
  const s = String(str || "").trim();
  const m = s.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if(!m) return null;
  const rawNum = m[1];
  const suffix = m[2] || "";
  const hasComma = rawNum.includes(",");
  const decimals = (rawNum.split(".")[1] || "").length;
  const value = parseFloat(rawNum.replace(/,/g, ""));
  if(isNaN(value)) return null;
  return { value, suffix, hasComma, decimals };
}
function formatCount(current, decimals, hasComma){
  const fixed = current.toFixed(decimals);
  if(!hasComma) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withComma = Number(intPart).toLocaleString("en-US");
  return decPart ? `${withComma}.${decPart}` : withComma;
}
function animateNumber(el, target, opts){
  if(!el) return;
  const { decimals = 0, suffix = "", hasComma = false, duration = 1200 } = opts || {};
  if(!isFinite(target)){ el.textContent = "0" + suffix; return; }
  const start = performance.now();
  function frame(now){
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const current = target * eased;
    el.textContent = formatCount(current, decimals, hasComma) + suffix;
    if(t < 1){
      requestAnimationFrame(frame);
    } else {
      el.textContent = formatCount(target, decimals, hasComma) + suffix;
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- 都道府県・国 選択モーダル ---------- */
function openPlaceModal(name, videos){
  const overlay = document.getElementById("modalOverlay");
  if(!overlay) return;
  document.getElementById("modalTitleText").textContent = name;
  const container = document.getElementById("modalVideos");
  container.innerHTML = "";
  videos.forEach((v, i) => {
    const row = document.createElement("div");
    row.className = "modal-video-row";

    const thumbBtn = document.createElement("button");
    thumbBtn.type = "button";
    thumbBtn.className = "modal-thumb-btn";
    thumbBtn.title = "クリックで動画を開く";
    thumbBtn.addEventListener("click", () => window.open(v.url, "_blank", "noopener"));

    const thumbUrl = resolveThumb(v);
    if(thumbUrl){
      const img = document.createElement("img");
      img.className = "modal-thumb";
      img.src = thumbUrl;
      img.alt = v.title || "";
      thumbBtn.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "modal-thumb modal-thumb-placeholder";
      ph.innerHTML = PLACEHOLDER_ICON_SVG;
      thumbBtn.appendChild(ph);
    }

    const titleEl = document.createElement("p");
    titleEl.className = "modal-video-title";
    titleEl.textContent = v.title || `（タイトル未入力・動画${i + 1}）`;

    row.appendChild(thumbBtn);
    row.appendChild(titleEl);
    container.appendChild(row);
  });
  overlay.classList.add("open");
}
function closePlaceModal(){
  const overlay = document.getElementById("modalOverlay");
  if(overlay) overlay.classList.remove("open");
}
function initModal(){
  const overlay = document.getElementById("modalOverlay");
  if(!overlay) return;
  document.getElementById("modalClose")?.addEventListener("click", closePlaceModal);
  overlay.addEventListener("click", (e) => {
    if(e.target === overlay) closePlaceModal();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closePlaceModal();
  });
}

function renderMap(containerId, groups, items, groupField, countLabelFn){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = "";
  groups.forEach(group => {
    const groupItems = items.filter(i => i[groupField] === group.key);
    if(groupItems.length === 0) return;
    const visitedCount = groupItems.filter(hasVideo).length;

    const row = document.createElement("div");
    row.className = "region-row";

    const nameCol = document.createElement("div");
    nameCol.className = "region-name-col";
    const h3 = document.createElement("div");
    h3.className = "region-name";
    h3.textContent = group.label;
    const count = document.createElement("div");
    count.className = "region-count";
    count.textContent = countLabelFn
      ? countLabelFn(visitedCount, groupItems.length, group)
      : `${visitedCount} / ${groupItems.length}`;
    nameCol.appendChild(h3);
    nameCol.appendChild(count);
    row.appendChild(nameCol);

    const list = document.createElement("div");
    list.className = "item-list";
    groupItems.forEach(item => {
      const videos = (item.videos || []).filter(v => v.url);

      const el = document.createElement("button");
      el.type = "button";
      el.textContent = item.name + (videos.length > 1 ? ` (${videos.length})` : "");
      el.className = "item " + (hasVideo(item) ? "visited" : "unvisited");

      if(item.link){
        // 専用ページへのリンクが指定されている場合は、そのページへ直接移動する
        el.addEventListener("click", () => { window.location.href = item.link; });
      } else if(videos.length > 0){
        el.addEventListener("click", () => openPlaceModal(item.name, videos));
      } else {
        el.title = "まだ訪問していません";
      }
      list.appendChild(el);
    });
    row.appendChild(list);
    container.appendChild(row);
  });
}

function updateStats(){
  const prefEl = document.getElementById("statPref");
  if(prefEl){
    const target = prefectures.filter(hasVideo).length;
    whenVisible(prefEl, () => animateNumber(prefEl, target, { decimals: 0 }));
  }
  const contEl = document.getElementById("statContinent");
  if(contEl){
    const visitedContinents = new Set(countries.filter(hasVideo).map(c => c.continent)).size;
    whenVisible(contEl, () => animateNumber(contEl, visitedContinents, { decimals: 0 }));
    document.getElementById("continentTotal").textContent = CONTINENTS.length;
  }
  const japanPageStat = document.getElementById("pageStatJapan");
  if(japanPageStat){
    const target = prefectures.filter(hasVideo).length;
    whenVisible(japanPageStat, () => animateNumber(japanPageStat, target, { decimals: 0 }));
  }
  const worldPageStat = document.getElementById("pageStatWorld");
  if(worldPageStat){
    const target = countries.filter(hasVideo).length;
    whenVisible(worldPageStat, () => animateNumber(worldPageStat, target, { decimals: 0 }));
  }
}

/* ---------- ホーム画面・写真枠（YouTubeのサムネイルを自動で切り替え） ----------
   動画を埋め込むと広告が入ってしまうため、動画の再生ではなくサムネイル画像を表示します。
   data.js の heroVideos の url を使います。 */
function setYouTubeThumb(img, id){
  // 画質の高い順に試し、無い場合は次の候補へ（存在しないと 120px の仮画像が返るためサイズでも判定）
  const names = ["maxresdefault", "hq720", "hqdefault"];
  let i = 0;
  const tryNext = () => {
    if(i >= names.length) return;
    img.src = `https://img.youtube.com/vi/${id}/${names[i++]}.jpg`;
  };
  // 切り替えのたびに上書きする（addEventListener だと古い処理が残り、前の動画の画像に戻ることがあるため）
  img.onload = () => {
    if(img.naturalWidth <= 120 && i < names.length) tryNext();
  };
  img.onerror = tryNext;
  tryNext();
}

// ホームの写真枠：何秒ごとにサムネイルを切り替えるか（data.js の heroSlideSeconds を使う。無ければ7秒）
const HERO_SECONDS = (typeof heroSlideSeconds === "number" && heroSlideSeconds > 0) ? heroSlideSeconds : 7;

function renderHeroMedia(){
  const container = document.getElementById("heroMedia");
  if(!container) return;
  const clips = (typeof heroVideos !== "undefined" ? heroVideos : [])
    .filter(c => extractYouTubeId(c.url));
  if(clips.length === 0) return; // 動画が未設定ならサンプルイラストのまま表示

  // サンプルのSVGイラストを削除し、キャプションを変更
  container.querySelectorAll("svg").forEach(el => el.remove());
  const captionEl = container.querySelector(".photo-caption");
  if(captionEl) captionEl.textContent = "PICK UP";

  // サムネイルを2枚重ねて、クロスフェードで切り替える
  const imgs = [0, 1].map(() => {
    const im = document.createElement("img");
    im.className = "hero-frame";
    im.alt = "旅の記録プレビュー";
    im.decoding = "async";
    container.appendChild(im);
    return im;
  });

  let idx = 0;
  let side = 0;
  setYouTubeThumb(imgs[0], extractYouTubeId(clips[0].url));
  imgs[0].classList.add("active");

  if(clips.length < 2) return;
  function next(){
    setTimeout(() => {
      idx++;
      const nextClip = clips[idx % clips.length];
      const incoming = imgs[1 - side];
      setYouTubeThumb(incoming, extractYouTubeId(nextClip.url));
      imgs[side].classList.remove("active");
      incoming.classList.add("active");
      side = 1 - side;
      next();
    }, HERO_SECONDS * 1000);
  }
  next();
}

/* ---------- ホームの横スクロール文字列 ---------- */
function renderTicker(){
  const track = document.getElementById("tickerTrack");
  if(!track || typeof tickerItems === "undefined") return;
  track.innerHTML = "";
  function buildGroup(){
    const group = document.createElement("div");
    group.className = "ticker-group";
    tickerItems.forEach(item => {
      const el = document.createElement(item.url ? "a" : "span");
      el.className = "pill";
      if(item.url){ el.href = item.url; el.target = "_blank"; el.rel = "noopener"; }
      el.textContent = `${item.icon} ${item.label}`;
      group.appendChild(el);
    });
    return group;
  }
  // 2セット分を隙間なく並べて、片方だけの幅ぶん動かせばシームレスにループする
  track.appendChild(buildGroup());
  track.appendChild(buildGroup());
}

function initTicker(){
  const track = document.getElementById("tickerTrack");
  const pauseBtn = document.getElementById("tickerPause");
  if(!track || !pauseBtn) return;
  let paused = false;
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    track.classList.toggle("paused", paused);
    pauseBtn.textContent = paused ? "▶" : "❚❚";
  });
}

/* ---------- 台湾特集（data.js の taiwanFeature で編集） ---------- */
function renderTaiwanFeature(){
  const card = document.getElementById("featureCard");
  if(!card || typeof taiwanFeature === "undefined") return;
  const f = taiwanFeature;

  // 文字
  if(f.heading) document.getElementById("featureHeading").textContent = f.heading;
  document.getElementById("featureTitle").textContent = f.title || "";
  document.getElementById("featureDesc").textContent = f.description || "";
  document.getElementById("featureCta").textContent = (f.linkLabel || "詳しく見る") + " ↗";

  // クリック先（http で始まるURLは新しいタブ、それ以外はこのタブ）
  const link = f.link || "taiwan.html";
  card.setAttribute("href", link);
  if(/^https?:/i.test(link)){
    card.setAttribute("target", "_blank");
    card.setAttribute("rel", "noopener");
  }

  // 左側：image → 動画サムネイル → 無地の枠＋再生マーク
  const media = document.getElementById("featureMedia");
  const showPlaceholder = () => {
    media.innerHTML = '<div class="feature-ph"><span class="ph-circle"><span class="ph-triangle"></span></span></div>';
  };
  const fitMode = f.fit === "contain" ? "contain" : "cover";

  // 画像（またはサムネイル）を表示する。読み込み結果が出るまで何も出さない（仮の表示が一瞬見えるのを防ぐ）
  const showImage = () => {
    const src = f.image || ytThumb(f.videoUrl);
    if(!src){ showPlaceholder(); return; }
    const img = document.createElement("img");
    img.className = "feature-img";
    img.alt = f.title || "";
    img.style.objectFit = fitMode;
    const ready = () => media.classList.add("ready");
    img.addEventListener("load", ready);
    img.addEventListener("error", () => { img.remove(); showPlaceholder(); }); // 読み込めなければ無地の枠に
    img.src = src;
    media.appendChild(img);
    if(img.complete && img.naturalWidth > 0) ready();
  };

  showImage();
}

/* ---------- 国内・海外ページの画像（data.js の pageImages で差し替え） ---------- */
function renderPageImage(){
  const frame = document.querySelector(".map-frame[data-page]");
  if(!frame || typeof pageImages === "undefined") return;
  const conf = pageImages[frame.dataset.page] || {};
  if(!conf.image) return; // 未設定 → サンプルのイラストのまま

  frame.classList.add("has-photo"); // イラストは隠して、画像の読み込み結果が出るまで何も出さない
  const img = document.createElement("img");
  img.className = "map-photo";
  img.alt = conf.alt || "";
  img.style.objectFit = conf.fit === "contain" ? "contain" : "cover";

  const ready = () => frame.classList.add("photo-ready");
  img.addEventListener("load", ready);
  img.addEventListener("error", () => {
    // 画像が見つからない・読み込めない時は、サンプルのイラストに戻す
    frame.classList.remove("has-photo", "photo-ready");
    img.remove();
  });
  img.src = conf.image;
  frame.appendChild(img);
  if(img.complete && img.naturalWidth > 0) ready(); // キャッシュ済みですぐ表示できる場合
}

document.addEventListener("DOMContentLoaded", () => {
  renderPageImage();
  renderTaiwanFeature();
  renderMap("japanMap", REGIONS, prefectures, "region");
  renderMap("worldMap", CONTINENTS, countries, "continent", (visited, total, group) => {
    const suffix = group && group.key === "asia" ? "ヶ国と地域" : "ヶ国";
    return `${visited}${suffix}`;
  });
  updateStats();
  renderTicker();
  initTicker();
  initModal();
  renderSubscribers();
  renderVideoCount();
  renderHeroMedia();
  renderRanking();
  renderCarousel();
  renderInstagram();
  renderNote();
  renderNotePosts();
});
