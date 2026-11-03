# 小三英文 · Lighthouse 5 溫習網

小三上學期英文溫習網站，按 **Lighthouse for Hong Kong Book 5** 的五個單元編寫。每個單元先有筆記，再有測驗；另設五單元混合的「總測驗」和 12 題隨機「快閃挑戰」。吉祥物燈塔 **Beacon** 會一路陪住玩。

## 內容

| 單元 | 課題 | 語法重點 | 題目 |
|---|---|---|---|
| 1 | On the farm 農場 | Where … come from? / and, but | 24 |
| 2 | School picnic! 學校野餐 | How many / How much、a few / a little / a lot of、would like / or | 24 |
| 3 | Happy pets! 快樂寵物 | How often …?、頻率副詞、How tall / How heavy | 24 |
| 4 | Earth Day 地球日 | 動作詞 + away / off / up、想法感受詞 + to | 25 |
| 5 | Let's celebrate! 一起慶祝 | at / on / in、When …?、What / When / How | 24 |
| — | 總測驗 | Units 1–5 混合 | 30 |

共 151 題。

## 題型

- **字詞填充**：字詞盒選詞，配合單元詞彙
- **語法練習**：選擇題、改錯（畫線部分）、句子合併（and / but）、代詞位置、動詞形式
- **看資料問答**：依表格／情境完成問句與答句
- **閱讀理解**：短文 + 是非題、選擇題、簡答題（每單元一篇，總測驗一篇）

## 功能

- 每個單元分「筆記 / 測驗」兩頁；筆記含語法表、正確與錯誤對照、中文解說、易錯點、單元字詞
- **字詞卡反轉**：點一下英文字卡即翻轉看中文，卡上可聽發音
- **字詞盒點選填入**：測驗時點字詞盒內的字，會直接填入下一個空格，已用過的字會變灰
- 逐部分作答並即時批改，顯示正確答案與解釋；每個空格即時標示對錯
- **遊戲化回饋**：答對 +10 XP、連續答對計 🔥 連對、測驗按 60% / 80% / 95% 得 1–3 星
- **8 款貼紙**：開始了、三星高手、五單元完成、總測驗滿分、連對 5 題、閱讀達人、挑戰者、300 XP
- **快閃挑戰**：由五個單元隨機抽 12 題，每次不同，可重複玩
- 答題音效（WebAudio，可開關）、達標彩紙、吉祥物 Beacon 的提示氣泡
- 自動儲存最佳成績、練習次數、XP 與貼紙（瀏覽器 localStorage，key：`p3eng.progress.v2`）
- 字詞與閱讀文章可朗讀（瀏覽器 SpeechSynthesis）
- 響應式版面，手機優先；尊重 `prefers-reduced-motion`；筆記可用瀏覽器列印成 PDF

## 檔案結構

```
index.html
assets/css/style.css
assets/js/app.js          版面、路由、批改、計分、XP／星星／貼紙、音效
assets/js/data/u1.js …    五個單元的筆記與題目
assets/js/data/revision.js 總測驗
```

## 新增或修改題目

題目資料在 `assets/js/data/`。每題格式：

```js
// 填充／改錯／合併（文字作答）
{ text: "Where does honey ___ from?", answers: ["come"], exp: "解釋" }

// 選擇題
{ text: "It ___ from bees.", mode: "choice", options: ["come", "comes"], answer: 1, exp: "解釋" }

// 是非題
{ text: "Tom lives on a big farm.", mode: "tf", answer: false, exp: "解釋" }
```

- `___` 是空格，數量須與 `answers` 陣列長度一致。
- 同一空格接受多個寫法時，把 `answers[i]` 寫成陣列。
- 沒有 `___` 的題目（改錯、合併句子）會自動在句子下方顯示作答格，`answers` 直接列出可接受的句子。
- 新增單元後，在 `index.html` 加入 script，並在 `app.js` 的 `ORDER` 補上 id。
- 貼紙條件與文案在 `app.js` 的 `STICKERS` 陣列；星級門檻在 `starsFor()`。

## 進度與重設

學習紀錄存在瀏覽器 `localStorage`：

- `p3eng.progress.v2` → `{ __meta: { xp, stickers, sound }, u1…u5 / revision / challenge: { best, total, read, tries } }`
- 在「成績」頁按「清除學習紀錄」可一次清空分數、XP 與貼紙。

## 部署

純靜態網站，無需建置。放到 GitHub Pages 的 `main` 分支根目錄即可。

## 備註

筆記與題目為依課本單元重新編寫的教學材料，並非課本原文；字詞與題型參考 Grammar 5、Grammar Review 5 及 Workbook。
