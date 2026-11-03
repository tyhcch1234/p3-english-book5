/* Unit 3 — Happy pets! */
window.UNITS = window.UNITS || {};
window.UNITS.u3 = {
  id: "u3",
  no: 3,
  title: "Happy pets!",
  titleZh: "快樂寵物",
  emoji: "🐹",
  color: "#AC4F68",
  colorLight: "#FBE9EE",
  focus: ["How often …?", "always / often / sometimes", "seldom / never", "How tall / How heavy"],
  intro: "用頻率副詞說做事的次數，並問身高和體重。",
  notes: [
    {
      h: "How often …?（問次數）",
      lead: "用 how often 問做某事的頻密程度，答句用頻率副詞。",
      blocks: [
        { type: "table", head: ["0%", "", "", "", "100%"], rows: [
          ["never", "seldom", "sometimes", "often", "always"],
          ["從不", "很少", "有時", "經常", "總是"]
        ]},
        { type: "table", head: ["問句", "答句"], rows: [
          ["<b>How often</b> do you walk your dog?", "I <b>always</b> walk my dog."],
          ["<b>How often</b> does she brush her dog?", "She <b>sometimes</b> brushes her dog."]
        ]},
        { type: "rule", x: "頻率副詞的位置：<br>① 一般動詞 <b>前面</b>：She <b>often</b> plays with her cat.<br>② be 動詞 <b>後面</b>：He <b>is always</b> happy." },
        { type: "zh", x: "always（100%）→ often（經常）→ sometimes（有時）→ seldom（很少）→ never（從不）。<br>問句用 <b>do / does</b>，答句動詞要跟主語：I <b>walk</b> / She <b>walks</b>。" },
        { type: "warn", x: "常見錯誤：<br>✗ He <u>always is</u> happy. → ✓ He <b>is always</b> happy.<br>✗ She sometimes <u>brush</u> her dog. → ✓ She sometimes <b>brushes</b> her dog." },
        { type: "egrid", good: ["How often does Leo feed her? He always feeds her."], bad: ["How often does Leo feed her? He always feed her."] }
      ]
    },
    {
      h: "How tall …? / How heavy …?（問身高體重）",
      lead: "how tall 問高度，how heavy 問重量。",
      blocks: [
        { type: "rule", x: "<b>How tall</b> is your rabbit? → She is 20 centimetres <b>tall</b>.<br><b>How heavy</b> is your rabbit? → She <b>weighs</b> 2 kilograms." },
        { type: "table", head: ["單位", "全寫", "例子"], rows: [
          ["cm", "centimetre 厘米", "25 cm"],
          ["kg", "kilogram 公斤", "9 kg"],
          ["g", "gram 克", "130 g"]
        ]},
        { type: "zh", x: "答身高用 <b>is … tall</b>；答體重用 <b>weighs …</b>（動詞，第三人稱單數要加 s）。<br>比較：He <b>is</b> 100 cm <b>tall</b>. ／ He <b>weighs</b> 9 kg." },
        { type: "warn", x: "✗ He <u>is</u> 9 kilograms. → ✓ He <b>weighs</b> 9 kilograms.<br>✗ She <u>weigh</u> 2 kilograms. → ✓ She <b>weighs</b> 2 kilograms.<br>✗ How tall <u>weighs</u> your cat? → ✓ How <b>heavy</b> is your cat?" },
        { type: "h4", x: "問動物其他特徵" },
        { type: "ul", x: [
          "How old is your dog? — He is three years old.",
          "What does your cat look like? — She has long white fur.",
          "How long is your snake? — It is one metre long."
        ]}
      ]
    },
    {
      h: "單元字詞 Vocabulary",
      lead: "寵物、照顧動物的動作與量度單位。點 🔊 可以聽發音。",
      blocks: [{ type: "vocab" }]
    }
  ],
  vocab: [
    { w: "pet", z: "寵物" }, { w: "puppy", z: "小狗" },
    { w: "kitten", z: "小貓" }, { w: "hamster", z: "倉鼠" },
    { w: "rabbit", z: "兔子" }, { w: "goldfish", z: "金魚" },
    { w: "cage", z: "籠子" }, { w: "fish tank", z: "魚缸" },
    { w: "bowl", z: "碗" }, { w: "collar", z: "頸圈" },
    { w: "lead", z: "狗帶" }, { w: "brush", z: "梳毛" },
    { w: "bath", z: "洗澡" }, { w: "vet", z: "獸醫" },
    { w: "feed", z: "餵食" }, { w: "stroke", z: "撫摸" },
    { w: "walk", z: "散步" }, { w: "bark", z: "吠" },
    { w: "tail", z: "尾巴" }, { w: "fur", z: "毛" },
    { w: "weigh", z: "重（動詞）" }, { w: "centimetre", z: "厘米" },
    { w: "kilogram", z: "公斤" }, { w: "gram", z: "克" }
  ],
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上。",
      bank: ["cage", "bowl", "brush", "vet", "hamster", "rabbit", "collar", "lead", "tail"],
      items: [
        { text: "A ___ is a small animal with soft fur and long ears.", answers: ["rabbit"], exp: "rabbit = 兔子，有長耳朵。" },
        { text: "We keep the bird in a ___ .", answers: ["cage"], exp: "cage = 籠子。" },
        { text: "Give the dog some water in this ___ .", answers: ["bowl"], exp: "bowl = 碗。" },
        { text: "I ___ my dog every day so her fur is clean.", answers: ["brush"], exp: "brush = 梳毛。" },
        { text: "The ___ looks after sick animals.", answers: ["vet"], exp: "vet = 獸醫。" },
        { text: "My cat wears a red ___ with a small bell on it.", answers: ["collar"], exp: "collar = 頸圈。" }
      ]
    },
    {
      name: "B. 語法練習",
      badge: "Grammar",
      instr: "選擇正確的字詞，或改正畫線的部分。",
      items: [
        { text: "How ___ do you walk your dog?", mode: "choice", options: ["often", "many", "much"], answer: 0, exp: "問次數用 how often。" },
        { text: "I ___ brush my dog. I do it every day.", mode: "choice", options: ["never", "always", "seldom"], answer: 1, exp: "every day = 每天，所以 always。" },
        { text: "She ___ eats fish. She does not like it.", mode: "choice", options: ["always", "often", "never"], answer: 2, exp: "不喜歡魚 → never（從不）。" },
        { text: "He ___ happy when he plays with his dog.", mode: "choice", options: ["always is", "is always", "always"], answer: 1, exp: "be 動詞後面放頻率副詞：is always happy。" },
        { text: "How ___ is your dog? He is 100 centimetres tall.", mode: "choice", options: ["tall", "heavy", "old"], answer: 0, exp: "答句用 tall，所以問 how tall。" },
        { text: "How ___ is your cat? She weighs 3 kilograms.", mode: "choice", options: ["tall", "heavy", "often"], answer: 1, exp: "答句說重量，所以問 how heavy。" },
        { text: "He <u>is</u> 9 kilograms.", answers: ["weighs"], exp: "體重用動詞 weigh：He weighs 9 kilograms." },
        { text: "My hamster <u>weigh</u> 130 grams.", answers: ["weighs"], exp: "主語 My hamster 是單數，動詞加 s。" },
        { text: "How often ___ she brush her dog?", mode: "choice", options: ["do", "does", "is"], answer: 1, exp: "主語 she 用 does。" },
        { text: "She ___ plays with her cat. She is too busy.", mode: "choice", options: ["seldom", "always", "often"], answer: 0, exp: "太忙 → 很少玩，用 seldom。" }
      ]
    },
    {
      name: "C. 看表格完成問答",
      badge: "Q & A",
      instr: "Leo 一星期照顧小貓 Pussy 的情況如下，填上正確的字。",
      table: { head: ["Leo's week", "How often"], rows: [
        ["give her a bath", "Saturday only（一星期一次）"],
        ["take her to the park", "never（沒有 ✓）"],
        ["feed her", "every day（七天都有 ✓）"],
        ["play with her", "six days a week（Sun 沒有 ✓）"]
      ]},
      items: [
        { text: "A: How ___ does Leo give her a bath?  B: He ___ gives her a bath.", answers: ["often", "sometimes"], exp: "一星期只有星期六一次 → sometimes（有時）。" },
        { text: "A: How often does Leo ___ her to the park?  B: He never ___ her to the park.", answers: ["take", "takes"], exp: "表格沒有 take her to the park 的 ✓ → never。" },
        { text: "A: How often does Leo ___ her?  B: He ___ feeds her.", answers: ["feed", "always"], exp: "七天都有 ✓ → always。" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "My Pet Dog",
        text: "I have a pet dog. His name is Coco. He is three years old. Coco is 45 centimetres tall and he weighs 8 kilograms. He has short brown fur and a red collar. Every morning, I take him to the park. He loves running after a ball. I feed him twice a day, but I only give him a bath once a month. Coco is afraid of water. My sister brushes him every Sunday. Coco seldom barks, but he always wags his tail when he sees us. He is a very happy dog."
      },
      items: [
        { text: "Coco is 45 centimetres tall.", mode: "tf", answer: true, exp: "Coco is 45 centimetres tall and he weighs 8 kilograms." },
        { text: "The writer gives Coco a bath every week.", mode: "tf", answer: false, exp: "文章說 only give him a bath once a month（每月一次）。" },
        { text: "How heavy is Coco?", mode: "choice", options: ["3 kilograms", "8 kilograms", "45 kilograms", "130 grams"], answer: 1, exp: "he weighs 8 kilograms。" },
        { text: "How often does the writer's sister brush Coco?", mode: "choice", options: ["Every day.", "Every Sunday.", "Once a month.", "Never."], answer: 1, exp: "My sister brushes him every Sunday." },
        { text: "Why does Coco only have a bath once a month?", answers: ["Because he is afraid of water.", "Because he is afraid of water", "He is afraid of water.", "He is afraid of water"], exp: "文章說 Coco is afraid of water，所以很少洗澡。" }
      ]
    }
  ]
};
