/* Unit 1 — On the farm */
window.UNITS = window.UNITS || {};
window.UNITS.u1 = {
  id: "u1",
  no: 1,
  title: "On the farm",
  titleZh: "農場",
  emoji: "🚜",
  color: "#3F7D5A",
  colorLight: "#E8F2EC",
  focus: ["Where … come from?", "and / but"],
  intro: "學會問「東西從哪裡來」，並用 and / but 把兩句連起來。",
  notes: [
    {
      h: "Where does / do … come from?（問來源）",
      lead: "用 where 和 come from 問物件來自哪裡。",
      blocks: [
        { type: "rule", x: "<b>Where does</b> + 單數／不可數名詞 + <b>come from?</b> → <b>It comes from</b> …<br><b>Where do</b> + 複數名詞 + <b>come from?</b> → <b>They come from</b> …" },
        { type: "table", head: ["問句 Question", "答句 Answer"], rows: [
          ["Where <b>does</b> butter come from?", "It <b>comes from</b> cows."],
          ["Where <b>does</b> honey come from?", "It <b>comes from</b> bees."],
          ["Where <b>do</b> eggs come from?", "They <b>come from</b> hens."],
          ["Where <b>do</b> vegetables come from?", "They <b>come from</b> seeds."]
        ]},
        { type: "zh", x: "口訣：<b>does → comes</b>（單數／不可數），<b>do → come</b>（複數）。主語是 It 用 comes，是 They 用 come。" },
        { type: "h4", x: "常用配對（考試常出）" },
        { type: "table", head: ["東西 Thing", "來源 Comes from"], rows: [
          ["butter / cheese / milk", "cows"],
          ["honey", "bees"],
          ["eggs", "hens"],
          ["wool", "sheep"],
          ["cotton", "cotton plants"],
          ["paper", "trees / wood"],
          ["sugar", "sugar cane"],
          ["salt", "the sea"],
          ["coffee", "coffee beans"],
          ["pork", "pigs"],
          ["bananas", "banana trees"]
        ]},
        { type: "warn", x: "千萬不要把 <b>come from</b> 寫成 come to 或 come in：<br>✗ Where does paper come <u>to</u>? ／ ✗ It comes <u>in</u> wood.<br>✓ Where does paper come <b>from</b>? ／ ✓ It comes <b>from</b> wood." },
        { type: "egrid", good: ["Where does wool come from?<br>It comes from sheep."], bad: ["How does wool come from?<br>It come from sheep."] },
        { type: "h4", x: "問「在哪裡做某事」" },
        { type: "p", x: "Where 也可以問地點，答句用 <b>in / on / at</b> + 地方：" },
        { type: "ul", x: [
          "Where do farm animals sleep? — <b>In a barn.</b>",
          "Where does a farmer's family live? — <b>In a house on the farm.</b>",
          "Where do ducks swim? — <b>In a pond.</b>"
        ]}
      ]
    },
    {
      h: "and / but（連接詞）",
      lead: "用 and 連接意思相近的句子，用 but 連接意思相反的句子。",
      blocks: [
        { type: "rule", x: "<b>and</b> = 兩件事都一樣方向（同類、同樣好、同樣壞）<br><b>but</b> = 兩件事方向相反（一好一壞、一大一小）" },
        { type: "egrid", good: [
          "The cow is big <b>and</b> heavy.",
          "The horse is strong <b>but</b> slow.",
          "The hen is healthy <b>and</b> it lays many eggs.",
          "The gate is old <b>but</b> it works well."
        ], bad: [
          "The cow is big <b>but</b> heavy.（兩個都是「大」的方向，用 and）",
          "The horse is strong <b>and</b> slow.（一好一壞，用 but）"
        ]},
        { type: "zh", x: "合併句子三步：① 找出兩句<b>相同的主語</b>；② 第二句用 <b>it / they</b> 代替，或直接省略主語；③ 中間加 and 或 but。<br>例：The pond is large. The pond is clean. → The pond is large <b>and clean</b>." },
        { type: "h4", x: "動詞要跟主語配合" },
        { type: "egrid", good: ["The hen is healthy and it <b>lays</b> many eggs."], bad: ["The hen is healthy and it <b>lay</b> many eggs."] },
        { type: "warn", x: "不要用逗號代替 and / but：<br>✗ The fence is new<b>,</b> long. ✓ The fence is new <b>and</b> long." }
      ]
    },
    {
      h: "單元字詞 Vocabulary",
      lead: "農場動物、農作物與人物。點 🔊 可以聽發音。",
      blocks: [{ type: "vocab" }]
    }
  ],
  vocab: [
    { w: "farm", z: "農場" }, { w: "farmer", z: "農夫" },
    { w: "barn", z: "穀倉" }, { w: "field", z: "田地" },
    { w: "fence", z: "籬笆" }, { w: "gate", z: "閘門" },
    { w: "pond", z: "池塘" }, { w: "tractor", z: "拖拉機" },
    { w: "scarecrow", z: "稻草人" }, { w: "crops", z: "農作物" },
    { w: "bull", z: "公牛" }, { w: "cock", z: "公雞" },
    { w: "hen", z: "母雞" }, { w: "donkey", z: "驢" },
    { w: "goat", z: "山羊" }, { w: "sheep", z: "綿羊" },
    { w: "wool", z: "羊毛" }, { w: "honey", z: "蜂蜜" },
    { w: "bees", z: "蜜蜂" }, { w: "cotton", z: "棉花" },
    { w: "sugar cane", z: "甘蔗" }, { w: "seeds", z: "種子" },
    { w: "vegetables", z: "蔬菜" }, { w: "pork", z: "豬肉" }
  ],
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上。",
      bank: ["farmer", "tractor", "scarecrow", "fence", "barn", "pond", "wool", "honey", "seeds"],
      items: [
        { text: "A ___ stands in the field and keeps the birds away.", answers: ["scarecrow"], exp: "scarecrow = 稻草人，用來趕走雀鳥。" },
        { text: "The ___ gets up early and works on the farm every day.", answers: ["farmer"], exp: "在農場工作的人是 farmer。" },
        { text: "Sheep give us ___ . We make jumpers from it.", answers: ["wool"], exp: "羊毛 wool 來自 sheep。" },
        { text: "Bees make ___ . It is sweet.", answers: ["honey"], exp: "蜜蜂造蜂蜜。" },
        { text: "Ducks swim in the ___ .", answers: ["pond"], exp: "鴨子在池塘游泳。" },
        { text: "We plant ___ in the soil and they grow into plants.", answers: ["seeds"], exp: "seeds = 種子，種在泥土裡會長成植物。" }
      ]
    },
    {
      name: "B. 語法練習",
      badge: "Grammar",
      instr: "選擇正確的字詞，或改正畫線的部分。",
      items: [
        { text: "Where ___ honey come from?", mode: "choice", options: ["does", "do", "is"], answer: 0, exp: "honey 是不可數名詞，用 does。" },
        { text: "It ___ from bees.", mode: "choice", options: ["come", "comes", "coming"], answer: 1, exp: "主語 It 是單數，動詞加 s → comes。" },
        { text: "Where ___ eggs come from?", mode: "choice", options: ["does", "do", "is"], answer: 1, exp: "eggs 是複數，用 do。" },
        { text: "They ___ from hens.", mode: "choice", options: ["comes", "come", "coming"], answer: 1, exp: "主語 They 是複數，用 come。" },
        { text: "Where does paper come <u>to</u>?", answers: ["from"], exp: "固定說法 come from（來自），不是 come to。" },
        { text: "It comes <u>in</u> wood.", answers: ["from"], exp: "來源用 from：It comes from wood." },
        { text: "Join: The bull is lazy. The bull is naughty.", answers: ["The bull is lazy and naughty.", "The bull is lazy and it is naughty."], exp: "兩句都是負面描述，方向相同 → 用 and，並省略重複的主語。" },
        { text: "Join: The cock is small. The cock makes loud sounds.", answers: ["The cock is small but it makes loud sounds.", "The cock is small but makes loud sounds."], exp: "「小」和「聲音大」方向相反 → 用 but。" },
        { text: "Join: The pond is large. The pond is clean.", answers: ["The pond is large and clean.", "The pond is large and it is clean."], exp: "large 和 clean 都是正面描述 → 用 and。" },
        { text: "The tractor is noisy ___ dirty.", mode: "choice", options: ["and", "but", "or"], answer: 0, exp: "noisy 和 dirty 方向相同（都是缺點），用 and。" }
      ]
    },
    {
      name: "C. 看資料完成問答",
      badge: "Q & A",
      instr: "根據表格，填上正確的字。",
      bank: ["does", "do", "comes", "come", "Where", "It"],
      table: { head: ["Thing", "Comes from"], rows: [["butter", "cows"], ["eggs", "hens"], ["honey", "bees"], ["wool", "sheep"]] },
      items: [
        { text: "A: ___ butter come from?  B: It ___ from cows.", answers: ["Where does", "comes"], exp: "butter 不可數 → Where does …? 答句 It comes from cows." },
        { text: "A: Where ___ eggs come from?  B: They come ___ hens.", answers: ["do", "from"], exp: "eggs 複數 → do；來源用 from。" },
        { text: "A: ___ does honey come from?  B: ___ comes from bees.", answers: ["Where", "It"], exp: "問來源用 Where；honey 不可數，用 It 代替。" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "Tom's Farm",
        text: "Tom lives on a small farm in Yuen Long. There are many animals on the farm. The cows give milk, and the hens lay eggs. Tom's father is a farmer. He gets up at six o'clock every morning and feeds the animals. There is a big pond on the farm. Ducks swim in the pond, but the goats do not like water. They like running on the grass. A scarecrow stands in the field. It keeps the birds away from the vegetables. Tom helps his father after school. He picks up the eggs and puts them in a basket. Tom loves his farm."
      },
      items: [
        { text: "Tom lives on a big farm in Yuen Long.", mode: "tf", answer: false, exp: "文章第一句說 a small farm，不是 big farm。" },
        { text: "The goats like swimming in the pond.", mode: "tf", answer: false, exp: "文章說 the goats do not like water，喜歡在草地上跑。" },
        { text: "What does the scarecrow do?", mode: "choice", options: ["It keeps the birds away.", "It feeds the cows.", "It lays eggs.", "It picks up the eggs."], answer: 0, exp: "It keeps the birds away from the vegetables." },
        { text: "When does Tom's father get up?", mode: "choice", options: ["At five o'clock.", "At six o'clock.", "At seven o'clock.", "After school."], answer: 1, exp: "He gets up at six o'clock every morning." },
        { text: "Where do the ducks swim?", answers: ["In the pond.", "In the pond", "The pond.", "The pond"], exp: "Ducks swim in the pond. 答句可用 In the pond." }
      ]
    }
  ]
};
