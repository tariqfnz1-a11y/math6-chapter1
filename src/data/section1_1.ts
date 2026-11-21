import { LessonSectionData } from '../types/textbook';

export const SECTION_1_1_DATA: LessonSectionData = {
  id: 'section-1-1',
  sectionNumber: '1.1',
  title: 'Factors and Multiples',
  pageRef: 'Textbook pp. 1–3 · PDF pp. 4–6',
  motivatingIntro: {
    heading: 'Arranging, Sharing, and Packing Without Leftovers',
    story:
      'Imagine you have 18 treats to place in neat rows on a tray. You can line them up in 3 equal rows of 6, or 6 equal rows of 3, and every single treat fits cleanly with zero leftovers! On the other hand, if you buy packs of 5 boxes at a store, your total grows step by step: 5 boxes, 10 boxes, 15 boxes, 20 boxes. These two everyday ideas—splitting numbers cleanly and multiplying numbers outward—are what Factors and Multiples are all about.',
    guidingQuestion:
      'How can we tell quickly whether one number divides another completely, and how do we list every factor or multiple without missing any?',
  },
  learningObjectives: [
    'Define a factor using both multiplication and exact division (zero remainder).',
    'List all factors of a number systematically using factor pairs and know when to stop.',
    'Define a multiple using multiplication and division (dividend as a multiple of its factor).',
    'Verify whether a number is a factor or a multiple of another using long division.',
    'Identify patterns in even and odd numbers under addition, subtraction, multiplication, and division.',
  ],
  subsections: [
    {
      code: '1.1.1',
      title: 'Defining a Factor',
      pageRef: 'Textbook pp. 1–2',
      conceptExplanation: [
        'Look at the multiplication fact 6 × 3 = 18. Because we multiplied 6 and 3 together to get the product 18, both 6 and 3 are called factors of 18.',
        'We can also understand a factor through division. When we divide a dividend by a divisor, we get a quotient and a remainder. If you divide 12 by 1, 2, 3, 4, 6, and 12, the remainder in every single case is zero (0).',
        'Whenever a divisor divides the dividend completely leaving no remainder, that divisor is a factor of the dividend. Notice also that every number greater than 1 has at least two factors: the number 1 and itself.',
        'To list all factors of a bigger number like 36 or 40 without guessing, write multiplication pairs starting from 1 × number, then test 2, 3, 4, and so on. Stop finding factors when the numbers start repeating!',
      ],
      formalDefinition:
        '“Factors are the numbers which we multiply to get another number say, product or total.”',
      secondaryDefinition:
        '“A factor is a number which divides the dividend completely leaving no remainder.”',
      formulaHighlight: 'dividend = quotient × divisor + remainder   (Factor when remainder = 0)',
      divisionDemo: {
        dividend: 12,
        divisors: [1, 2, 3, 4, 6, 12],
      },
      rememberNotes: [
        'Every number greater than 1 has at least two factors: the number 1 and itself.',
        'Stop finding factors when the numbers in your factor pairs start repeating.',
      ],
    },
    {
      code: '1.1.2',
      title: 'Defining a Multiple',
      pageRef: 'Textbook pp. 2–3',
      conceptExplanation: [
        'Suppose each pack holds 5 boxes. One pack gives 1 × 5 = 5 boxes, two packs give 2 × 5 = 10 boxes, three packs give 3 × 5 = 15 boxes, and four packs give 4 × 5 = 20 boxes. The numbers 5, 10, 15, 20 are multiples of 5.',
        'Now connect multiples back to division. Consider 16 ÷ 2 = 8 (remainder 0) and 18 ÷ 3 = 6 (remainder 0). Because 2 is a factor of 16, the dividend 16 is a multiple of 2. Similarly, because 3 is a factor of 18, the dividend 18 is a multiple of 3.',
        'Unlike factors—which form a finite, limited list—a number has unlimited multiples! Every number is a multiple of itself (1 × n = n), and every natural multiple of a given number is greater than or equal to the given number.',
      ],
      formalDefinition:
        '“A multiple is the product or total which we get when we multiply one number by another number.”',
      secondaryDefinition:
        '“Multiple of a given number is the dividend, for which the given number is its factor.”',
      formulaHighlight: 'Dividend ÷ Divisor = Quotient   (Remainder = 0)',
      rememberNotes: [
        'To find the multiples of any given number, simply multiply the given number by 1, 2, 3, 4, 5, ...',
        'A number has unlimited multiples, and every number is a multiple of itself.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Factor',
      definition: 'A number that divides the dividend completely leaving zero (0) remainder, or one of the numbers multiplied to form a product.',
      example: 'In 6 × 3 = 18, both 6 and 3 are factors of 18.',
    },
    {
      term: 'Multiple',
      definition: 'The product obtained when a given number is multiplied by another whole number (1, 2, 3, ...).',
      example: 'Multiples of 5 are 5, 10, 15, 20, 25, ...',
    },
    {
      term: 'Dividend',
      definition: 'The number being divided in a division expression.',
      example: 'In 42 ÷ 3 = 14, the dividend is 42.',
    },
    {
      term: 'Divisor',
      definition: 'The number by which the dividend is divided.',
      example: 'In 42 ÷ 3 = 14, the divisor is 3.',
    },
    {
      term: 'Quotient',
      definition: 'The whole-number result obtained after dividing the dividend by the divisor.',
      example: 'In 42 ÷ 3 = 14, the quotient is 14.',
    },
    {
      term: 'Remainder',
      definition: 'The amount left over after division when the divisor does not divide the dividend evenly.',
      example: 'In 42 ÷ 5 = 8 with remainder 2, the remainder is 2 (not 0, so 5 is not a factor of 42).',
    },
  ],
  workedExamples: [
    {
      id: 'example-1',
      number: 1,
      pageRef: 'Textbook p. 1',
      title: 'Which of the given numbers are the factors of 42? (i) 3  (ii) 5',
      methodName: 'Long Division & Remainder Check',
      parts: [
        {
          label: '(i) Testing 3',
          prompt: 'Check whether 3 is a factor of 42.',
          divisionLayout: {
            divisor: 3,
            dividend: 42,
            quotient: 14,
            remainder: 0,
            steps: ['3 × 1 = 3; subtract from 4 to get 1', 'Bring down 2 to make 12', '3 × 4 = 12; 12 − 12 = 0'],
          },
          steps: [
            'Divide 42 by 3: 42 ÷ 3 = 14 with remainder 0.',
            'Write the relation: dividend = quotient × divisor + remainder.',
            '42 = 14 × 3 + 0.',
          ],
          conclusion: 'Since the remainder is zero (0), both 3 and 14 are factors of 42.',
          note: 'Textbook print note: The textbook writes “so, 14 is factor of 42” because 14 × 3 = 42—and because 3 divided 42 with remainder 0, 3 is indeed the factor tested in part (i).',
        },
        {
          label: '(ii) Testing 5',
          prompt: 'Check whether 5 is a factor of 42.',
          divisionLayout: {
            divisor: 5,
            dividend: 42,
            quotient: 8,
            remainder: 2,
            steps: ['5 × 8 = 40', '42 − 40 = 2 (remainder)'],
          },
          steps: [
            'Divide 42 by 5: 42 ÷ 5 = 8 with remainder 2.',
            'Write the relation: dividend = quotient × divisor + remainder.',
            '42 = 8 × 5 + 2.',
          ],
          conclusion: 'Since the remainder is not zero (0), 5 is not a factor of 42.',
        },
      ],
    },
    {
      id: 'example-2',
      number: 2,
      pageRef: 'Textbook p. 2',
      title: 'Write all the factors of 36 and 40.',
      methodName: 'Factor-Pair Multiplication Method',
      factorPairs: [
        {
          target: 36,
          pairs: [
            [1, 36],
            [2, 18],
            [3, 12],
            [4, 9],
            [6, 6],
          ],
          factors: [1, 2, 3, 4, 6, 9, 12, 18, 36],
        },
        {
          target: 40,
          pairs: [
            [1, 40],
            [2, 20],
            [4, 10],
            [5, 8],
          ],
          factors: [1, 2, 4, 5, 8, 10, 20, 40],
        },
      ],
    },
    {
      id: 'example-3',
      number: 3,
      pageRef: 'Textbook p. 3',
      title: 'Which of the following numbers is a multiple of 6? (i) 42  (ii) 52  (iii) 70',
      methodName: 'Division Remainder Test',
      parts: [
        {
          label: '(i) 42',
          prompt: 'Test whether 42 is a multiple of 6.',
          divisionLayout: {
            divisor: 6,
            dividend: 42,
            quotient: 7,
            remainder: 0,
            steps: ['6 × 7 = 42', '42 − 42 = 0'],
          },
          steps: ['Divide 42 by 6.', '6 goes into 42 exactly 7 times with remainder 0.'],
          conclusion: 'So, 42 is a multiple of 6 because 6 divides 42 completely.',
        },
        {
          label: '(ii) 52',
          prompt: 'Test whether 52 is a multiple of 6.',
          divisionLayout: {
            divisor: 6,
            dividend: 52,
            quotient: 8,
            remainder: 4,
            steps: ['6 × 8 = 48', '52 − 48 = 4 (remainder)'],
          },
          steps: ['Divide 52 by 6.', '6 × 8 = 48, leaving a remainder of 4.'],
          conclusion: '52 is not a multiple of 6 because the remainder is 4.',
        },
        {
          label: '(iii) 70',
          prompt: 'Test whether 70 is a multiple of 6.',
          divisionLayout: {
            divisor: 6,
            dividend: 70,
            quotient: 11,
            remainder: 4,
            steps: ['6 × 1 = 6; subtract from 7 to get 1', 'Bring down 0 to make 10', '6 × 1 = 6; 10 − 6 = 4 (remainder)'],
          },
          steps: ['Divide 70 by 6.', 'Quotient is 11 and remainder is 4.'],
          conclusion: '70 is not a multiple of 6 because the remainder is 4.',
        },
      ],
    },
    {
      id: 'example-4',
      number: 4,
      pageRef: 'Textbook p. 3',
      title: 'List the first six multiples of 7, 9, and 12.',
      methodName: 'Sequential Multiplication (× 1 to × 6)',
      multipleColumns: [
        {
          base: 7,
          rows: [
            { multiplier: 1, product: 7 },
            { multiplier: 2, product: 14 },
            { multiplier: 3, product: 21 },
            { multiplier: 4, product: 28 },
            { multiplier: 5, product: 35 },
            { multiplier: 6, product: 42 },
          ],
          listText: 'Hence, 7, 14, 21, 28, 35 and 42 are the first six multiples of 7.',
        },
        {
          base: 9,
          rows: [
            { multiplier: 1, product: 9 },
            { multiplier: 2, product: 18 },
            { multiplier: 3, product: 27 },
            { multiplier: 4, product: 36 },
            { multiplier: 5, product: 45 },
            { multiplier: 6, product: 54 },
          ],
          listText: 'Hence, 9, 18, 27, 36, 45 and 54 are the first six multiples of 9.',
        },
        {
          base: 12,
          rows: [
            { multiplier: 1, product: 12 },
            { multiplier: 2, product: 24 },
            { multiplier: 3, product: 36 },
            { multiplier: 4, product: 48 },
            { multiplier: 5, product: 60 },
            { multiplier: 6, product: 72 },
          ],
          listText: 'Hence, 12, 24, 36, 48, 60 and 72 are the first six multiples of 12.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Arranging Classroom Desks or Chairs',
      description:
        'If a Grade 6 class has 36 students, the teacher can arrange desks in 1×36, 2×18, 3×12, 4×9, or 6×6 neat rectangular rows because those numbers are all factors of 36.',
      mathLink: 'Factors keep groups equal with no one left sitting alone.',
    },
    {
      title: 'Buying Packed Items at a Store',
      description:
        'Egg cartons hold 12 eggs, juice packs come in boxes of 6, and pencil packs hold 5 pencils. Counting total items across 1, 2, 3, or 4 packs uses multiples.',
      mathLink: 'Multiples tell you exact totals you can buy without opening packs.',
    },
    {
      title: 'Sharing Money or Notes Equally',
      description:
        'If you need to pay Rs. 500 or Rs. 85 using only Rs. 5 or Rs. 10 notes, knowing multiples of 5 and 10 tells you right away whether exact payment is possible.',
      mathLink: 'Any number ending in 5 has 5 as a factor; any number > 0 ending in 0 has 2, 5, and 10 as factors.',
    },
  ],
  funFacts: [
    'All even numbers will always have the number 2 as their factor.',
    'All numbers that end with 5 will always have 5 as their factor.',
    'All numbers greater than 0 that end with a “0” will have 2, 5, and 10 as their factors.',
    'Factors are always whole numbers (or integers).',
    'A number has unlimited multiples—they never stop!',
    'Every number is a multiple of itself, and every multiple of a given number is greater than or equal to the given number.',
  ],
  classroomActivity: {
    title: 'Matchstick Multiples & Even/Odd Thinking Time',
    textbookRef: 'Textbook Activity -1 (p. 4) & Thinking Time (p. 3)',
    materials: ['1 matchbox (or paper strips/straws)', 'Notebook and pencil', 'A partner for parity testing'],
    steps: [
      'Bring a matchbox to your desk and form groups of 3 matchsticks side by side to build the first five multiples of 3 (3, 6, 9, 12, 15).',
      'With your partner, check the textbook’s addition table: Even + Even = Even, Even + Odd = Odd, Odd + Even = Odd, Odd + Odd = Even.',
      'Now test what happens when you replace addition (+) with subtraction (−)! Does Even − Odd still give Odd? Does Odd − Odd still give Even?',
      'Next, test the multiplication table (Even × Even = Even, Even × Odd = Even, Odd × Even = Even, Odd × Odd = Odd) and ask: what happens if we replace × with division (÷)? Hint: try 6 ÷ 2 vs 6 ÷ 4 vs 9 ÷ 3!',
    ],
    discussionPrompt:
      'Why does subtraction keep the same even/odd pattern as addition, while division does not always give a whole-number even or odd result?',
  },
  homeActivity: {
    title: 'Kitchen Button & Coin Array Explorer',
    materials: ['24 small buttons, dry kidney beans (rajma), bottle caps, or Rs. 5 coins', 'A sheet of paper and pencil'],
    steps: [
      'Count out 12 buttons (or beans) on a flat table. Try arranging all 12 into equal rows: 1 row of 12, 2 rows of 6, 3 rows of 4. Notice how 5 rows does NOT make a neat rectangle because 2 buttons are left over!',
      'Repeat with 18 items and write down every factor pair that makes a complete rectangle without leftovers.',
      'Now make stacks of 5 coins (or 5 beans). Build 1 stack, 2 stacks, 3 stacks, and 4 stacks, and write down the multiples of 5 you created.',
    ],
    recordingTip:
      'Draw a quick sketch of one rectangle that worked (factor) and one attempt that had leftovers (not a factor).',
  },
  practicalActivities: [
    {
      id: 'act-1-matchsticks',
      number: 1,
      category: 'group',
      categoryLabel: 'Classroom Group Activity',
      settingInfo: 'Groups of 4 students · Textbook Activity -1 (p. 4) · 15 min',
      title: 'Matchstick Multiples & Equal-Bundle Factors',
      learningPurpose:
        'Experience how multiples grow by adding equal groups and how factors divide a bundle completely with zero leftover sticks.',
      materialsRequired: [
        '1 ordinary matchbox (or dry neem twigs / paper straws)',
        'Chalk or rough notebook',
        'Pencil to record totals',
      ],
      instructions: [
        'Sit in groups of 4 around one desk. Open one matchbox and count out 24 matchsticks.',
        'Part A (Multiples — Textbook Activity -1): Place 3 matchsticks side by side to make 1 group. Add a second group of 3, then a third, fourth, and fifth group. Count the total after each step (3, 6, 9, 12, 15).',
        'Part B (Factors): Take all 24 matchsticks together. Try tying or grouping them into bundles of 2, 3, 4, 5, 6, and 8.',
        'Record in your notebook which bundle sizes leave zero single sticks behind and which bundle size leaves sticks over.',
      ],
      expectedObservation:
        'Counting groups of 3 produces 3, 6, 9, 12, 15, 18, 21, 24. When grouping 24 sticks into bundles of 2, 3, 4, 6, or 8, every stick fits neatly; when trying bundles of 5, you get 4 bundles and 4 leftover matchsticks.',
      mathematicalConclusion:
        'Multiplying a base group size (3) by 1, 2, 3, 4, ... builds multiples of 3. A number is a factor of 24 only when it splits all 24 matchsticks into equal bundles with remainder 0 (so 2, 3, 4, 6, 8 are factors of 24, while 5 is not).',
      reflectionQuestions: [
        'If your group starts with 18 matchsticks instead of 24, which bundle sizes will leave zero matchsticks over?',
        'Why is 24 both a multiple of 3 and a multiple of 8 at the same time?',
      ],
      illustrationType: 'matchsticks',
    },
    {
      id: 'act-2-paper-strip',
      number: 2,
      category: 'individual',
      categoryLabel: 'Individual Activity',
      settingInfo: 'Individual desk work · 10–15 min',
      title: 'Paper Strip Folding & Exact-Length Testing',
      learningPurpose:
        'Understand factors visually as equal parts that fit inside a whole strip length with no leftover margin.',
      materialsRequired: [
        '3 strips of rough notebook paper (cut 24 cm long, 3 cm wide)',
        '1 school ruler (cm scale) and pencil',
        'Scissors (optional, or fold and crease by hand)',
      ],
      instructions: [
        'Measure and mark every 1 cm along your 24 cm paper strip using a ruler, making 24 equal 1-cm boxes.',
        'Fold the strip cleanly in half (2 equal parts). Measure the length of each folded section (12 cm) and check if any paper hangs over.',
        'Take a second strip and fold it into 3 equal parts (8 cm each) or 4 equal parts (6 cm each).',
        'Now try marking 5-cm steps along the third 24 cm strip (5, 10, 15, 20). Observe the extra piece left at the end!',
      ],
      expectedObservation:
        'Folds of 12 cm, 8 cm, 6 cm, 4 cm, 3 cm, and 2 cm meet the end of the 24 cm strip exactly. Stepping by 5 cm reaches 20 cm after 4 steps and leaves a 4 cm stub that cannot make another 5 cm fold.',
      mathematicalConclusion:
        'A length is a factor of 24 cm only if equal folds cover the whole 24 cm with 0 cm remainder. Notice that 24 = 4 × 5 + 4 proves 5 is not a factor of 24.',
      reflectionQuestions: [
        'If you cut a 18 cm paper strip instead, can you fold it into exact 4 cm sections? Why or why not?',
        'What happens to the size of each section when you increase the number of equal folds?',
      ],
      illustrationType: 'paper-strip',
    },
    {
      id: 'act-3-number-cards',
      number: 3,
      category: 'pair',
      categoryLabel: 'Pair-Work Challenge',
      settingInfo: 'Pairs · Textbook Thinking Time (p. 3) · 15 min',
      title: 'Number Card Parity & Factor Duel',
      learningPurpose:
        'Test factor/multiple pairs and verify how even and odd numbers behave under addition, subtraction, multiplication, and division.',
      materialsRequired: [
        '20 small number cards cut from an old notebook cover or chart paper (numbered 1 to 20)',
        'Rough notebook and pencil for keeping score',
      ],
      instructions: [
        'Shuffle the cards numbered 1 to 20 face down between you and your partner.',
        'Round 1 (Factor & Multiple Duel): Each partner draws one card. Check whether the smaller number is a factor of the larger number (remainder = 0). If yes, explain why using division and score 1 point!',
        'Round 2 (Parity Check — Thinking Time): Draw two cards and predict before calculating whether A + B and A − B will be Even or Odd, and whether A × B will be Even or Odd.',
        'Round 3 (Division Trap): Divide the larger card by the smaller card. Notice whether Even ÷ Even always gives a whole even number (try 12 ÷ 4, 6 ÷ 2, and 6 ÷ 4).',
      ],
      expectedObservation:
        'Odd + Odd and Even + Even always produce an Even answer, while Odd + Even always gives Odd—and subtraction follows the exact same rule! However, dividing two numbers (like 6 ÷ 4 or 10 ÷ 3) does not always give a whole number.',
      mathematicalConclusion:
        'Addition, subtraction, and multiplication of whole numbers always follow predictable Even/Odd rules, whereas division only gives a whole-number quotient when the divisor is a factor of the dividend.',
      reflectionQuestions: [
        'Why does Odd × Odd always give an Odd product, while Even × Odd gives an Even product?',
        'Give one example of Even ÷ Even that produces an Odd whole number.',
      ],
      illustrationType: 'number-cards',
    },
    {
      id: 'act-4-home-counters',
      number: 4,
      category: 'home',
      categoryLabel: 'Home Activity',
      settingInfo: 'At home with family · Kitchen objects & pocket coins · 15 min',
      title: 'Rajma, Buttons & Rs. 5 / Rs. 10 Coin Trays',
      learningPurpose:
        'Connect rectangular arrays at home to factor pairs, and connect Pakistani coins to the ending-digit rules for factors 2, 5, and 10.',
      materialsRequired: [
        '24 dried kidney beans (rajma), chickpeas (chana), shirt buttons, or plastic bottle caps',
        'A few Rs. 5 coins and Rs. 10 notes/coins (with a parent’s permission)',
        'Notebook and pencil',
      ],
      instructions: [
        'Count out 18 beans or buttons on a tray or table. Arrange all 18 into complete rectangular rows with no item sticking out: try 1 row of 18, 2 rows of 9, and 3 rows of 6.',
        'Try arranging the 18 beans into 4 equal rows and 5 equal rows. Write down how many leftover beans sit outside the rectangle.',
        'Now place Rs. 5 coins one by one and record the running total: Rs. 5, 10, 15, 20, 25, 30. Look at the last digit of every amount!',
        'Next stack Rs. 10 coins/notes (10, 20, 30, 40, 50) and notice which numbers divide every stack cleanly.',
      ],
      expectedObservation:
        'All 18 beans form clean rectangles only for 1×18, 2×9, and 3×6 (4 rows leave 2; 5 rows leave 3). Every Rs. 5 multiple ends in 5 or 0, and every Rs. 10 multiple ends in 0 and can also be split into Rs. 2, Rs. 5, and Rs. 10!',
      mathematicalConclusion:
        'Complete rectangles reveal every factor pair of a number. Numbers ending in 5 always have 5 as a factor, and numbers greater than 0 ending in 0 always have 2, 5, and 10 as their factors.',
      reflectionQuestions: [
        'If a shopkeeper’s bill is Rs. 230, why do you immediately know 2, 5, and 10 are all factors of 230 without dividing?',
        'Can you arrange 17 rajma beans into more than one complete rectangle? What does that tell you?',
      ],
      illustrationType: 'home-counters',
    },
    {
      id: 'act-5-real-life',
      number: 5,
      category: 'real-life',
      categoryLabel: 'Real-Life Problem Solving',
      settingInfo: 'Pakistani school & market scenarios · 15–20 min',
      title: 'School Assembly Rows, Eid Mithai & Tuck Shop Packs',
      learningPurpose:
        'Apply factors and multiples to solve everyday organizing, packing, and buying decisions without waste or leftovers.',
      materialsRequired: [
        'Notebook and pencil for long division checks',
        'Classroom whiteboard or slate for sharing solutions',
      ],
      instructions: [
        'Situation 1 (Morning Assembly): 36 students of Class 6 must stand in equal straight rows on the ground. Test which row sizes (3, 4, 5, 6, 9) work so zero students are left standing alone.',
        'Situation 2 (Eid Mithai Packing — Example 1): A sweet shop has 42 gulab jamuns. Should they pack them in boxes of 3 or boxes of 5 so zero gulab jamuns remain unpacked?',
        'Situation 3 (Tuck Shop — Example 3): Pencils/snacks come in sealed packs of 6. Can you buy exactly 42 or 52 items without opening a pack?',
      ],
      expectedObservation:
        'For 36 students, 3, 4, 6, and 9 students per row work evenly, while rows of 5 leave 1 student out. For 42 gulab jamuns, boxes of 3 make 14 full boxes (rem 0), whereas boxes of 5 leave 2 extra. Sealed packs of 6 give 42 (7 packs) cleanly, but 52 leaves 4 leftover.',
      mathematicalConclusion:
        'Whenever we must divide items equally with zero leftovers, we look for factors of the total. Whenever we buy or stack fixed-size packs, only multiples of the pack size can be reached exactly.',
      reflectionQuestions: [
        'If 40 students join the assembly instead of 36, which row sizes now work evenly?',
        'Why is 52 not reachable with packs of 6, and what is the closest multiple of 6 just below and just above 52?',
      ],
      illustrationType: 'real-life-packs',
    },
    {
      id: 'act-6-creative',
      number: 6,
      category: 'creative',
      categoryLabel: 'Creative Challenge',
      settingInfo: 'Individual or pair design task · 20 min',
      title: 'Factor-Garden Tile Designer & “Who Am I?” Riddle',
      learningPurpose:
        'Synthesize factors, factor pairs, and multiples creatively by designing geometric layouts and writing accurate mathematical clues.',
      materialsRequired: [
        '1 page of square-grid / graph paper (or ruled notebook drawn into squares)',
        'Colored pencils or crayons',
        '1 blank card or slip of paper for your riddle',
      ],
      instructions: [
        'Choose a garden area from 24, 30, 36, or 40 square tiles.',
        'On your grid paper, draw and color at least 3 different rectangular gardens that have the exact same total area (for example, 36 = 3×12, 4×9, and 6×6). Label each garden’s width and length as a factor pair!',
        'Next, write a 3-clue “Who Am I?” riddle for a partner using ONLY factor and multiple clues (e.g., “I am a multiple of 6; 4 and 9 are two of my factors; I am between 30 and 40”).',
        'Swap riddles with a classmate and check each other’s garden rectangles.',
      ],
      expectedObservation:
        'Different rectangle shapes (long thin strips vs near-square grids) can hold the exact same number of tiles! Numbers like 24 and 36 allow many garden designs because they have many factor pairs.',
      mathematicalConclusion:
        'Every factor pair (a × b = N) creates a valid a-by-b rectangle of area N, and combining factor and multiple clues uniquely identifies a number.',
      reflectionQuestions: [
        'Which number between 24 and 40 gave you the most different garden shapes (including a square shape)?',
        'How many clues did your partner need before guessing your mystery number with 100% certainty?',
      ],
      illustrationType: 'creative-garden',
    },
  ],
  commonErrors: [
    {
      mistakeTitle: 'Mixing up Factors and Multiples',
      wrongThinking: 'Saying “24 is a factor of 6” or “3 is a multiple of 12”.',
      howToAvoid:
        'Remember: Factors are smaller than or equal to the number (they fit inside it); Multiples are greater than or equal to the number (you multiply outward).',
      exampleFix: '6 is a factor of 24; 24 is a multiple of 6.',
    },
    {
      mistakeTitle: 'Missing Middle Factor Pairs',
      wrongThinking: 'Listing factors of 36 as 1, 2, 3, 6, 12, 18, 36 and forgetting 4 and 9.',
      howToAvoid:
        'Test every counting number in order (1, 2, 3, 4, 5, 6, ...) and write both numbers in each pair until the pairs meet or repeat.',
      exampleFix: '1×36, 2×18, 3×12, 4×9, 6×6 → 1, 2, 3, 4, 6, 9, 12, 18, 36.',
    },
    {
      mistakeTitle: 'Forgetting to Check the Remainder in Division',
      wrongThinking: 'Thinking 52 is a multiple of 6 because 6 × 8 = 48 is close to 52.',
      howToAvoid:
        'A number is only a factor or multiple if the remainder is strictly zero (0). Any non-zero remainder means “not a factor / not a multiple”.',
      exampleFix: '52 ÷ 6 = 8 with remainder 4 ≠ 0 → 52 is not a multiple of 6.',
    },
    {
      mistakeTitle: 'Repeating Factors Twice in the Final List',
      wrongThinking: 'Writing 6 twice for 36 = 6 × 6.',
      howToAvoid:
        'Each distinct factor is written only once in the final list, and once your numbers repeat (like reaching 6 × 6 or 8 × 5 after 5 × 8), stop!',
      exampleFix: 'For 40, stop after 5 × 8 because 8 × 5 repeats the same pair.',
    },
  ],
  studyNotes: [
    {
      heading: 'Factors at a Glance',
      points: [
        'A factor divides the number completely with remainder = 0.',
        'Every number > 1 has at least two factors: 1 and itself.',
        'List factors in pairs starting with 1 × n and stop when pairs start repeating.',
        'Number endings: even → 2 is a factor; ends in 5 → 5 is a factor; ends in 0 (> 0) → 2, 5, and 10 are factors.',
      ],
    },
    {
      heading: 'Multiples at a Glance',
      points: [
        'Multiply the given number by 1, 2, 3, 4, 5, ... to get its multiples.',
        'In Dividend ÷ Divisor = Quotient (rem 0), the dividend is a multiple of the divisor.',
        'A number has unlimited multiples, and every number is a multiple of itself.',
        'Every natural multiple of a number is greater than or equal to the number.',
      ],
    },
  ],
  summaryPoints: [
    'A factor is a number which divides the dividend completely leaving no remainder (0).',
    'A multiple of a given number is the dividend for which the given number is its factor (or the product of multiplying the number by 1, 2, 3, ...).',
    'Factors of a number are finite and ≤ the number; multiples of a number are unlimited and ≥ the number.',
    'The equation dividend = quotient × divisor + remainder lets us test any factor or multiple accurately.',
  ],
  practiceSets: [
    {
      id: 'practice-1',
      title: 'Practice -1 · List All Factors',
      pageRef: 'Textbook p. 2',
      instruction: 'List all the factors of each number (enter numbers separated by commas, in any order):',
      questions: [
        {
          id: 'p1-i',
          label: 'i.',
          prompt: '84',
          expectedValues: [1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84],
          hint: 'Pairs: 1×84, 2×42, 3×28, 4×21, 6×14, 7×12.',
        },
        {
          id: 'p1-ii',
          label: 'ii.',
          prompt: '120',
          expectedValues: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120],
          hint: 'Pairs: 1×120, 2×60, 3×40, 4×30, 5×24, 6×20, 8×15, 10×12.',
        },
        {
          id: 'p1-iii',
          label: 'iii.',
          prompt: '230',
          expectedValues: [1, 2, 5, 10, 23, 46, 115, 230],
          hint: '230 ends in 0, so 2, 5, and 10 are all factors! Pairs: 1×230, 2×115, 5×46, 10×23.',
        },
        {
          id: 'p1-iv',
          label: 'iv.',
          prompt: '352',
          expectedValues: [1, 2, 4, 8, 11, 16, 22, 32, 44, 88, 176, 352],
          hint: 'Pairs: 1×352, 2×176, 4×88, 8×44, 11×32, 16×22.',
        },
      ],
    },
    {
      id: 'practice-2',
      title: 'Practice -2 · First Five Multiples',
      pageRef: 'Textbook p. 3',
      instruction: 'List the first five multiples of each number (multiply by 1, 2, 3, 4, and 5):',
      questions: [
        {
          id: 'p2-i',
          label: 'i.',
          prompt: '3',
          expectedValues: [3, 6, 9, 12, 15],
          ordered: true,
          hint: '1×3, 2×3, 3×3, 4×3, 5×3.',
        },
        {
          id: 'p2-ii',
          label: 'ii.',
          prompt: '11',
          expectedValues: [11, 22, 33, 44, 55],
          ordered: true,
          hint: '1×11, 2×11, 3×11, 4×11, 5×11.',
        },
        {
          id: 'p2-iii',
          label: 'iii.',
          prompt: '29',
          expectedValues: [29, 58, 87, 116, 145],
          ordered: true,
          hint: 'Start with 29, then add 29 each time (or multiply by 1, 2, 3, 4, 5).',
        },
        {
          id: 'p2-iv',
          label: 'iv.',
          prompt: '73',
          expectedValues: [73, 146, 219, 292, 365],
          ordered: true,
          hint: 'Multiply 73 × 1, 73 × 2, 73 × 3, 73 × 4, 73 × 5 (notice 365 days in a year!).',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa-1',
      question: 'When 42 is divided by 5, the quotient is 8 and the remainder is 2. What does this tell us?',
      options: [
        '5 is a factor of 42',
        '5 is not a factor of 42 because the remainder is not 0',
        '42 is a multiple of 5',
        '2 is a multiple of 42',
      ],
      correctIndex: 1,
      explanation:
        'A factor must divide the dividend completely leaving remainder 0. Since 42 = 8 × 5 + 2 leaves remainder 2, 5 is not a factor of 42.',
    },
    {
      id: 'sa-2',
      question: 'Which statement about multiples of a number is ALWAYS true?',
      options: [
        'A number has only 10 multiples',
        'Every multiple of a number is smaller than the number',
        'A number has unlimited multiples, and every number is a multiple of itself',
        'Only even numbers have multiples',
      ],
      correctIndex: 2,
      explanation:
        'You can multiply a number by 1, 2, 3, ... forever, so multiples are unlimited. Multiplying by 1 gives the number itself!',
    },
    {
      id: 'sa-3',
      question: 'If a number greater than 0 ends with the digit 0 (like 230), which numbers are guaranteed to be its factors?',
      options: ['Only 10', 'Only 2 and 5', '2, 5, and 10', '3, 5, and 10'],
      correctIndex: 2,
      explanation:
        'By the textbook Fun Fact (p. 2): all numbers greater than 0 ending with a “0” have 2, 5, and 10 as their factors.',
    },
    {
      id: 'sa-4',
      question: 'Which list shows ALL the factors of 40?',
      options: [
        '1, 2, 4, 5, 8, 10, 20, 40',
        '2, 4, 5, 8, 10, 20',
        '1, 2, 4, 8, 10, 40',
        '40, 80, 120, 160',
      ],
      correctIndex: 0,
      explanation:
        'Using factor pairs: 1×40, 2×20, 4×10, and 5×8. Writing all numbers gives 1, 2, 4, 5, 8, 10, 20, 40.',
    },
    {
      id: 'sa-5',
      question: 'What is the result when you add an Odd number and an Even number (Odd + Even)?',
      options: ['Always Even', 'Always Odd', 'Zero', 'Cannot be known'],
      correctIndex: 1,
      explanation:
        'From the Thinking Time parity table (p. 3): Odd + Even = Odd (for example, 3 + 4 = 7).',
    },
  ],
};
