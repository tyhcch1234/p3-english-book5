/* Unit 4 — Earth Day */
window.UNITS = window.UNITS || {};
window.UNITS.u4 = {
  id: "u4",
  no: 4,
  title: "Earth Day",
  titleZh: "地球日",
  emoji: "🌍",
  color: "#2C7C8C",
  colorLight: "#E4F3F5",
  focus: ["action words + away / off / up", "words of thinking and feeling + to"],
  intro: "學會用片語動詞說環保動作，並用 to + 原形動詞表達想法和感受。",
  notes: [
    {
      h: "動作詞 + away / off / up（片語動詞）",
      lead: "在動作詞後面加 away、off 或 up，會產生新的意思。",
      blocks: [
        { type: "table", head: ["片語", "意思", "例句"], rows: [
          ["throw <b>away</b>", "丟掉", "Remember to throw away the rubbish."],
          ["give <b>away</b>", "送出、捐出", "We can give away our old toys."],
          ["put <b>away</b>", "收好", "Put away your books, please."],
          ["pick <b>up</b>", "拾起", "Let's pick up the waste paper."],
          ["clean <b>up</b>", "清理乾淨", "Let's clean up the park."],
          ["turn <b>off</b>", "關掉", "Please turn off the fan."],
          ["turn <b>on</b>", "開（電器）", "Turn on the light, please."],
          ["keep <b>off</b>", "遠離、勿踏", "Keep off the grass."]
        ]},
        { type: "zh", x: "away = 離開／丟走；off = 關掉／離開表面；up = 向上／完成。<b>turn off</b> 是關，<b>turn on</b> 是開，方向相反，不要混淆。" },
        { type: "h4", x: "代詞要放在中間" },
        { type: "rule", x: "受詞是 <b>it / them</b> 時，要放在片語動詞<b>中間</b>：<br>pick <b>it</b> up ／ turn <b>them</b> off ／ throw <b>it</b> away<br>受詞是名詞時，放前放後都可以：pick up the paper = pick the paper up" },
        { type: "warn", x: "✗ Please pick up <u>it</u>. → ✓ Please pick <b>it up</b>.<br>✗ Turn off <u>them</u>. → ✓ Turn <b>them</b> off." },
        { type: "egrid", good: ["Don't throw away your old clothes."], bad: ["Don't throw your old clothes <u>off</u>."] }
      ]
    },
    {
      h: "表示想法和感受的詞 + to",
      lead: "want、hope、plan 等詞後面接 to + 原形動詞。",
      blocks: [
        { type: "rule", x: "want / hope / wish / plan / decide / choose / try / love / like / hate / remember / forget / agree + <b>to + 原形動詞</b>" },
        { type: "table", head: ["詞語", "意思", "例句"], rows: [
          ["want", "想要", "I want <b>to borrow</b> a book."],
          ["hope", "希望", "Sophie hopes <b>to have</b> spaghetti."],
          ["plan", "計劃", "My brother plans <b>to be</b> a musician."],
          ["decide", "決定", "Mr Lee decides <b>to go</b> on a trip."],
          ["choose", "選擇", "They choose <b>to go</b> on foot."],
          ["try", "嘗試", "She tries <b>to finish</b> her homework."],
          ["remember", "記得", "Remember <b>to turn</b> off the lights."],
          ["agree", "同意", "Sam agrees <b>to make</b> the salad."]
        ]},
        { type: "zh", x: "重點：<b>to 後面的動詞永遠不變形</b>（不加 s、不加 ing、不加 ed）。<br>She tries <b>to finish</b> …（不是 to finishes）／ He wants <b>to play</b> …（不是 to plays）。" },
        { type: "warn", x: "✗ He wants to <u>plays</u> football.<br>✓ He wants to <b>play</b> football.<br>✗ They plan to <u>going</u> to the beach.<br>✓ They plan to <b>go</b> to the beach." },
        { type: "h4", x: "第一個動詞仍要配合主語" },
        { type: "egrid", good: ["She <b>wants</b> to borrow a book.", "They <b>want</b> to borrow a book."], bad: ["She <u>want</u> to borrow a book."] }
      ]
    },
    {
      h: "單元字詞 Vocabulary",
      lead: "環保與家居字詞。點 🔊 可以聽發音。",
      blocks: [{ type: "vocab" }]
    }
  ],
  vocab: [
    { w: "rubbish", z: "垃圾" }, { w: "rubbish bin", z: "垃圾桶" },
    { w: "recycling bin", z: "回收箱" }, { w: "plastic bottle", z: "膠樽" },
    { w: "can", z: "鐵罐" }, { w: "cardboard", z: "紙板" },
    { w: "glass", z: "玻璃" }, { w: "paper", z: "紙" },
    { w: "grass", z: "草地" }, { w: "fan", z: "風扇" },
    { w: "lights", z: "燈" }, { w: "kitchen", z: "廚房" },
    { w: "litter", z: "亂丟的垃圾" }, { w: "reuse", z: "重用" },
    { w: "recycle", z: "回收" }, { w: "reduce", z: "減少" },
    { w: "throw away", z: "丟掉" }, { w: "pick up", z: "拾起" },
    { w: "clean up", z: "清理" }, { w: "turn off", z: "關掉" },
    { w: "turn on", z: "開（電器）" }, { w: "give away", z: "送出" },
    { w: "keep off", z: "勿踏、遠離" }, { w: "environment", z: "環境" }
  ],
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上。",
      bank: ["rubbish", "recycling bin", "plastic bottle", "cardboard", "grass", "fan", "kitchen", "litter"],
      items: [
        { text: "Please put the ___ in the bin. The floor is very dirty.", answers: ["rubbish"], exp: "rubbish = 垃圾。" },
        { text: "We can put paper, cans and bottles in the ___ .", answers: ["recycling bin"], exp: "recycling bin = 回收箱。" },
        { text: "I always reuse this ___ and fill it with water.", answers: ["plastic bottle"], exp: "plastic bottle = 膠樽，可以重用。" },
        { text: "Please turn off the ___ . It is cool enough now.", answers: ["fan"], exp: "fan = 風扇。" },
        { text: "Don't walk on the ___ . The farmer is growing vegetables on it.", answers: ["grass"], exp: "grass = 草地。" },
        { text: "We can make boxes with ___ .", answers: ["cardboard"], exp: "cardboard = 紙板。" }
      ]
    },
    {
      name: "B. 語法練習",
      badge: "Grammar",
      instr: "選擇正確的字詞，或改正畫線的部分。",
      items: [
        { text: "Remember to throw ___ the rubbish.", mode: "choice", options: ["away", "off", "up"], answer: 0, exp: "throw away = 丟掉。" },
        { text: "Please turn ___ the fan when you leave the room.", mode: "choice", options: ["off", "up", "away"], answer: 0, exp: "turn off = 關掉。" },
        { text: "Let's pick ___ the waste paper on the floor.", mode: "choice", options: ["up", "off", "away"], answer: 0, exp: "pick up = 拾起。" },
        { text: "Don't ___ your old clothes. Other people can wear them.", mode: "choice", options: ["throw away", "give away", "pick up"], answer: 1, exp: "送給別人用 → give away。" },
        { text: "The toys are on the floor. Please pick ___ .", mode: "choice", options: ["up them", "them up", "them away"], answer: 1, exp: "代詞 them 要放中間：pick them up。" },
        { text: "Turn ___ the lights when you leave the bathroom.", mode: "choice", options: ["off", "on", "up"], answer: 0, exp: "離開要關燈 → turn off。" },
        { text: "I want ___ a book from the school library.", mode: "choice", options: ["borrow", "to borrow", "borrowing"], answer: 1, exp: "want + to + 原形動詞。" },
        { text: "She tries ___ her homework before eight o'clock.", mode: "choice", options: ["finish", "to finish", "finishes"], answer: 1, exp: "try + to + 原形動詞。" },
        { text: "He wants to <u>plays</u> football after school.", answers: ["play"], exp: "to 後面用原形動詞 play。" },
        { text: "They plan to <u>going</u> to the beach on Sunday.", answers: ["go"], exp: "to 後面用原形動詞 go。" }
      ]
    },
    {
      name: "C. 情境填充",
      badge: "Q & A",
      instr: "根據句子意思，填上適當的片語動詞（每題兩個字）。",
      bank: ["clean up", "give away", "keep off", "turn off", "pick up", "throw away"],
      items: [
        { text: "The classroom is very dirty. The teacher asks us to ___ ___ the classroom.", answers: ["clean", "up"], exp: "clean up = 清理乾淨。" },
        { text: "Please ___ ___ the grass. We mustn't walk on it.", answers: ["keep", "off"], exp: "keep off = 勿踏。" },
        { text: "We can ___ ___ our old toys to poor children.", answers: ["give", "away"], exp: "give away = 送出、捐出。" },
        { text: "Don't ___ ___ plastic bags. Try to reuse them.", answers: ["throw", "away"], exp: "throw away = 丟掉。" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "Earth Day at School",
        text: "Last Friday was Earth Day. Our school had a special programme. In the morning, Mr Wong talked about recycling. He said, 'We should reduce, reuse and recycle.' After that, Class 3B cleaned up the school garden. Ken picked up the rubbish on the floor and put it in the bin. May turned off the lights and the fans in the classroom because nobody was there. In the afternoon, the children made toys with cardboard boxes and plastic bottles. They did not throw them away. 'I want to make a robot next time,' said Ken. Everyone agreed to keep the school clean every day."
      },
      items: [
        { text: "Class 3B cleaned up the school garden.", mode: "tf", answer: true, exp: "After that, Class 3B cleaned up the school garden." },
        { text: "May turned on the lights in the classroom.", mode: "tf", answer: false, exp: "文章說 May turned off the lights and the fans（關掉），不是開。" },
        { text: "What did the children make in the afternoon?", mode: "choice", options: ["Robots.", "Toys.", "Bins.", "Fans."], answer: 1, exp: "They made toys with cardboard boxes and plastic bottles. 機械人是下次想做的。" },
        { text: "Which word did Mr Wong NOT say?", mode: "choice", options: ["reduce", "reuse", "recycle", "repair"], answer: 3, exp: "他說 reduce, reuse and recycle，沒有說 repair。" },
        { text: "Why did May turn off the lights and fans?", answers: ["Because nobody was there.", "Because nobody was there", "Nobody was there.", "Nobody was there", "Because nobody was in the classroom.", "Because nobody was in the classroom"], exp: "文章說 because nobody was there（因為沒有人在）。" }
      ]
    }
  ]
};
