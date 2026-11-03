/* Unit 5 — Let's celebrate! */
window.UNITS = window.UNITS || {};
window.UNITS.u5 = {
  id: "u5",
  no: 5,
  title: "Let's celebrate!",
  titleZh: "一起慶祝",
  emoji: "🎉",
  color: "#655BA6",
  colorLight: "#EDEAF8",
  focus: ["at / on / in", "When …?", "What / When / How"],
  intro: "用 at / on / in 說時間，並用 What / When / How 問節日。",
  notes: [
    {
      h: "at / on / in（時間介詞）",
      lead: "三個介詞分工清楚：at 用於時刻，on 用於日期，in 用於月份和年份。",
      blocks: [
        { type: "table", head: ["介詞", "用於", "例子"], rows: [
          ["<b>at</b>", "鐘點、特定時刻", "at six o'clock, at noon, at night"],
          ["<b>on</b>", "星期、日期、特定日子", "on Monday, on the tenth of May, on Christmas Day, on my birthday"],
          ["<b>in</b>", "月份、年份、季節、較長時間", "in December, in 2026, in summer, in the morning"]
        ]},
        { type: "zh", x: "口訣：<b>at 時刻、on 日子、in 月年</b>。<br>聖誕節 overall 用 at Christmas；但<b>聖誕節當天</b>用 on Christmas Day。" },
        { type: "warn", x: "常見錯誤：<br>✗ Chinese New Year is <u>on</u> January. → ✓ <b>in</b> January<br>✗ We go to school <u>in</u> Monday. → ✓ <b>on</b> Monday<br>✗ We open presents <u>at</u> Christmas Day. → ✓ <b>on</b> Christmas Day" },
        { type: "egrid", good: ["The party is at three o'clock on Saturday.", "Christmas is in December."], bad: ["The party is on three o'clock in Saturday.", "Christmas is on December."] }
      ]
    },
    {
      h: "When …? / What …? / How …?（問節日）",
      lead: "問節日名稱用 what，問月份用 when，問慶祝方式用 how。",
      blocks: [
        { type: "table", head: ["問句", "問甚麼", "答句"], rows: [
          ["<b>What</b> is your favourite festival?", "節日名稱", "My favourite festival is Easter."],
          ["<b>When</b> do you celebrate it?", "月份／日期", "I celebrate it in March or April."],
          ["<b>How</b> do you celebrate it?", "慶祝方式", "I eat Easter eggs."]
        ]},
        { type: "rule", x: "問月份 → 答句用 <b>in</b>：It is <b>in</b> May.<br>問日期 → 答句用 <b>on</b>：It is <b>on</b> the twenty-fifth of December." },
        { type: "h4", x: "節日與月份（考試常考）" },
        { type: "table", head: ["節日", "月份", "慶祝方式"], rows: [
          ["Chinese New Year", "January or February", "get red packets, watch lion dances"],
          ["Dragon Boat Festival", "May or June", "eat rice dumplings, watch dragon boat races"],
          ["Mid-Autumn Festival", "September or October", "eat moon cakes, play with lanterns"],
          ["Christmas", "December (25th)", "decorate the tree, exchange presents"],
          ["Easter", "March or April", "eat Easter eggs"]
        ]},
        { type: "zh", x: "答「何時」時，<b>月份前用 in</b>、<b>日期前用 on</b>，這是本科最常失分的位置。" },
        { type: "warn", x: "✗ I celebrate it <u>on</u> May. → ✓ I celebrate it <b>in</b> May.<br>✗ It is <u>in</u> the twenty-fifth of December. → ✓ It is <b>on</b> the twenty-fifth of December." }
      ]
    },
    {
      h: "單元字詞 Vocabulary",
      lead: "節日、應節食物與慶祝活動。點 🔊 可以聽發音。",
      blocks: [{ type: "vocab" }]
    }
  ],
  vocab: [
    { w: "celebrate", z: "慶祝" }, { w: "festival", z: "節日" },
    { w: "Chinese New Year", z: "農曆新年" }, { w: "Dragon Boat Festival", z: "端午節" },
    { w: "Mid-Autumn Festival", z: "中秋節" }, { w: "Christmas", z: "聖誕節" },
    { w: "Easter", z: "復活節" }, { w: "red packets", z: "紅封包" },
    { w: "rice dumplings", z: "糭" }, { w: "moon cakes", z: "月餅" },
    { w: "lanterns", z: "燈籠" }, { w: "streamers", z: "彩帶" },
    { w: "lion dance", z: "舞獅" }, { w: "dragon boat races", z: "龍舟比賽" },
    { w: "presents", z: "禮物" }, { w: "exchange", z: "交換" },
    { w: "decorate", z: "佈置" }, { w: "Christmas tree", z: "聖誕樹" },
    { w: "holiday", z: "假期" }, { w: "January", z: "一月" },
    { w: "February", z: "二月" }, { w: "September", z: "九月" },
    { w: "October", z: "十月" }, { w: "December", z: "十二月" }
  ],
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上。",
      bank: ["red packets", "rice dumplings", "moon cakes", "lanterns", "streamers", "lion dance", "presents", "exchange"],
      items: [
        { text: "At Chinese New Year, children get ___ from their parents.", answers: ["red packets"], exp: "red packets = 紅封包。" },
        { text: "We eat ___ at the Dragon Boat Festival.", answers: ["rice dumplings"], exp: "端午節吃糭。" },
        { text: "People watch the ___ in the streets at Chinese New Year.", answers: ["lion dance"], exp: "lion dance = 舞獅。" },
        { text: "We put up colourful ___ to decorate the classroom.", answers: ["streamers"], exp: "streamers = 彩帶。" },
        { text: "At the Mid-Autumn Festival, we eat ___ and play with lanterns.", answers: ["moon cakes"], exp: "中秋節吃月餅。" },
        { text: "At Christmas, my family and I ___ presents.", answers: ["exchange"], exp: "exchange presents = 交換禮物。" }
      ]
    },
    {
      name: "B. 語法練習",
      badge: "Grammar",
      instr: "選擇正確的字詞，或改正畫線的部分。",
      items: [
        { text: "My birthday is ___ the tenth of May.", mode: "choice", options: ["in", "on", "at"], answer: 1, exp: "日期前用 on。" },
        { text: "Christmas is ___ December.", mode: "choice", options: ["in", "on", "at"], answer: 0, exp: "月份前用 in。" },
        { text: "We have a party ___ six o'clock.", mode: "choice", options: ["at", "on", "in"], answer: 0, exp: "鐘點前用 at。" },
        { text: "___ is your birthday? It is on the third of July.", mode: "choice", options: ["When", "What", "How"], answer: 0, exp: "問時間用 When。" },
        { text: "Chinese New Year is <u>on</u> January or February.", answers: ["in"], exp: "月份前用 in。" },
        { text: "We go to school <u>in</u> Monday.", answers: ["on"], exp: "星期前用 on。" },
        { text: "We open presents ___ Christmas Day.", mode: "choice", options: ["at", "in", "on"], answer: 2, exp: "特定日子（聖誕節當天）用 on。" },
        { text: "___ do you celebrate the Mid-Autumn Festival? I play with lanterns.", mode: "choice", options: ["What", "When", "How"], answer: 2, exp: "問慶祝方式用 How。" },
        { text: "___ is your favourite festival? It is Easter.", mode: "choice", options: ["What", "When", "How"], answer: 0, exp: "問節日名稱用 What。" },
        { text: "The Dragon Boat Festival is ___ May or June.", mode: "choice", options: ["on", "in", "at"], answer: 1, exp: "月份前用 in。" }
      ]
    },
    {
      name: "C. 看資料完成問答",
      badge: "Q & A",
      instr: "根據節日資料，填上正確的字。",
      table: { head: ["Festival", "Month", "How people celebrate"], rows: [
        ["Chinese New Year", "January or February", "get red packets, watch lion dances"],
        ["Dragon Boat Festival", "May or June", "eat rice dumplings"],
        ["Mid-Autumn Festival", "September or October", "play with lanterns"],
        ["Christmas", "December", "exchange presents"]
      ]},
      items: [
        { text: "A: When ___ Chinese New Year?  B: It is ___ January or February.", answers: ["is", "in"], exp: "主語 Chinese New Year 是單數用 is；月份前用 in。" },
        { text: "A: ___ do you celebrate Christmas?  B: I ___ presents with my family.", answers: ["How", "exchange"], exp: "問方式用 How；exchange presents。" },
        { text: "A: What is your favourite ___?  B: ___ is the Mid-Autumn Festival.", answers: ["festival", "It"], exp: "favourite festival = 最愛的節日；用 It 代替。" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "Festivals in Hong Kong",
        text: "Hong Kong has many interesting festivals. Chinese New Year is in January or February. People clean their homes, watch lion dances and give red packets to children. The Dragon Boat Festival is in May or June. We eat rice dumplings and watch dragon boat races. The Mid-Autumn Festival is in September or October. Families eat moon cakes and children play with lanterns in the park. Christmas is on the twenty-fifth of December. People decorate Christmas trees and exchange presents. My favourite festival is the Mid-Autumn Festival because I love moon cakes."
      },
      items: [
        { text: "People give red packets at Chinese New Year.", mode: "tf", answer: true, exp: "People clean their homes, watch lion dances and give red packets to children." },
        { text: "The Mid-Autumn Festival is in November.", mode: "tf", answer: false, exp: "文章說 The Mid-Autumn Festival is in September or October。" },
        { text: "What do people eat at the Dragon Boat Festival?", mode: "choice", options: ["Moon cakes.", "Rice dumplings.", "Easter eggs.", "Christmas cake."], answer: 1, exp: "We eat rice dumplings at the Dragon Boat Festival." },
        { text: "When is Christmas?", mode: "choice", options: ["In November.", "On the twenty-fifth of December.", "In January.", "On the first of January."], answer: 1, exp: "Christmas is on the twenty-fifth of December。" },
        { text: "Why does the writer like the Mid-Autumn Festival?", answers: ["Because the writer loves moon cakes.", "Because I love moon cakes.", "Because he loves moon cakes.", "Because she loves moon cakes."], exp: "文章最後說 because I love moon cakes。" }
      ]
    }
  ]
};
