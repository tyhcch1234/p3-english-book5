/* ===========================================================
   小三英文溫習網 — app
   =========================================================== */
(function () {
  "use strict";

  var UNITS = window.UNITS || {};
  var ORDER = ["u1", "u2", "u3", "u4", "u5"];
  var REV = window.REVISION;
  var STORE = "p3eng.progress.v1";
  var main = document.getElementById("main");

  /* ---------- storage ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; }
    catch (e) { return {}; }
  }
  function save(obj) {
    try { localStorage.setItem(STORE, JSON.stringify(obj)); } catch (e) {}
  }
  function rec(id) {
    var d = load();
    return d[id] || { best: 0, total: 0, read: false, tries: 0 };
  }
  function put(id, patch) {
    var d = load();
    d[id] = Object.assign({ best: 0, total: 0, read: false, tries: 0 }, d[id] || {}, patch);
    save(d);
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
  function counts() {
    var t = 0;
    ORDER.forEach(function (k) { t += totalQ(UNITS[k]); });
    if (REV) t += totalQ(REV);
    return t;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.86;
    var vs = window.speechSynthesis.getVoices().filter(function (v) { return /en(-|_)(GB|US)/i.test(v.lang); });
    if (vs[0]) u.voice = vs[0];
    window.speechSynthesis.speak(u);
  }
  function confetti() {
    var colors = ["#1F6F6B", "#E08A3C", "#FFC563", "#AC4F68", "#655BA6", "#3F7D5A"];
    var box = document.createElement("div");
    box.className = "confetti";
    document.body.appendChild(box);
    for (var i = 0; i < 70; i++) {
      var p = document.createElement("i");
      p.style.cssText =
        "position:absolute;width:8px;height:12px;border-radius:2px;opacity:.9;" +
        "left:" + Math.random() * 100 + "vw;top:-20px;background:" + colors[i % colors.length] +
        ";transform:rotate(" + Math.random() * 360 + "deg);transition:transform 1.9s ease-in,top 1.9s cubic-bezier(.3,.7,.4,1),opacity 2s";
      box.appendChild(p);
      (function (el, delay) {
        setTimeout(function () {
          el.style.top = (65 + Math.random() * 35) + "vh";
          el.style.transform = "rotate(" + (Math.random() * 720 - 360) + "deg) translateX(" + (Math.random() * 80 - 40) + "px)";
          el.style.opacity = "0";
        }, delay);
      })(p, 30 + Math.random() * 300);
    }
    setTimeout(function () { box.remove(); }, 2600);
  }

  /* ---------- nav ---------- */
  function setNav(key) {
    document.querySelectorAll("#nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === key);
    });
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
          return '<div class="vitem"><span><span class="w">' + esc(v.w) + '</span><span class="z">' + v.z + "</span></span>" +
            '<button class="speak" data-say="' + esc(v.w) + '" aria-label="讀出 ' + esc(v.w) + '">' +
            '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16.5 8.6a4.8 4.8 0 010 6.8"/></svg></button></div>';
        }).join("") + "</div>";
      default: return "";
    }
  }

  /* ---------- views ---------- */
  function viewHome() {
    setNav("home");
    var q = counts();
    var cards = ORDER.map(function (k) {
      var u = UNITS[k], r = rec(k), t = totalQ(u);
      var pct = r.best ? Math.round((r.best / t) * 100) : 0;
      return '<article class="ucard" style="--uc:' + u.color + ";--ucl:" + u.colorLight + '">' +
        '<div class="ucard-top"><div class="ucard-emoji">' + u.no + "</div>" +
        '<div><div class="ucard-no">Unit ' + u.no + "</div><h3>" + u.title + '</h3><div class="zh-sub">' + u.titleZh + "</div></div></div>" +
        '<div class="tags">' + u.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div>" +
        '<div class="progressbar"><i style="width:' + pct + '%"></i></div>' +
        '<div class="ucard-foot"><span>' + (r.read ? "筆記已讀" : "筆記未讀") + "</span><span>" +
        (r.best ? "最佳 " + r.best + "/" + t : t + " 題") + "</span></div>" +
        '<div class="ucard-actions"><a class="btn btn-ghost btn-sm" href="#/notes/' + k + '">看筆記</a>' +
        '<a class="btn btn-primary btn-sm" href="#/quiz/' + k + '">做測驗</a></div></article>';
    }).join("");

    main.innerHTML =
      '<section class="hero"><h1>小三英文 · 上學期溫習</h1>' +
      '<p class="sub">按 <b>Lighthouse for Hong Kong Book 5</b> 五個單元整理：先讀筆記，再做測驗。<br>題型包括字詞填充、文法改錯、句子合併、看資料問答與<b>閱讀理解</b>。</p>' +
      '<div class="hero-stats"><div><strong>5</strong><span>個單元</span></div>' +
      "<div><strong>" + q + "</strong><span>道題目</span></div>" +
      "<div><strong>2</strong><span>種模式：筆記 + 測驗</span></div></div></section>" +
      '<div class="sec-head"><h2>五個單元</h2><p>點「看筆記」先學，再點「做測驗」練習</p></div>' +
      '<div class="grid">' + cards + "</div>" +
      '<div class="sec-head"><h2>溫習建議</h2><p>每次 15 分鐘，先後有序</p></div>' +
      '<div class="note"><h3><span class="num">1</span>先讀筆記，再做測驗</h3>' +
      '<p class="lead">筆記載有文法規則、正確與錯誤對照、中文解說和單元字詞。</p>' +
      '<ul class="exlist"><li>讀筆記時，把<b>紅色「常見錯誤」</b>框多看一次，那是考試最易失分的位置。</li>' +
      "<li>做測驗時先自己想答案，按「檢查」看解釋；不肯定便按 🔊 聽發音。</li>" +
      "<li>每單元做完後，到「成績」頁看哪一類題目最弱，再回去讀該段筆記。</li>" +
      "<li>五個單元都完成後，做「總測驗」混合練習，特別是閱讀理解。</li></ul>" +
      '<div class="callout"><div><h3>準備好了嗎？</h3><p>由 Unit 1「Where … come from?」開始。</p></div>' +
      '<a class="btn btn-accent" href="#/notes/u1">開始溫習 →</a></div></div>';
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
      '<div class="unit-head" style="--uc:' + u.color + '">' +
      '<div class="kicker">Unit ' + u.no + " · Notes</div><h1>" + u.title + "　" + u.titleZh + "</h1>" +
      "<p>" + u.intro + "</p>" +
      '<div class="tags">' + u.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div></div>" +
      '<div class="chips">' + ORDER.map(function (k) {
        var x = UNITS[k];
        return '<a class="chip' + (k === id ? " on" : "") + '" href="#/notes/' + k + '">Unit ' + x.no + "</a>";
      }).join("") + "</div>" +
      '<div class="subnav"><a class="on" href="#/notes/' + id + '">筆記</a><a href="#/quiz/' + id + '">測驗</a></div>' +
      notes +
      '<div class="callout"><div><h3>讀完筆記，試試 ' + totalQ(u) + " 題測驗</h3>" +
      "<p>" + (r.best ? "你的最佳成績：" + r.best + "/" + totalQ(u) : "包括字詞填充、文法、問答與閱讀理解") + "</p></div>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost" id="markRead">' +
      (r.read ? "✓ 已標記為讀完" : "標記為讀完") + "</button>" +
      '<a class="btn btn-accent" href="#/quiz/' + id + '">開始測驗 →</a></div></div>' +
      '<p class="muted" style="font-size:13px;margin-top:14px">提示：可用瀏覽器「列印」把筆記存成 PDF 溫習。</p>';

    var mb = document.getElementById("markRead");
    if (mb) mb.addEventListener("click", function () {
      put(id, { read: true });
      mb.textContent = "✓ 已標記為讀完";
    });

    main.querySelectorAll("[data-say]").forEach(function (b) {
      b.addEventListener("click", function () { speak(b.getAttribute("data-say")); });
    });
  }

  /* ---------- quiz rendering ---------- */
  function blankHTML(ans, i) {
    var longest = Array.isArray(ans) ? ans.reduce(function (a, b) { return a.length > b.length ? a : b; }, "") : String(ans);
    var long = longest.length > 14;
    if (long) {
      return '<input class="blank block" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
        'data-b="' + i + '" aria-label="第 ' + (i + 1) + ' 個空格">';
    }
    var w = Math.min(Math.max(longest.length + 2, 5), 26);
    return '<input class="blank" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
      'style="width:' + w + 'ch" data-b="' + i + '" aria-label="第 ' + (i + 1) + ' 個空格">';
  }

  function renderText(it, si, qi) {
    var blanks = (it.text.match(/___/g) || []).length;
    if (!blanks) {
      // 改錯／合併句子：句子後加一個作答格
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

  function renderChoice(it, si, qi) {
    var keys = ["A", "B", "C", "D", "E"];
    var slot = it.text.indexOf("___") > -1;
    var body = it.text.replace("___", '<span class="slot" data-slot="1">＿＿</span>');
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

  function viewQuiz(id) {
    var data = id === "revision" ? REV : UNITS[id];
    if (!data) return viewHome();
    setNav(id === "revision" ? "revision" : "quiz");

    var total = totalQ(data);
    var qno = 0;
    var sections = data.quiz.map(function (sec, si) {
      var items = sec.items.map(function (it, qi) {
        qno++;
        var inner = it.mode === "tf" ? renderTF(it) : it.mode === "choice" ? renderChoice(it, si, qi) : renderText(it, si, qi);
        return '<div class="q" data-q="' + si + "-" + qi + '"><div class="q-row"><div class="q-no">' + qno + "</div>" +
          '<div class="q-body">' + inner + '<div class="fb"></div></div></div></div>';
      }).join("");

      var extra = "";
      if (sec.passage) {
        extra += '<div class="note" style="margin:0 0 16px;box-shadow:none;background:#FCFAF6">' +
          '<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap">' +
          '<h4 style="margin:0;font-size:16px">' + esc(sec.passage.title) + "</h4>" +
          '<button class="btn btn-ghost btn-sm" data-read="1">朗讀文章</button></div>' +
          '<p style="margin:10px 0 0;font-size:15.5px;line-height:1.9" data-passage="' + esc(sec.passage.text) + '">' +
          esc(sec.passage.text) + "</p></div>";
      }
      if (sec.table) {
        extra += '<table class="t">' + "<thead><tr>" + sec.table.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
          "</tr></thead><tbody>" + sec.table.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
          }).join("") + "</tbody></table>";
      }
      if (sec.bank) {
        extra += '<div class="bank"><span class="lbl">Word box：</span>' +
          sec.bank.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("") + "</div>";
      }

      return '<section class="qsec" data-si="' + si + '"><div class="qsec-head"><h2>' + sec.name + "</h2>" +
        '<span class="badge">' + sec.badge + "</span></div>" +
        '<p class="instr">' + sec.instr + "</p>" + extra + items +
        '<div class="qsec-foot"><button class="btn btn-primary" data-check="' + si + '">檢查本部分</button></div></section>';
    }).join("");

    main.innerHTML =
      '<div class="unit-head" style="--uc:' + data.color + '">' +
      '<div class="kicker">' + (id === "revision" ? "Mixed Revision" : "Unit " + data.no + " · Quiz") + "</div>" +
      "<h1>" + (id === "revision" ? "總測驗" : data.title + "　" + data.titleZh) + "</h1>" +
      "<p>" + data.intro + "</p>" +
      '<div class="tags">' + data.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") + "</div></div>" +
      '<div class="chips">' + ORDER.map(function (k) {
        var x = UNITS[k];
        return '<a class="chip' + (k === id ? " on" : "") + '" href="#/quiz/' + k + '">Unit ' + x.no + "</a>";
      }).join("") + '<a class="chip' + (id === "revision" ? " on" : "") + '" href="#/quiz/revision">總測驗</a></div>' +
      '<div class="quizbar"><div class="quizbar-inner"><span class="title">進度</span>' +
      '<span class="count" id="qcount">0 / ' + total + " 題已檢查</span>" +
      '<div class="qprog"><i id="qbar"></i></div></div></div>' +
      sections + '<div id="result"></div>';

    /* -------- interactions -------- */
    var answered = {};   // key -> {ok:bool}
    var selected = {};   // key -> value
    var checkedSections = {};

    main.querySelectorAll("[data-say]").forEach(function (b) {
      b.addEventListener("click", function () { speak(b.getAttribute("data-say")); });
    });
    main.querySelectorAll("[data-read]").forEach(function (b) {
      b.addEventListener("click", function () {
        var box = b.closest(".note").querySelector("[data-passage]");
        speak(box.getAttribute("data-passage"));
      });
    });

    main.querySelectorAll(".q").forEach(function (qEl) {
      var key = qEl.getAttribute("data-q");
      var it = data.quiz[+key.split("-")[0]].items[+key.split("-")[1]];

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
          });
        });
      }
      // enter key jumps to next blank
      var inputs = qEl.querySelectorAll("input.blank");
      inputs.forEach(function (inp, i) {
        inp.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            var next = inputs[i + 1];
            if (next) next.focus();
            else {
              var btn = qEl.closest(".qsec").querySelector("[data-check]");
              if (btn) btn.click();
            }
          }
        });
      });
    });

    function markProgress() {
      var n = Object.keys(answered).length;
      document.getElementById("qcount").textContent = n + " / " + total + " 題已檢查";
      document.getElementById("qbar").style.width = Math.round((n / total) * 100) + "%";
    }

    main.querySelectorAll("[data-check]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var si = +btn.getAttribute("data-check");
        var sec = data.quiz[si];
        var secEl = main.querySelector('.qsec[data-si="' + si + '"]');
        var okCount = 0;

        secEl.querySelectorAll(".q").forEach(function (qEl) {
          var key = qEl.getAttribute("data-q");
          if (answered[key]) { if (answered[key].ok) okCount++; return; }
          var it = sec.items[+key.split("-")[1]];
          var fb = qEl.querySelector(".fb");
          var ok = false;

          if (it.mode === "choice" || it.mode === "tf") {
            if (!(key in selected)) {
              fb.className = "fb show no";
              fb.innerHTML = "請先選擇一個答案。";
              return;
            }
            ok = selected[key] === it.answer;
            qEl.querySelectorAll(".opt").forEach(function (b) {
              var raw = b.getAttribute("data-o");
              var v = it.mode === "tf" ? raw === "true" : +raw;
              if (v === it.answer) b.classList.add("ok");
              else if (b.classList.contains("sel")) b.classList.add("no");
              b.classList.remove("sel");
            });
          } else {
            var inputs = qEl.querySelectorAll("input.blank");
            var noBlank = (it.text.match(/___/g) || []).length === 0;
            var allOk = true, anyFilled = false;
            inputs.forEach(function (inp, i) {
              var val = inp.value.trim();
              if (val) anyFilled = true;
              var list = noBlank ? it.answers : (Array.isArray(it.answers[i]) ? it.answers[i] : [it.answers[i]]);
              var good = list.some(function (c) { return norm(c) === norm(val); });
              inp.classList.remove("ok", "no");
              inp.classList.add(good ? "ok" : "no");
              inp.readOnly = true;
              if (!good) { allOk = false; inp.value = val || "—"; }
            });
            if (!anyFilled) {
              fb.className = "fb show no";
              fb.innerHTML = "請先填寫答案。";
              return;
            }
            ok = allOk;
          }

          answered[key] = { ok: ok };
          if (ok) okCount++;
          var correct = it.mode === "choice" ? it.options[it.answer]
            : it.mode === "tf" ? (it.answer ? "True 對" : "False 錯")
              : (noBlank ? it.answers[0] : it.answers.join(" ｜ "));
          fb.className = "fb show " + (ok ? "ok" : "no");
          fb.innerHTML = (ok ? "✓ 正確！" : "✗ 正確答案：<span class=\"ans\">" + esc(correct) + "</span>") +
            '<span class="why">' + (it.exp || "") + "</span>";
        });

        btn.disabled = true;
        btn.textContent = "已檢查 " + okCount + "/" + sec.items.length;
        checkedSections[si] = true;
        markProgress();

        var allDone = data.quiz.every(function (_, i) { return checkedSections[i]; });
        if (allDone) finish();
      });
    });

    function finish() {
      var totalDone = 0, right = 0;
      Object.keys(answered).forEach(function (k) { totalDone++; if (answered[k].ok) right++; });
      var pct = Math.round((right / total) * 100);
      var prev = rec(id);
      var best = Math.max(prev.best || 0, right);
      put(id, { best: best, total: total, tries: (prev.tries || 0) + 1, read: prev.read });

      var msg = pct >= 90 ? "非常好！可以挑戰總測驗了。" : pct >= 70 ? "不錯！把錯的地方再讀一次筆記。" : pct >= 50 ? "再努力一點，重點看紅色「常見錯誤」框。" : "先重讀筆記，再來一次會更好。";
      var dash = 2 * Math.PI * 62;
      var off = dash * (1 - right / total);

      document.getElementById("result").innerHTML =
        '<section class="qsec result"><div class="ring"><svg width="150" height="150" viewBox="0 0 150 150">' +
        '<circle cx="75" cy="75" r="62" fill="none" stroke="#EDE7DD" stroke-width="13"/>' +
        '<circle cx="75" cy="75" r="62" fill="none" stroke="' + (pct >= 70 ? "#2E7D5F" : pct >= 50 ? "#E08A3C" : "#C0503F") +
        '" stroke-width="13" stroke-linecap="round" stroke-dasharray="' + dash + '" stroke-dashoffset="' + off + '"/></svg>' +
        '<div class="val">' + pct + "%</div></div>" +
        "<h2>" + right + " / " + total + " 題正確</h2><p>" + msg + "</p>" +
        '<div class="breakdown">' + data.quiz.map(function (s, i) {
          var ok = 0, n = 0;
          s.items.forEach(function (_, j) {
            var k = i + "-" + j;
            if (answered[k]) { n++; if (answered[k].ok) ok++; }
          });
          return '<div class="bd"><div class="n">' + s.name + '</div><div class="v">' + ok + " <small>/ " + s.items.length + "</small></div></div>";
        }).join("") + "</div>" +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">' +
        '<button class="btn btn-primary" onclick="window.__retry()">再做一次</button>' +
        '<a class="btn btn-ghost" href="#/notes/' + (id === "revision" ? "u1" : id) + '">重讀筆記</a>' +
        (id !== "revision" ? '<a class="btn btn-ghost" href="#/quiz/revision">總測驗</a>' : "") +
        '<a class="btn btn-ghost" href="#/">回總覽</a></div></section>';

      var resEl = document.getElementById("result");
      if (resEl && resEl.scrollIntoView) resEl.scrollIntoView({ behavior: "smooth", block: "start" });
      if (pct >= 80) confetti();
    }

    window.__retry = function () {
      viewQuiz(id);
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    };
  }

  function viewProgress() {
    setNav("progress");
    var rows = ORDER.map(function (k) {
      var u = UNITS[k], r = rec(k), t = totalQ(u);
      var pct = r.best ? Math.round((r.best / t) * 100) : 0;
      return '<div class="bar-row"><span>Unit ' + u.no + "</span>" +
        '<span class="tr"><i style="width:' + pct + "%;--bc:" + u.color + '"></i></span>' +
        '<span class="pc">' + (r.best || 0) + "/" + t + "</span></div>";
    }).join("");
    var rv = rec("revision"), rvT = REV ? totalQ(REV) : 0;
    var doneUnits = ORDER.filter(function (k) { return rec(k).best > 0; }).length;
    var totalBest = ORDER.reduce(function (n, k) { return n + (rec(k).best || 0); }, 0);
    var totalAll = ORDER.reduce(function (n, k) { return n + totalQ(UNITS[k]); }, 0);

    main.innerHTML =
      '<div class="sec-head"><h2>我的成績</h2><p>紀錄只保存在這個裝置</p></div>' +
      '<div class="statgrid">' +
      '<div class="stat"><div class="n">完成單元</div><div class="v">' + doneUnits + " / 5</div></div>" +
      '<div class="stat"><div class="n">單元題目總分</div><div class="v">' + totalBest + " <small>/ " + totalAll + "</small></div></div>" +
      '<div class="stat"><div class="n">總測驗最佳</div><div class="v">' + (rv.best || 0) + " <small>/" + rvT + "</small></div></div>" +
      '<div class="stat"><div class="n">練習次數</div><div class="v">' + ORDER.reduce(function (n, k) { return n + (rec(k).tries || 0); }, 0) + "</div></div>" +
      "</div>" +
      '<div class="bars">' + rows +
      '<div class="bar-row" style="border-top:1px solid var(--line);margin-top:8px;padding-top:14px"><span>總測驗</span>' +
      '<span class="tr"><i style="width:' + (rv.best ? Math.round((rv.best / rvT) * 100) : 0) + '%;--bc:#1F6F6B"></i></span>' +
      '<span class="pc">' + (rv.best || 0) + "/" + rvT + "</span></div></div>" +
      '<div class="callout"><div><h3>想重新開始？</h3><p>清除紀錄後，分數會歸零，但筆記和題目不受影響。</p></div>' +
      '<button class="btn btn-ghost" id="reset">清除學習紀錄</button></div>';

    document.getElementById("reset").addEventListener("click", function () {
      if (confirm("確定清除所有成績紀錄？")) { localStorage.removeItem(STORE); viewProgress(); }
    });
  }

  /* ---------- router ---------- */
  function route() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var p = h.split("/");
    window.scrollTo({ top: 0 });
    if (p[0] === "notes" && UNITS[p[1]]) return viewNotes(p[1]);
    if (p[0] === "quiz") return viewQuiz(p[1] === "revision" ? "revision" : (UNITS[p[1]] ? p[1] : "u1"));
    if (p[0] === "revision") return viewQuiz("revision");
    if (p[0] === "progress") return viewProgress();
    return viewHome();
  }

  window.addEventListener("hashchange", route);
  if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  route();
})();
