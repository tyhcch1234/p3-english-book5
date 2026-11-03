/* 總測驗 — mixed revision across Units 1-5 */
window.REVISION = {
  id: "revision",
  title: "總測驗",
  titleZh: "五個單元混合測驗",
  emoji: "🏁",
  color: "#1F6F6B",
  colorLight: "#E4F1EF",
  focus: ["Units 1–5", "閱讀理解", "字詞填充"],
  intro: "綜合五個單元的文法與字詞，共 28 題，建議先完成各單元測驗後再做。",
  quiz: [
    {
      name: "A. 字詞填充",
      badge: "Vocabulary",
      instr: "從字詞盒中選出適當的字詞填在橫線上（每個字詞只用一次）。",
      bank: ["scarecrow", "honey", "vet", "recycling bin", "lanterns", "cherries", "cardboard", "cupcakes"],
      items: [
        { text: "The farmer puts a ___ in the field to keep the birds away.", answers: ["scarecrow"], exp: "Unit 1：scarecrow 稻草人。" },
        { text: "Bees make ___ . It is sweet and yellow.", answers: ["honey"], exp: "Unit 1：honey 來自 bees。" },
        { text: "My rabbit is sick. I take her to the ___ .", answers: ["vet"], exp: "Unit 3：vet 獸醫。" },
        { text: "We should put the plastic bottles in the ___ .", answers: ["recycling bin"], exp: "Unit 4：recycling bin 回收箱。" },
        { text: "At the Mid-Autumn Festival, children play with ___ in the park.", answers: ["lanterns"], exp: "Unit 5：lanterns 燈籠。" },
        { text: "These ___ are small, red and sweet. They grow on trees.", answers: ["cherries"], exp: "Unit 2：cherries 車厘子。" },
        { text: "We made a toy car with ___ boxes.", answers: ["cardboard"], exp: "Unit 4：cardboard 紙板。" },
        { text: "There are twelve ___ in the box. Each one has cream on top.", answers: ["cupcakes"], exp: "Unit 2：cupcakes 杯子蛋糕。" }
      ]
    },
    {
      name: "B. 語法選擇與改錯",
      badge: "Grammar",
      instr: "選擇正確答案，或按指示改正句子。",
      items: [
        { text: "Where ___ milk come from?", mode: "choice", options: ["does", "do", "is"], answer: 0, exp: "milk 不可數 → does。" },
        { text: "It comes ___ cows.", mode: "choice", options: ["from", "in", "to"], answer: 0, exp: "come from = 來自。" },
        { text: "How ___ apples are there?", mode: "choice", options: ["many", "much", "a little"], answer: 0, exp: "apples 可數複數 → how many。" },
        { text: "There is ___ cheese in the fridge.", mode: "choice", options: ["a few", "a little", "many"], answer: 1, exp: "cheese 不可數 → a little。" },
        { text: "Put the adverb in the right place: She never is late for school.", answers: ["She is never late for school."], exp: "頻率副詞放在 be 動詞後面：is never。" },
        { text: "How ___ does your sister feed her fish?", mode: "choice", options: ["often", "tall", "many"], answer: 0, exp: "問次數用 how often。" },
        { text: "My cat ___ 4 kilograms.", mode: "choice", options: ["weigh", "weighs", "is"], answer: 1, exp: "體重用 weighs，主語單數加 s。" },
        { text: "Please turn ___ the lights before you go out.", mode: "choice", options: ["off", "up", "away"], answer: 0, exp: "turn off = 關掉。" },
        { text: "I want ___ a doctor when I grow up.", mode: "choice", options: ["be", "to be", "being"], answer: 1, exp: "want + to + 原形動詞。" },
        { text: "Christmas is ___ December.", mode: "choice", options: ["in", "on", "at"], answer: 0, exp: "月份前用 in。" },
        { text: "We open our presents ___ Christmas Day.", mode: "choice", options: ["in", "at", "on"], answer: 2, exp: "特定日子用 on。" },
        { text: "He wants to <u>borrows</u> a book from the library.", answers: ["borrow"], exp: "to 後面用原形動詞 borrow。" }
      ]
    },
    {
      name: "C. 句子與問答",
      badge: "Q & A",
      instr: "按要求完成句子，每題填一個字或寫一句話。",
      items: [
        { text: "Join: The goat is small. The goat is strong.", answers: ["The goat is small but strong.", "The goat is small but it is strong."], exp: "small 與 strong 一弱一強，方向相反 → but。" },
        { text: "Would you like tea ___ orange juice?", mode: "choice", options: ["or", "and", "but"], answer: 0, exp: "提供選擇用 or。" },
        { text: "A: How ___ is your dog?  B: He ___ 12 kilograms.", answers: ["heavy", "weighs"], exp: "問體重用 how heavy；答句用 weighs。" },
        { text: "A: ___ do you celebrate your birthday?  B: I celebrate it ___ May.", answers: ["When", "in"], exp: "問時間用 When；月份前用 in。" }
      ]
    },
    {
      name: "D. 閱讀理解",
      badge: "Reading",
      instr: "細讀文章，然後回答問題。",
      passage: {
        title: "A Busy Saturday",
        text: "Last Saturday was a busy day for Kelly. In the morning, she went to her grandparents' farm in Yuen Long. There were cows, goats and a big pond on the farm. Her grandfather showed her how to feed the hens. Kelly picked up the eggs and put them in a basket. At noon, the family had a picnic under a tree. They ate sandwiches, cherries and a little cheese. In the afternoon, Kelly and her cousin cleaned up the farm. They picked up the rubbish and put it in the recycling bin. Kelly wanted to give away her old toys to the children on the farm. 'Would you like to come again next Saturday?' asked her grandmother. 'I would like to come every week!' said Kelly."
      },
      items: [
        { text: "Kelly went to a farm on Saturday.", mode: "tf", answer: true, exp: "Last Saturday … she went to her grandparents' farm。" },
        { text: "Kelly put the eggs in a box.", mode: "tf", answer: false, exp: "文章說 put them in a basket（籃子），不是 box。" },
        { text: "What did the family eat at the picnic?", mode: "choice", options: ["Rice dumplings and moon cakes.", "Sandwiches, cherries and cheese.", "Bread and honey.", "Cupcakes and biscuits."], answer: 1, exp: "They ate sandwiches, cherries and a little cheese。" },
        { text: "Where did Kelly put the rubbish?", mode: "choice", options: ["In a basket.", "In the pond.", "In the recycling bin.", "Under the tree."], answer: 2, exp: "They picked up the rubbish and put it in the recycling bin。" },
        { text: "How often does Kelly want to visit the farm?", mode: "choice", options: ["Once a month.", "Every Saturday.", "Every week.", "Every day."], answer: 2, exp: "她說 I would like to come every week!" },
        { text: "What did Kelly want to give away?", answers: ["Her old toys.", "Her old toys", "Old toys.", "Old toys", "Her toys.", "Her toys"], exp: "Kelly wanted to give away her old toys to the children on the farm。" }
      ]
    }
  ]
};
