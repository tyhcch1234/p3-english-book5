/* ===========================================================
   小三英文溫習網 — app（playful edition）
   吉祥物 Beacon + XP + 星星 + 貼紙 + 互動題目
   =========================================================== */
(function () {
  "use strict";

  var UNITS = window.UNITS || {};
  var ORDER = ["u1", "u2", "u3", "u4", "u5"];
  var REV = window.REVISION;
  var STORE = "p3eng.progress.v2";
  var main = document.getElementById("main");

  /* ---------- storage ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function saveAll(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) {}
  }
  function rec(id) {
    var d = load();
    return Object.assign({ best: 0, total: 0, read: false, tries: 0 }, d[id] || {});
  }
  function put(id, patch) {
    var d = load();
    d[id] = Object.assign({ best: 0, total: 0, read: false, tries: 0 }, d[id] || {}, patch);
    saveAll(d);
  }
  function meta() {
    var d = load();
    return Object.assign({ xp: 0, stickers: [], sound: true }, d.__meta || {});
  }
  function putMeta(p) {
    var d = load();
    d.__meta = Object.assign({ xp: 0, stickers: [], sound: true }, d.__meta || {}, p);
    saveAll(d);
  }
  function addXp(n) {
    var m = meta();
    putMeta({ xp: Math.max(0, (m.xp || 0) + n) });
  }
  function starsFor(best, total) {
    if (!total) return 0;
    var p = best / total;
    return p >= 0.95 ? 3 : p >= 0.8 ? 2 : p >= 0.6 ? 1 : 0;
  }
  function starRow(n, cls) {
    var h = "";
    for (var i = 0; i < 3; i++) h += '<span class="s' + (i < n ? " on" : "") + '">★</span>';
    return '<div class="stars' + (cls ? " " + cls : "") + '" aria-label="' + n + ' 星">' + h + "</div>";
  }

  /* ---------- stickers ---------- */
  var STICKERS = [
    { id: "first", ic: "🐣", nm: "開始了", how: "完成任何一個測驗" },
    { id: "star3", ic: "🌟", nm: "三星高手", how: "任何測驗取得 3 星（95%）" },
    { id: "all5", ic: "🏡", nm: "五單元完成", how: "五個單元測驗都做過" },
    { id: "perfect", ic: "🏆", nm: "總測驗滿分", how: "總測驗 100% 正確" },
    { id: "streak5", ic: "🔥", nm: "連對 5 題", how: "連續答對 5 題" },
    { id: "reader", ic: "📖", nm: "閱讀達人", how: "五個單元筆記都標記讀完" },
    { id: "challenge", ic: "🎲", nm: "挑戰者", how: "完成一次快閃挑戰" },
    { id: "xp300", ic: "⭐", nm: "300 XP", how: "累積 300 XP" }
  ];
  function hasSticker(id) {
    return (meta().stickers || []).indexOf(id) > -1;
  }
  function unlock(id) {
    var m = meta(), list = m.stickers || [];
    if (list.indexOf(id) > -1) return false;
    list.push(id);
    putMeta({ stickers: list });
    var s = STICKERS.filter(function (x) { return x.id === id; })[0];
    if (s) toast("🎉 新貼紙：" + s.ic + " " + s.nm);
    return true;
  }
  function checkXpSticker() {
    if (meta().xp >= 300) unlock("xp300");
  }

  /* ---------- sound ---------- */
  var actx = null;
  function tone(freq, dur, type, delay, vol) {
    if (!meta().sound) return;
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!actx) actx = new Ctx();
      var t0 = actx.currentTime + (delay || 0);
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = type || "triangle";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.16, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    } catch (e) {}
  }
  function sfx(kind) {
    if (kind === "ok") { tone(660, 0.1, "triangle", 0); tone(880, 0.13, "triangle", 0.08); }
    else if (kind === "no") { tone(240, 0.16, "sine", 0); tone(180, 0.2, "sine", 0.1); }
    else if (kind === "click") { tone(520, 0.05, "square", 0, 0.07); }
    else if (kind === "win") {
      [523, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.2, "triangle", i * 0.11, 0.14); });
    }
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[.,!?;:]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function totalQ(d) {
    return d.quiz.reduce(function (n, s) { return n + s.items.length; }, 0);
  }
  function allCount() {
    var t = 0;
    ORDER.forEach(function (k) { t += totalQ(UNITS[k]); });
    if (REV) t += totalQ(REV);
    return t;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("此瀏覽器未能發聲"); return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.84;
      var vs = window.speechSynthesis.getVoices().filter(function (v) { return /en(-|_)(GB|US)/i.test(v.lang); });
      if (vs[0]) u.voice = vs[0];
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  var toastEl = null, toastT = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colors = ["#FF7A6B", "#FFC53D", "#3DC7A0", "#5AB6F0", "#9B7BE8", "#FF93B8"];
    var box = document.createElement("div");
    box.className = "confetti";
    document.body.appendChild(box);
    for (var i = 0; i < 46; i++) {
      var p = document.createElement("i");
      p.style.cssText =
        "position:absolute;width:9px;height:13px;border-radius:2px;opacity:.95;left:" + (Math.random() * 100) +
        "vw;top:-24px;background:" + colors[i % colors.length] + ";transform:rotate(" + (Math.random() * 360) +
        "deg);transition:transform 2.2s ease-in,top 2.2s cubic-bezier(.3,.7,.4,1),opacity 2.4s";
      box.appendChild(p);
      (function (el, delay) {
        setTimeout(function () {
          el.style.top = 60 + Math.random() * 40 + "vh";
          el.style.transform = "rotate(" + (Math.random() * 720 - 360) + "deg) translateX(" + (Math.random() * 90 - 45) + "px)";
          el.style.opacity = "0";
        }, delay);
      })(p, 20 + Math.random() * 320);
    }
    setTimeout(function () { box.remove(); }, 2900);
  }
  function flyText(anchor, text) {
    try {
      var r = anchor.getBoundingClientRect();
      var el = document.createElement("div");
      el.className = "fly";
      el.textContent = text;
      el.style.left = r.left + 4 + "px";
      el.style.top = r.top - 6 + "px";
      document.body.appendChild(el);
      requestAnimationFrame(function () {
        el.style.transform = "translateY(-34px)";
        el.style.opacity = "0";
      });
      setTimeout(function () { el.remove(); }, 950);
    } catch (e) {}
  }

  /* ---------- mascot：Beacon 燈塔 ---------- */
  function mascot(w, mood) {
    var m = mood || "happy";
    var mouth =
      m === "oops"
        ? '<path d="M52 86q8-7 16 0" stroke="#26343B" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
        : m === "cheer"
          ? '<path d="M49 83q11 14 22 0" stroke="#26343B" stroke-width="3.8" fill="none" stroke-linecap="round"/>'
          : '<path d="M51 85q9 10 18 0" stroke="#26343B" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    var eyes = m === "oops"
      ? '<path d="M51 68l6 5M57 68l-6 5" stroke="#26343B" stroke-width="2.8" stroke-linecap="round"/><path d="M63 68l6 5M69 68l-6 5" stroke="#26343B" stroke-width="2.8" stroke-linecap="round"/>'
      : '<circle cx="54" cy="70" r="3.4" fill="#26343B"/><circle cx="66" cy="70" r="3.4" fill="#26343B"/>';
    var armL = '<path d="M39 70q-11 2-14 12" stroke="#26343B" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="24" cy="84" r="4" fill="#FFC53D" stroke="#26343B" stroke-width="2.4"/>';
    var armR = m === "cheer"
      ? '<path d="M81 68q12-8 16-20" stroke="#26343B" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="99" cy="46" r="4.4" fill="#FFC53D" stroke="#26343B" stroke-width="2.4"/>'
      : '<path d="M81 70q11 2 14 12" stroke="#26343B" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="96" cy="84" r="4" fill="#FFC53D" stroke="#26343B" stroke-width="2.4"/>';
    return '<svg class="mascot" viewBox="0 0 120 132" width="' + w + '" height="' + Math.round(w * 1.1) +
      '" role="img" aria-label="燈塔吉祥物 Beacon">' +
      '<ellipse cx="60" cy="103" rx="42" ry="26" fill="#FFF3C9" opacity=".45"/>' +
      '<g opacity=".5" fill="#FFE07A"><path d="M46 40L8 18l4 24z"/><path d="M74 40l38-22-4 24z"/></g>' +
      '<path d="M60 6l22 24H38z" fill="#FF7A6B" stroke="#26343B" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<rect x="40" y="28" width="40" height="20" rx="6" fill="#FFC53D" stroke="#26343B" stroke-width="3.2"/>' +
      '<rect x="46" y="33" width="28" height="11" rx="4" fill="#FFF6D8"/>' +
      '<path d="M38 48h44l-4 58H42z" fill="#FFFFFF" stroke="#26343B" stroke-width="3.4" stroke-linejoin="round"/>' +
      '<path d="M39.4 46h41.2" stroke="#26343B" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M41 94h38l-.7 10H41.7z" fill="#FF7A6B" opacity=".9"/>' +
      eyes +
      '<circle cx="47" cy="79" r="4.2" fill="#FF93B8" opacity=".7"/>' +
      '<circle cx="73" cy="79" r="4.2" fill="#FF93B8" opacity=".7"/>' +
      mouth + armL + armR +
      '<path d="M30 106h60c6 0 10 4 10 9s-4 9-10 9H30c-6 0-10-4-10-9s4-9 10-9z" fill="#B9E05C" stroke="#26343B" stroke-width="3.2"/>' +
      '<circle cx="42" cy="115" r="2.2" fill="#7FA82E"/><circle cx="60" cy="118" r="2.2" fill="#7FA82E"/><circle cx="78" cy="114" r="2.2" fill="#7FA82E"/>' +
      "</svg>";
  }

  /* ---------- coach（浮動提示） ---------- */
  var coachEl = null, coachTimer = null;
  var COACH_TIPS = [
    "答對有 XP 㗎！",
    "唔識就聽下 🔊 發音。",
    "字詞盒可以點字填入空格。",
    "連續答對有 🔥 連對獎勵！",
    "80% 就有兩粒星 ⭐⭐"
  ];
  function coachSay(text, mood) {
    if (!coachEl) {
      coachEl = document.createElement("div");
      coachEl.className = "coach hide";
      document.body.appendChild(coachEl);
    }
    var slot = document.getElementById("coachSlot");
    var small = window.innerWidth <= 760;
    if (slot && small) {
      if (coachEl.parentNode !== slot) slot.appendChild(coachEl);
      coachEl.classList.add("inline");
    } else {
      if (coachEl.parentNode !== document.body) document.body.appendChild(coachEl);
      coachEl.classList.remove("inline");
    }
    coachEl.innerHTML = mascot(62, mood || "happy") +
      '<div class="bubble" role="status">' + esc(text) + "</div>";
    coachEl.classList.remove("hide");
    var b = coachEl.querySelector(".bubble");
    if (b) b.addEventListener("click", function () { coachEl.classList.add("hide"); });
    clearTimeout(coachTimer);
    coachTimer = setTimeout(function () {
      coachEl.classList.add("hide");
    }, 5000);
  }
  function coachHide() { if (coachEl) coachEl.classList.add("hide"); }
  function coachRandom() {
    coachSay(COACH_TIPS[Math.floor(Math.random() * COACH_TIPS.length)], "happy");
  }

  /* ---------- nav ---------- */
  function setNav(key) {
    document.querySelectorAll("#nav a").forEach(function (a) {
      var on = a.getAttribute("data-nav") === key;
      a.classList.toggle("active", on);
      if (on && a.setAttribute) a.setAttribute("aria-current", "page");
      else if (a.removeAttribute) a.removeAttribute("aria-current");
    });
  }
  function navStats() {
    var m = meta();
    var el = document.getElementById("navXp");
    if (el) el.textContent = "⭐ " + (m.xp || 0) + " XP";
  }

  /* ---------- blocks ---------- */
  function blockHTML(b, unit) {
    switch (b.type) {
      case "h4": return "<h4>" + b.x + "</h4>";
      case "p": return "<p>" + b.x + "</p>";
      case "rule": return '<div class="rule">' + b.x + "</div>";
      case "zh": return '<div class="zh">' + b.x + "</div>";
      case "warn": return '<div class="warn">' + b.x + "</div>";
      case "ul":
        return '<ul class="exlist">' + b.x.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
      case "table":
        return '<table class="t"><thead><tr>' +
          b.head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          b.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
          }).join("") +
          "</tbody></table>";
      case "egrid":
        return '<div class="egrid">' +
          '<div class="eg good"><span class="label">✓ Correct</span>' +
          (Array.isArray(b.good) ? b.good.join("<br>") : b.good) + "</div>" +
          '<div class="eg bad"><span class="label">✗ Wrong</span>' +
          (Array.isArray(b.bad) ? b.bad.join("<br>") : b.bad) + "</div></div>";
      case "vocab":
        return '<div class="vocab">' + (unit.vocab || []).map(function (v) {
          return '<div class="vcard" data-flip role="button" tabindex="0" aria-label="' + esc(v.w) + '，點擊揭曉中文">' +
            '<div class="vcard-inner">' +
            '<div class="vface vfront"><span class="w">' + esc(v.w) + '</span><span class="hint">tap 揭曉</span></div>' +
            '<div class="vface vback"><span class="w">' + esc(v.w) + '</span><span class="z">' + esc(v.z) + "</span>" +
            '<button type="button" class="speak" data-say="' + esc(v.w) + '" aria-label="讀出 ' + esc(v.w) + '">' +
            '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/>' +
            '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16.5 8.6a4.8 4.8 0 010 6.8"/></svg>' +
            "</button></div></div></div>";
        }).join("") + "</div>";
      default: return "";
    }
  }

  function bindSpeak(root) {
    root.querySelectorAll("[data-say]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        sfx("click");
        speak(b.getAttribute("data-say"));
      });
    });
    root.querySelectorAll("[data-flip]").forEach(function (c) {
      function flip(e) {
        if (e && e.target && e.target.closest && e.target.closest("[data-say]")) return;
        c.classList.toggle("flipped");
        sfx("click");
      }
      c.addEventListener("click", flip);
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    });
  }

  function setUnitVars(src) {
    if (!main || !main.style || !main.style.setProperty) return;
    main.style.setProperty("--uc", src.color || "#FF7A6B");
    main.style.setProperty("--ucl", src.colorLight || "#FFF0DA");
    main.style.setProperty("--uc-d", src.colorDark || "#C97A1D");
  }

  /* ---------- views ---------- */
  function viewHome() {
    setNav("home");
    coachHide();
    var m = meta();
    var q = allCount();
    var unitCards = ORDER.map(function (k) {
      var u = UNITS[k], r = rec(k), t = totalQ(u);
      var st = starsFor(r.best || 0, t);
      return '<article class="ucard" style="--uc:' + u.color + ";--ucl:" + u.colorLight + ";--uc-d:" + u.colorDark + '">' +
        '<div class="ucard-top"><div class="ucard-emoji">' + u.no + "</div>" +
        '<div><div class="ucard-no">Unit ' + u.no + "</div><h3>" + u.title + '</h3><div class="zh-sub">' + u.titleZh + "</div></div></div>" +
        '<div class="tags">' + u.focus.slice(0, 2).map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div>" +
        starRow(st) +
        '<div class="ucard-foot"><span>' + (r.read ? "✓ 筆記已讀" : "○ 筆記未讀") + "</span><span>" +
        (r.best ? "最佳 " + r.best + "/" + t : t + " 題") + "</span></div>" +
        '<div class="ucard-actions"><a class="btn btn-ghost btn-sm" href="#/notes/' + k + '">看筆記</a>' +
        '<a class="btn btn-primary btn-sm" href="#/quiz/' + k + '">做測驗 →</a></div></article>';
    }).join("");

    main.innerHTML =
      '<section class="hero">' +
      '<div class="clouds"><span class="cloud c1"></span><span class="cloud c2"></span></div>' +
      '<div class="hero-copy">' +
      '<span class="kicker">P3 · First Term</span>' +
      '<h1>同 <span class="hl">Beacon</span> 一齊<br>玩住溫英文！</h1>' +
      '<p class="sub">五個單元、' + q + " 道題目。邊玩邊儲 XP、儲星星、儲貼紙——讀完筆記就去做測驗啦！</p>" +
      '<div class="hero-stats">' +
      '<span class="stat-pill"><i class="ico">★</i> <b>' + (m.xp || 0) + "</b> XP</span>" +
      '<span class="stat-pill"><i class="ico">✦</i> <b>' + (m.stickers || []).length + "</b>/8 貼紙</span>" +
      '<span class="stat-pill"><i class="ico">▤</i> <b>5</b> 個單元</span>' +
      "</div></div>" +
      '<div class="hero-figure">' + '<div class="float">' + mascot(132, "cheer") + "</div>" +
      '<div class="bubble">' + ((m.xp || 0) > 0 ? "仲差 " + Math.max(0, 300 - (m.xp || 0)) + " XP 就儲到 300 XP 貼紙！" : "你好！我係 Beacon，帶你逐個單元玩！") + "</div>" +
      "</div></section>" +

      '<div class="sec-head"><h2><span class="dot"></span>五個單元</h2><p>先讀筆記，再做測驗</p></div>' +
      '<div class="grid">' + unitCards + "</div>" +

      '<div class="sec-head"><h2><span class="dot"></span>快閃挑戰</h2><p>12 題混合抽樣 · 額外 XP</p></div>' +
      '<div class="callout" style="margin-top:0"><div><h3>隨機 12 題，敢唔敢試？</h3>' +
      "<p>由五個單元隨機抽出文法、字詞、閱讀題，每次題目都不同。" +
      (rec("challenge").best ? "上次成績：" + rec("challenge").best + "/12。" : "") + "</p></div>" +
      '<a class="btn btn-accent" href="#/quiz/challenge">開始挑戰 →</a></div>' +

      '<div class="sec-head"><h2><span class="dot"></span>點樣玩</h2><p>四個小提示</p></div>' +
      '<div class="note"><h3><span class="num">1</span>揭卡、填字、聽發音</h3>' +
      '<p class="lead">筆記內的字詞卡可以點擊翻轉看中文；測驗的字詞盒可以點字直接填入空格。</p>' +
      '<ul class="exlist"><li>答對一題 +10 XP，連續答對 5 題有 🔥 貼紙。</li>' +
      "<li>測驗 60% 得 1 星、80% 得 2 星、95% 得 3 星 ⭐⭐⭐</li>" +
      "<li>右上角 🔊 可以開關音效，答題有即時回饋聲。</li>" +
      '<li>進度只存在這部裝置，可在「成績」頁清除。</li></ul>' +
      '<div class="callout"><div><h3>準備好了嗎？</h3><p>由 Unit 1「Where … come from?」開始。</p></div>' +
      '<a class="btn btn-primary" href="#/notes/u1">開始溫習 →</a></div></div>';
  }

  function viewNotes(id) {
    var u = UNITS[id];
    if (!u) return viewHome();
    setNav("notes");
    var r = rec(id);
    var notes = u.notes.map(function (n, i) {
      return '<section class="note"><h3><span class="num">' + (i + 1) + "</span>" + n.h + "</h3>" +
        (n.lead ? '<p class="lead">' + n.lead + "</p>" : "") +
        n.blocks.map(function (b) { return blockHTML(b, u); }).join("") + "</section>";
    }).join("");

    main.innerHTML =
      '<div class="unit-head" style="--uc:' + u.color + ";--ucl:" + u.colorLight + ";--uc-d:" + u.colorDark + '">' +
      '<div class="kicker">Unit ' + u.no + " · Notes</div><h1>" + u.title + "　" + u.titleZh + "</h1>" +
      "<p>" + u.intro + "</p>" +
      '<div class="tags">' + u.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div></div>" +
      '<div class="chips">' + ORDER.map(function (k) {
        var x = UNITS[k];
        return '<a class="chip' + (k === id ? " on" : "") + '" href="#/notes/' + k + '">Unit ' + x.no + "</a>";
      }).join("") + "</div>" +
      '<div class="subnav"><a class="on" href="#/notes/' + id + '">筆記</a><a href="#/quiz/' + id + '">測驗</a></div>' +
      '<div id="coachSlot"></div>' +
      notes +
      '<div class="callout"><div><h3>讀完筆記，試試 ' + totalQ(u) + " 題測驗</h3>" +
      "<p>" + (r.best ? "你的最佳成績：" + r.best + "/" + totalQ(u) + " " + "★".repeat(starsFor(r.best, totalQ(u))) : "包括字詞填充、文法、問答與閱讀理解") + "</p></div>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost" id="markRead">' +
      (r.read ? "✓ 已標記為讀完" : "標記為讀完") + "</button>" +
      '<a class="btn btn-accent" href="#/quiz/' + id + '">開始測驗 →</a></div></div>' +
      '<p class="muted" style="font-size:13px;margin-top:14px">提示：可用瀏覽器「列印」把筆記存成 PDF 溫習。</p>';

    setUnitVars(u);

    var mb = document.getElementById("markRead");
    if (mb) mb.addEventListener("click", function () {
      put(id, { read: true });
      mb.textContent = "✓ 已標記為讀完";
      sfx("ok");
      toast("📖 已記錄：" + u.titleZh + " 筆記讀完");
      if (ORDER.every(function (k) { return rec(k).read; })) unlock("reader");
    });

    bindSpeak(main);
    coachSay("字詞卡點一下就會翻轉，仲可以聽發音！", "happy");
  }

  /* ---------- quiz rendering ---------- */
  function blankHTML(ans, i) {
    var list = Array.isArray(ans) ? ans : [ans];
    var longest = list.reduce(function (a, b) { return String(a).length > String(b).length ? a : b; }, "");
    longest = String(longest || "");
    if (longest.length > 14) {
      return '<input class="blank block" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
        'data-b="' + i + '" aria-label="第 ' + (i + 1) + ' 個空格">';
    }
    var w = Math.min(Math.max(longest.length + 2, 5), 26);
    return '<input class="blank" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
      'style="width:' + w + 'ch" data-b="' + i + '" aria-label="第 ' + (i + 1) + ' 個空格">';
  }

  function renderText(it) {
    var blanks = (it.text.match(/___/g) || []).length;
    if (!blanks) {
      return '<div class="q-text">' + it.text + '</div><div class="q-text" style="margin-top:2px">→ ' +
        blankHTML(it.answers[0], 0) + "</div>";
    }
    var parts = it.text.split("___");
    var html = "";
    for (var i = 0; i < parts.length; i++) {
      html += parts[i];
      if (i < blanks) html += blankHTML(it.answers[i], i);
    }
    return '<div class="q-text">' + html + "</div>";
  }

  function renderChoice(it) {
    var keys = ["A", "B", "C", "D", "E"];
    var slot = it.text.indexOf("___") > -1;
    var body = it.text.replace("___", '<span class="slot" data-slot="1" style="font-weight:800;color:#7E5CD0">＿＿</span>');
    var opts = it.options.map(function (o, i) {
      return '<button type="button" class="opt" data-o="' + i + '"><span class="k">' + keys[i] + "</span>" + esc(o) + "</button>";
    }).join("");
    return '<div class="q-text">' + (slot ? body : esc(it.text)) + "</div>" +
      '<div class="opts" role="group">' + opts + "</div>";
  }

  function renderTF(it) {
    return '<div class="q-text">' + esc(it.text) + "</div>" +
      '<div class="tf"><button type="button" class="opt" data-o="true"><span class="k">T</span>True 對</button>' +
      '<button type="button" class="opt" data-o="false"><span class="k">F</span>False 錯</button></div>';
  }

  function buildChallenge() {
    var pool = [];
    ORDER.forEach(function (k) {
      var u = UNITS[k];
      u.quiz.forEach(function (sec) {
        sec.items.forEach(function (it) { pool.push({ u: k, it: it }); });
      });
    });
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    var cap = {}, picked = [];
    pool.forEach(function (p) {
      if (picked.length >= 12) return;
      if ((cap[p.u] || 0) >= 3) return;
      cap[p.u] = (cap[p.u] || 0) + 1;
      picked.push(p);
    });
    var secs = ORDER.map(function (k) {
      var items = picked.filter(function (p) { return p.u === k; }).map(function (p) { return p.it; });
      if (!items.length) return null;
      var u = UNITS[k];
      return {
        name: "Unit " + u.no + " · " + u.titleZh,
        badge: "Challenge",
        instr: "隨機抽題：填好空格或選出答案。",
        items: items
      };
    }).filter(Boolean);
    return {
      id: "challenge",
      no: 0,
      title: "Quick Challenge",
      titleZh: "快閃挑戰 12 題",
      intro: "由五個單元隨機抽出 12 題，做完即刻有星星同額外 XP。",
      focus: ["隨機 12 題", "額外 XP"],
      color: "#FF7A6B",
      colorLight: "#FFE7E3",
      colorDark: "#E85C4D",
      quiz: secs
    };
  }

  function viewQuiz(id) {
    var data = id === "challenge" ? buildChallenge() : id === "revision" ? REV : UNITS[id];
    if (!data) return viewHome();
    setNav(id === "revision" ? "revision" : id === "challenge" ? "quiz" : "quiz");

    var total = totalQ(data);
    var qno = 0;
    var sections = data.quiz.map(function (sec, si) {
      var items = sec.items.map(function (it, qi) {
        qno++;
        var inner = it.mode === "tf" ? renderTF(it) : it.mode === "choice" ? renderChoice(it) : renderText(it);
        return '<div class="q" data-q="' + si + "-" + qi + '"><div class="q-row"><div class="q-no">' + qno + "</div>" +
          '<div class="q-body">' + inner + '<div class="fb"></div></div></div></div>';
      }).join("");

      var extra = "";
      if (sec.passage) {
        extra += '<div class="note" style="margin:0 0 16px;box-shadow:none;background:#FFFDF7">' +
          '<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap">' +
          '<h4 style="margin:0;font-size:16px">' + esc(sec.passage.title) + "</h4>" +
          '<button class="btn btn-ghost btn-sm" data-read="1">🔊 朗讀文章</button></div>' +
          '<p style="margin:10px 0 0;font-size:15.5px;line-height:1.9" data-passage="' + esc(sec.passage.text) + '">' +
          esc(sec.passage.text) + "</p></div>";
      }
      if (sec.table) {
        extra += '<table class="t"><thead><tr>' + sec.table.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
          "</tr></thead><tbody>" + sec.table.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
          }).join("") + "</tbody></table>";
      }
      if (sec.bank) {
        extra += '<div class="bank" data-bank="' + si + '"><span class="lbl">Word box</span>' +
          sec.bank.map(function (w) {
            return '<button type="button" class="wchip" data-w="' + esc(w) + '">' + esc(w) + "</button>";
          }).join("") + "</div>";
      }

      return '<section class="qsec" data-si="' + si + '"><div class="qsec-head"><h2>' + sec.name + "</h2>" +
        '<span class="badge">' + sec.badge + "</span></div>" +
        '<p class="instr">' + sec.instr + "</p>" + extra + items +
        '<div class="qsec-foot"><button class="btn btn-primary" data-check="' + si + '">檢查本部分</button></div></section>';
    }).join("");

    var headTitle = id === "revision" ? "總測驗" : id === "challenge" ? "快閃挑戰" : data.title + "　" + data.titleZh;
    main.innerHTML =
      '<div class="unit-head" style="--uc:' + data.color + ";--ucl:" + data.colorLight + ";--uc-d:" + data.colorDark + '">' +
      '<div class="kicker">' + (id === "revision" ? "Mixed Revision" : id === "challenge" ? "Quick Challenge" : "Unit " + data.no + " · Quiz") + "</div>" +
      "<h1>" + headTitle + "</h1><p>" + data.intro + "</p>" +
      '<div class="tags">' + data.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div></div>" +
      '<div class="chips">' + ORDER.map(function (k) {
        var x = UNITS[k];
        return '<a class="chip' + (k === id ? " on" : "") + '" href="#/quiz/' + k + '">Unit ' + x.no + "</a>";
      }).join("") + '<a class="chip' + (id === "revision" ? " on" : "") + '" href="#/quiz/revision">總測驗</a>' +
      '<button type="button" class="chip" id="challengeBtn">快閃挑戰</button></div>' +
      '<div id="coachSlot"></div>' +
      '<div class="quizbar"><div class="quizbar-inner"><span class="title">進度</span>' +
      '<span class="count" id="qcount">0 / ' + total + " 題已檢查</span>" +
      '<div class="qprog"><i id="qbar"></i></div>' +
      '<span class="pill xp"><i class="ico">★</i> <b id="xpv">0</b> XP</span>' +
      '<span class="pill streak">連對 <b id="streakv">0</b></span></div></div>' +
      sections + '<div id="result"></div>';

    setUnitVars(data);

    var cb = document.getElementById("challengeBtn");
    if (cb) cb.addEventListener("click", function () { location.hash = "#/quiz/challenge"; });

    /* -------- state -------- */
    var answered = {};
    var selected = {};
    var checkedSections = {};
    var streak = 0, xpEarn = 0;

    function paintPills() {
      var a = document.getElementById("xpv"), b = document.getElementById("streakv");
      if (a) a.textContent = xpEarn;
      if (b) b.textContent = streak;
    }

    main.querySelectorAll("[data-read]").forEach(function (b) {
      b.addEventListener("click", function () {
        var box = b.closest(".note").querySelector("[data-passage]");
        speak(box.getAttribute("data-passage"));
      });
    });

    main.querySelectorAll(".qsec").forEach(function (secEl) {
      var si = +secEl.getAttribute("data-si");
      var sec = data.quiz[si];
      var lastInput = null;

      secEl.querySelectorAll(".q").forEach(function (qEl) {
        var key = qEl.getAttribute("data-q");
        var it = sec.items[+key.split("-")[1]];

        if (it.mode === "choice" || it.mode === "tf") {
          var slotEl = qEl.querySelector("[data-slot]");
          qEl.querySelectorAll(".opt").forEach(function (btn) {
            btn.addEventListener("click", function () {
              if (answered[key]) return;
              qEl.querySelectorAll(".opt").forEach(function (b) { b.classList.remove("sel"); });
              btn.classList.add("sel");
              var raw = btn.getAttribute("data-o");
              selected[key] = it.mode === "tf" ? raw === "true" : +raw;
              if (slotEl) slotEl.textContent = it.mode === "tf" ? (selected[key] ? "True" : "False") : it.options[+raw];
              sfx("click");
            });
          });
        }

        var inputs = qEl.querySelectorAll("input.blank");
        inputs.forEach(function (inp, i) {
          inp.addEventListener("focus", function () { lastInput = inp; });
          inp.addEventListener("input", function () {
            inp.classList.remove("no", "ok");
            syncChips(secEl);
          });
          inp.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              var next = inputs[i + 1];
              if (next) next.focus();
              else {
                var btn = secEl.querySelector("[data-check]");
                if (btn) btn.click();
              }
            }
          });
        });
        var first = qEl.querySelector("input.blank");
        if (first) first.addEventListener("focus", function () { lastInput = first; });
      });

      /* word chips → fill blank */
      function syncChips(secEl) {
        var vals = [];
        secEl.querySelectorAll("input.blank").forEach(function (i) { vals.push(norm(i.value)); });
        secEl.querySelectorAll(".wchip").forEach(function (c) {
          var on = vals.indexOf(norm(c.getAttribute("data-w"))) > -1;
          if (on) c.classList.add("used"); else c.classList.remove("used");
        });
      }
      secEl.querySelectorAll(".wchip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (chip.disabled) return;
          var target = lastInput;
          if (target && (target.readOnly || target.value.trim())) {
            /* 若最後聚焦的格已填，找下一個空格 */
            var all = [].slice.call(secEl.querySelectorAll("input.blank"));
            var nextEmpty = all.filter(function (i) { return !i.readOnly && !i.value.trim(); })[0];
            if (nextEmpty) target = nextEmpty;
          }
          if (!target) {
            var all2 = [].slice.call(secEl.querySelectorAll("input.blank"));
            target = all2.filter(function (i) { return !i.readOnly && !i.value.trim(); })[0] || all2[0];
          }
          if (!target || target.readOnly) return;
          target.value = chip.getAttribute("data-w");
          target.classList.remove("no", "ok");
          lastInput = target;
          sfx("click");
          flyText(chip, "+" + chip.getAttribute("data-w"));
          syncChips(secEl);
          var all3 = [].slice.call(secEl.querySelectorAll("input.blank"));
          var idx = all3.indexOf(target);
          if (all3[idx + 1] && !all3[idx + 1].value.trim()) all3[idx + 1].focus();
        });
      });
    });

    main.querySelectorAll("[data-say]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.stopPropagation(); speak(b.getAttribute("data-say")); });
    });

    function markProgress() {
      var n = Object.keys(answered).length;
      var c = document.getElementById("qcount");
      if (c) c.textContent = n + " / " + total + " 題已檢查";
      var b = document.getElementById("qbar");
      if (b) b.style.width = total ? Math.round((n / total) * 100) + "%" : "0%";
    }

    function checkOne(secEl, it, qEl) {
      var key = qEl.getAttribute("data-q");
      var fb = qEl.querySelector(".fb");
      var ok = false, correctText = "";

      if (it.mode === "choice" || it.mode === "tf") {
        if (!(key in selected)) {
          fb.className = "fb show no";
          fb.innerHTML = "先選一個答案啦 👆";
          return null;
        }
        ok = selected[key] === it.answer;
        qEl.querySelectorAll(".opt").forEach(function (b) {
          var raw = b.getAttribute("data-o");
          var v = it.mode === "tf" ? raw === "true" : +raw;
          if (v === it.answer) b.classList.add("ok");
          else if (b.classList.contains("sel")) b.classList.add("no");
          b.classList.remove("sel");
        });
        correctText = it.mode === "choice" ? it.options[it.answer] : it.answer ? "True 對" : "False 錯";
      } else {
        var inputs = qEl.querySelectorAll("input.blank");
        var hasBlank = (it.text.match(/___/g) || []).length > 0;
        var allOk = true, anyFilled = false;
        inputs.forEach(function (inp, i) {
          var val = inp.value.trim();
          if (val) anyFilled = true;
          var list = hasBlank
            ? (Array.isArray(it.answers[i]) ? it.answers[i] : [it.answers[i]])
            : it.answers;
          var good = list.some(function (c) { return norm(c) === norm(val); });
          inp.classList.remove("ok", "no");
          inp.classList.add(good ? "ok" : "no");
          inp.readOnly = true;
          if (good) {
            if (window.matchMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              inp.style.transition = "background .2s";
            }
          } else {
            allOk = false;
            inp.value = val || "—";
          }
        });
        if (!anyFilled) {
          qEl.querySelectorAll("input.blank").forEach(function (i) { i.classList.remove("ok", "no"); i.readOnly = false; });
          fb.className = "fb show no";
          fb.innerHTML = "未填答案喎，試下先 ✍️";
          return null;
        }
        ok = allOk;
        correctText = hasBlank
          ? it.answers.map(function (a) { return Array.isArray(a) ? a[0] : a; }).join(" ｜ ")
          : it.answers[0];
      }

      answered[key] = { ok: ok };
      qEl.classList.add(ok ? "done" : "miss");

      if (ok) {
        streak++;
        xpEarn += 10;
        addXp(10);
        sfx("ok");
        flyText(qEl.querySelector(".q-no"), "+10 XP");
        if (streak > 0 && streak % 5 === 0) {
          unlock("streak5");
          toast("🔥 連對 " + streak + " 題！");
          confetti();
        }
      } else {
        streak = 0;
        sfx("no");
      }
      paintPills();

      fb.className = "fb show " + (ok ? "ok" : "no");
      fb.innerHTML = (ok ? "✓ 正確！+10 XP" : '✗ 正確答案：<span class="ans">' + esc(correctText) + "</span>") +
        '<span class="why">' + (it.exp || "") + "</span>";
      return ok;
    }

    main.querySelectorAll("[data-check]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var si = +btn.getAttribute("data-check");
        var sec = data.quiz[si];
        var secEl = main.querySelector('.qsec[data-si="' + si + '"]');
        var okCount = 0, checked = 0;

        secEl.querySelectorAll(".q").forEach(function (qEl) {
          var key = qEl.getAttribute("data-q");
          if (answered[key]) { checked++; if (answered[key].ok) okCount++; return; }
          var it = sec.items[+key.split("-")[1]];
          var res = checkOne(secEl, it, qEl);
          if (res !== null) { checked++; if (res) okCount++; }
        });

        if (!checked) { toast("先作答再檢查啦"); return; }
        btn.disabled = true;
        btn.textContent = "已檢查 " + okCount + "/" + sec.items.length;
        checkedSections[si] = true;
        secEl.querySelectorAll("input.blank").forEach(function (i) { i.readOnly = true; });
        secEl.querySelectorAll(".wchip").forEach(function (c) { c.disabled = true; });
        markProgress();
        syncAllChips();

        var allDone = data.quiz.every(function (_, i) { return checkedSections[i]; });
        if (allDone) finish();
        else {
          var first = secEl.nextElementSibling;
          if (first && first.scrollIntoView) {
            try { first.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
          }
        }
      });
    });

    function syncAllChips() {
      main.querySelectorAll(".qsec").forEach(function (secEl) {
        var vals = [];
        secEl.querySelectorAll("input.blank").forEach(function (i) { vals.push(norm(i.value)); });
        secEl.querySelectorAll(".wchip").forEach(function (c) {
          if (vals.indexOf(norm(c.getAttribute("data-w"))) > -1) c.classList.add("used");
        });
      });
    }

    function finish() {
      var right = 0;
      Object.keys(answered).forEach(function (k) { if (answered[k].ok) right++; });
      var pct = total ? right / total : 0;
      var pctRound = Math.round(pct * 100);
      var st = starsFor(right, total);
      var prev = rec(id);
      var best = Math.max(prev.best || 0, right);
      put(id, { best: best, total: total, tries: (prev.tries || 0) + 1, read: prev.read });

      var bonus = (pct >= 0.6 ? 10 : 0) + (pct >= 0.8 ? 10 : 0) + (pct >= 0.95 ? 10 : 0);
      if (bonus) { addXp(bonus); xpEarn += bonus; }
      paintPills();
      unlock("first");
      if (st === 3) unlock("star3");
      if (id === "challenge") unlock("challenge");
      if (id === "revision" && right === total) unlock("perfect");
      if (ORDER.every(function (k) { return (rec(k).best || 0) > 0; })) unlock("all5");
      checkXpSticker();

      var msg = pctRound >= 95 ? "勁！三星到手，可以去挑戰總測驗。"
        : pctRound >= 80 ? "做得好！再檢查錯的那幾題就滿分。"
          : pctRound >= 60 ? "合格！紅色「常見錯誤」框再讀一次。"
            : "唔緊要，先重讀筆記再嚟一次。";
      var ringColor = st === 3 ? "#25A583" : st === 2 ? "#E9A81C" : st === 1 ? "#FF7A6B" : "#9AA6AC";
      var dash = 2 * Math.PI * 62;
      var off = dash * (1 - (total ? right / total : 0));

      document.getElementById("result").innerHTML =
        '<section class="qsec result"><div class="ring"><svg width="150" height="150" viewBox="0 0 150 150">' +
        '<circle cx="75" cy="75" r="62" fill="none" stroke="#EFE4D3" stroke-width="14"/>' +
        '<circle cx="75" cy="75" r="62" fill="none" stroke="' + ringColor +
        '" stroke-width="14" stroke-linecap="round" stroke-dasharray="' + dash + '" stroke-dashoffset="' + off + '"/></svg>' +
        '<div class="val">' + pctRound + "%</div></div>" +
        '<div class="starline">' + [0, 1, 2].map(function (i) {
          return '<span class="' + (i < st ? "on" : "off") + '">★</span>';
        }).join("") + "</div>" +
        "<h2>" + right + " / " + total + " 題正確</h2><p>" + msg + "</p>" +
        '<div class="hero-stats" style="justify-content:center">' +
        '<span class="stat-pill"><i class="ico">★</i> +' + xpEarn + " XP</span>" +
        '<span class="stat-pill"><i class="ico">✦</i> ' + (meta().stickers || []).length + "/8 貼紙</span></div>" +
        '<div class="breakdown">' + data.quiz.map(function (s, i) {
          var ok = 0;
          s.items.forEach(function (_, j) {
            var k = i + "-" + j;
            if (answered[k] && answered[k].ok) ok++;
          });
          return '<div class="bd"><div class="n">' + s.name + '</div><div class="v">' + ok + " <small>/ " + s.items.length + "</small></div></div>";
        }).join("") + "</div>" +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">' +
        '<button class="btn btn-primary" onclick="window.__retry()">' + (id === "challenge" ? "再抽 12 題" : "再做一次") + "</button>" +
        '<a class="btn btn-ghost" href="#/notes/' + (id === "revision" || id === "challenge" ? "u1" : id) + '">重讀筆記</a>' +
        (id !== "revision" ? '<a class="btn btn-ghost" href="#/quiz/revision">總測驗</a>' : "") +
        '<a class="btn btn-ghost" href="#/progress">我的成績</a>' +
        '<a class="btn btn-ghost" href="#/">回總覽</a></div></section>';

      var resEl = document.getElementById("result");
      if (resEl && resEl.scrollIntoView) {
        try { resEl.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
      }
      if (st >= 2) { confetti(); sfx("win"); coachSay("叻仔！" + st + " 星 ⭐ 繼續挑戰下一個單元！", "cheer"); }
      else coachSay("答錯唔緊要，睇下正確答案，再做一次就得！", "oops");
      navStats();
    }

    window.__retry = function () {
      viewQuiz(id);
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    };

    paintPills();
    if (id === "challenge") coachSay("12 題隨機抽！答對有雙倍機會儲貼紙 🎲", "cheer");
    else coachSay("慢慢做，唔肯定可以聽 🔊 或者點字詞盒。", "happy");
  }

  function viewProgress() {
    setNav("progress");
    coachHide();
    var m = meta();
    var rows = ORDER.map(function (k) {
      var u = UNITS[k], r = rec(k), t = totalQ(u);
      var pct = r.best ? Math.round((r.best / t) * 100) : 0;
      return '<div class="bar-row"><span>Unit ' + u.no + " " + starRow(starsFor(r.best || 0, t)) + "</span>" +
        '<span class="tr"><i style="width:' + pct + "%;--bc:" + u.color + '"></i></span>' +
        '<span class="pc">' + (r.best || 0) + "/" + t + "</span></div>";
    }).join("");
    var rv = rec("revision"), rvT = REV ? totalQ(REV) : 0;
    var ch = rec("challenge");
    var doneUnits = ORDER.filter(function (k) { return (rec(k).best || 0) > 0; }).length;
    var totalBest = ORDER.reduce(function (n, k) { return n + (rec(k).best || 0); }, 0);
    var totalAll = ORDER.reduce(function (n, k) { return n + totalQ(UNITS[k]); }, 0);
    var stars = ORDER.reduce(function (n, k) { return n + starsFor(rec(k).best || 0, totalQ(UNITS[k])); }, 0) +
      starsFor(rv.best || 0, rvT);

    var stickerGrid = STICKERS.map(function (s) {
      var on = hasSticker(s.id);
      return '<div class="sticker' + (on ? "" : " locked") + '" title="' + esc(s.how) + '">' +
        (on ? '<span class="tickmark">✓</span>' : "") +
        '<div class="ic">' + s.ic + '</div><div class="nm">' + s.nm + "</div>" +
        '<div class="nm" style="font-weight:600;font-size:11px;color:#8A7E70">' + (on ? "已解鎖" : esc(s.how)) + "</div></div>";
    }).join("");

    var recent = ORDER.map(function (k) {
      var r = rec(k);
      return r.tries ? "Unit " + UNITS[k].no + " 做過 " + r.tries + " 次" : "";
    }).filter(Boolean).join(" · ");

    main.innerHTML =
      '<div class="sec-head"><h2><span class="dot"></span>我的成績</h2><p>紀錄只保存在這部裝置</p></div>' +
      '<div class="statgrid">' +
      '<div class="stat"><div class="n">總 XP</div><div class="v">⭐ ' + (m.xp || 0) + "</div></div>" +
      '<div class="stat"><div class="n">星星</div><div class="v">' + stars + " <small>/ 18</small></div></div>" +
      '<div class="stat"><div class="n">完成單元</div><div class="v">' + doneUnits + " <small>/ 5</small></div></div>" +
      '<div class="stat"><div class="n">貼紙</div><div class="v">' + (m.stickers || []).length + " <small>/ 8</small></div></div>" +
      "</div>" +
      '<div class="bars">' + rows +
      '<div class="bar-row" style="border-top:2px dashed #EFE4D3;margin-top:8px;padding-top:14px"><span>總測驗 ' +
      starRow(starsFor(rv.best || 0, rvT)) + "</span>" +
      '<span class="tr"><i style="width:' + (rv.best ? Math.round((rv.best / rvT) * 100) : 0) + '%;--bc:#2FB98C"></i></span>' +
      '<span class="pc">' + (rv.best || 0) + "/" + rvT + "</span></div>" +
      '<div class="bar-row"><span>快閃挑戰</span>' +
      '<span class="tr"><i style="width:' + (ch.best ? Math.round((ch.best / 12) * 100) : 0) + '%;--bc:#FF7A6B"></i></span>' +
      '<span class="pc">' + (ch.best || 0) + "/12</span></div></div>" +
      (recent ? '<p class="muted" style="font-size:13px;margin-top:12px">練習紀錄：' + recent + "</p>" : "") +
      '<div class="sec-head"><h2><span class="dot"></span>貼紙簿</h2><p>解鎖 ' + (m.stickers || []).length + "/8</p></div>" +
      '<div class="stickers">' + stickerGrid + "</div>" +
      '<div class="callout"><div><h3>想重新開始？</h3><p>清除紀錄後分數、XP 和貼紙會歸零，筆記和題目不受影響。</p></div>' +
      '<button class="btn btn-ghost" id="reset">清除學習紀錄</button></div>';

    var rs = document.getElementById("reset");
    if (rs) rs.addEventListener("click", function () {
      if (confirm("確定清除所有成績、XP 和貼紙？")) {
        try { localStorage.removeItem(STORE); } catch (e) {}
        navStats();
        viewProgress();
        toast("已清除，由零開始！");
      }
    });
  }

  /* ---------- router ---------- */
  function route() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var p = h.split("/");
    try { window.scrollTo({ top: 0 }); } catch (e) {}
    if (p[0] === "notes" && UNITS[p[1]]) return viewNotes(p[1]);
    if (p[0] === "quiz") {
      if (p[1] === "challenge") return viewQuiz("challenge");
      if (p[1] === "revision") return viewQuiz("revision");
      return viewQuiz(UNITS[p[1]] ? p[1] : "u1");
    }
    if (p[0] === "revision") return viewQuiz("revision");
    if (p[0] === "progress") return viewProgress();
    return viewHome();
  }

  /* ---------- sound toggle ---------- */
  function wireSound() {
    var btn = document.getElementById("soundBtn");
    if (!btn) return;
    function paint() {
      var on = meta().sound !== false;
      btn.classList.toggle("off", !on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "關閉音效" : "開啟音效");
      btn.setAttribute("title", on ? "音效開：點擊關閉" : "音效關：點擊開啟");
    }
    btn.addEventListener("click", function () {
      var on = meta().sound !== false;
      putMeta({ sound: !on });
      paint();
      if (!on) sfx("click");
      toast(!on ? "🔊 音效已開" : "🔇 音效已關");
    });
    paint();
  }

  window.addEventListener("hashchange", route);
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  wireSound();
  navStats();
  route();
})();
