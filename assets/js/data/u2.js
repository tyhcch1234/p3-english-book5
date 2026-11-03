/* Unit 2 — School picnic! */
window.UNITS = window.UNITS || {};
window.UNITS.u2 = {
  id: "u2",
  no: 2,
  title: "School picnic!",
  titleZh: "學校野餐",
  emoji: "🧺",
  color: "#BE7326",
  colorLight: "#FBF0E1",
  focus: ["How many / How much", "a few / a little / a lot of", "would like / or"],
  intro: "分辨可數與不可數名詞，並用 would like / or 說出選擇和喜好。",
  notes: [
    {
      h: "How many / How much（問數量）",
      lead: "可數名詞用 how many，不可數名詞用 how much。",
      blocks: [
        { type: "rule", x: "<b>How many</b> + 複數可數名詞 …? → There <b>are</b> …<br><b>How much</b> + 不可數名詞 …? → There <b>is</b> …" },
        { type: "table", head: ["問句", "答句"], rows: [
          ["<b>How many</b> cherries are there?", "There are <b>a few</b> cherries. / There are <b>a lot of</b> cherries."],
          ["<b>How much</b> cheese is there?", "There is <b>a little</b> cheese. / There is <b>a lot of</b> cheese."]
        ]},
        { type: "table", head: ["", "many", "much", "a lot of", "a few", "a little"], rows: [
          ["可數 countable（cherries, eggs, cakes）", "✓", "✗", "✓", "✓", "✗"],
          ["不可數 uncountable（cheese, juice, bread）", "✗", "✓", "✓", "✗", "✓"]
        ]},
        { type: "zh", x: "<b>a few</b> = 幾個（可數，少量）；<b>a little</b> = 一點點（不可數，少量）；<b>a lot of</b> = 很多（兩種都可以）。<br>數量多 → a lot of；數量少 → a few / a little。" },
        { type: "warn", x: "常見錯誤：<br>✗ How many <u>cheese</u> is there? → ✓ How <b>much cheese</b> is there?<br>✗ There are <u>a little</u> brownies. → ✓ There are <b>a few</b> brownies.<br>✗ There is <u>a few</u> juice. → ✓ There is <b>a little</b> juice." },
        { type: "egrid", good: ["There is a little apple juice in the bottle.", "There are a few peaches in the basket."], bad: ["There is a few apple juice in the bottle.", "There are a little peaches in the basket."] }
      ]
    },
    {
      h: "would like / or（喜好與選擇）",
      lead: "would like 用來禮貌地問想要甚麼；or 用來提供兩個或以上的選擇。",
      blocks: [
        { type: "rule", x: "<b>Would you like</b> A <b>or</b> B?<br>→ <b>I would like</b> A. （只答其中一樣，不再用 or）" },
        { type: "table", head: ["問句", "答句"], rows: [
          ["<b>Would</b> you <b>like</b> oranges or apples?", "I <b>would like</b> apples."],
          ["<b>Would</b> you like to wear boots or trainers?", "I <b>would like</b> to wear boots."]
        ]},
        { type: "zh", x: "would like 後面可以接：<b>名詞</b>（would like apples）或 <b>to + 動詞</b>（would like to wear boots）。<br>would 是情態動詞，後面永遠用原形 like，不會寫 woulds / would liking。" },
        { type: "h4", x: "三種常見問法" },
        { type: "ul", x: [
          "Would you like <b>bread or cupcakes</b>? — 提供兩樣食物。",
          "Would you like <b>to bring biscuits or brownies</b>? — 提供兩個動作。",
          "Would you like <b>some</b> salad? — 只有一樣東西時，不用 or。"
        ]},
        { type: "warn", x: "答句不要再加 or：<br>✗ I would like bread <u>or</u> cupcakes.<br>✓ I would like <b>bread</b>." },
        { type: "h4", x: "would like vs like" },
        { type: "table", head: ["句型", "意思", "例子"], rows: [
          ["I <b>like</b> apples.", "我（平時）喜歡蘋果", "I like apples very much."],
          ["I <b>would like</b> an apple.", "我（現在）想要一個蘋果", "I would like an apple, please."]
        ]}
      ]
    },
    {
      h: "單元字詞 Vocabulary",
      lead: "野餐食物與數量詞。點 🔊 可以聽發音。",
      blocks: [{ type: "vocab" }]
    }
  ],
  vocab: [
    { w: "picnic", z: "野餐" }, { w: "basket", z: "籃子" },
    { w: "sandwich", z: "三文治" }, { w: "bread", z: "麵包" },
    { w: "biscuits", z: "餅乾" }, { w: "cupcakes", z: "杯子蛋糕" },
    { w: "brownies", z: "布朗尼蛋糕" }, { w: "cherries", z: "車厘子" },
    { w: "peaches", z: "桃子" }, { w: "pears", z: "梨" },
    { w: "bananas", z: "香蕉" }, { w: "cheese", z: "芝士" },
    { w: "salad", z: "沙律" }, { w: "spaghetti", z: "意大利粉" },
    { w: "apple juice", z: "蘋果汁" }, { w: "orange juice", z: "橙汁" },
    { w: "peanuts", z: "花生" }, { w: "sweets", z: "糖果" },
    { w: "bottle", z: "瓶子" }, { w: "delicious", z: "美味的" },
    { w: "hungry", z: "肚餓的" }, { w: "thirsty", z: "口渴的" },
    { w: "a few", z: "幾個（可數）" }, { w: "a little", z: "一點點（不可數）" },
    { w: "a lot of", z: "很多" }
  ],
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上。",
      bank: ["cheese", "salad", "bread", "cherries", "apple juice", "cupcakes", "biscuits", "peaches", "brownies"],
      items: [
        { text: "There is a lot of ___ in the fridge. We can put it in sandwiches.", answers: ["cheese"], exp: "芝士 cheese 是不可數名詞。" },
        { text: "Would you like some ___ ? It is a cold dish with lettuce and tomatoes.", answers: ["salad"], exp: "sandwich 常配 salad；沙律是 salad。" },
        { text: "We bought a loaf of ___ from the bakery.", answers: ["bread"], exp: "a loaf of bread = 一條麵包。" },
        { text: "These ___ are small, red and sweet. They have seeds inside.", answers: ["cherries"], exp: "cherries = 車厘子。" },
        { text: "We need a bottle of ___ to drink.", answers: ["apple juice"], exp: "bottle of apple juice = 一瓶蘋果汁。" },
        { text: "There are six ___ in the box. Each one has cream on top.", answers: ["cupcakes"], exp: "cupcakes = 杯子蛋糕，上面有忌廉。" }
      ]
    },
    {
      name: "B. 語法練習",
      badge: "Grammar",
      instr: "選擇正確的字詞，或改正畫線的部分。",
      items: [
        { text: "How ___ cherries are there?", mode: "choice", options: ["many", "much", "a lot"], answer: 0, exp: "cherries 是可數複數 → how many。" },
        { text: "How ___ cheese is there?", mode: "choice", options: ["many", "much", "few"], answer: 1, exp: "cheese 不可數 → how much。" },
        { text: "There ___ a few peaches on the table.", mode: "choice", options: ["is", "are", "be"], answer: 1, exp: "peaches 複數用 There are。" },
        { text: "There ___ a little apple juice in the glass.", mode: "choice", options: ["is", "are", "have"], answer: 0, exp: "apple juice 不可數用 There is。" },
        { text: "How many <u>cheese</u> is there?", answers: ["much"], exp: "cheese 不可數，要用 how much。" },
        { text: "There are <u>a little</u> brownies on the plate.", answers: ["a few"], exp: "brownies 可數複數 → a few。" },
        { text: "Would you like bread ___ cupcakes?", mode: "choice", options: ["or", "and", "but"], answer: 0, exp: "提供選擇用 or。" },
        { text: "I ___ like spaghetti, please.", answers: ["would"], exp: "would like = 想要，比 like 更有禮貌。" },
        { text: "___ you like to wear boots or trainers?", answers: ["Would"], exp: "問句開頭用 Would，首字母大寫。" },
        { text: "There is a lot of ___ in the basket.", mode: "choice", options: ["cherries", "cheese", "peaches"], answer: 1, exp: "There is 後面接不可數名詞，只有 cheese 不可數。" }
      ]
    },
    {
      name: "C. 看資料完成問答",
      badge: "Q & A",
      instr: "根據圖片提示，填上正確的字。",
      table: { head: ["Food", "How much / How many", "Amount"], rows: [["peaches", "How many", "a few"], ["salad", "How much", "a little"], ["cupcakes", "How many", "a lot of"]] },
      items: [
        { text: "A: How ___ peaches are there?  B: There are ___ peaches.", answers: ["many", "a few"], exp: "peaches 可數 → many；數量少 → a few。" },
        { text: "A: How ___ salad is there?  B: There is ___ salad.", answers: ["much", "a little"], exp: "salad 不可數 → much；少量 → a little。" },
        { text: "A: ___ you like rice or spaghetti?  B: I ___ like spaghetti.", answers: ["Would", "would"], exp: "Would you like …? 答句 I would like …" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "The School Picnic",
        text: "It is Friday. Class 3A is having a picnic in the park. Miss Chan asks the children to bring some food. Amy brings a lot of sandwiches and a few apples. Ben brings a bottle of orange juice and some biscuits. There is a little cheese in the box, but there are not many tomatoes. 'Would you like a sandwich or a cupcake?' Amy asks Ben. 'I would like a sandwich, please,' says Ben. After lunch, the children play football. They want to clean up the park before they go home. Everyone has a good time."
      },
      items: [
        { text: "The children have a picnic on Friday.", mode: "tf", answer: true, exp: "第一句：It is Friday. Class 3A is having a picnic in the park." },
        { text: "There are a lot of tomatoes in the box.", mode: "tf", answer: false, exp: "文章說 there are not many tomatoes（番茄不多），只有 a little cheese。" },
        { text: "What would Ben like to eat?", mode: "choice", options: ["A cupcake.", "A sandwich.", "An apple.", "Some cheese."], answer: 1, exp: "Ben 說：I would like a sandwich, please." },
        { text: "What do the children do after lunch?", mode: "choice", options: ["They go home.", "They buy some food.", "They play football.", "They clean the classroom."], answer: 2, exp: "After lunch, the children play football." },
        { text: "Where do the children have a picnic?", answers: ["In the park.", "In the park", "The park.", "The park"], exp: "第一句說 in the park。" }
      ]
    }
  ]
};
