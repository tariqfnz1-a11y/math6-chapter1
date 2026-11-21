import { StandardSectionData } from '../types/textbook';

export const SECTION_1_6_2_DATA: StandardSectionData = {
  id: 'section-1-6-2',
  sectionNumber: '1.6.2',
  title: 'L.C.M (Least Common Multiple)',
  pageRef: 'Textbook pp. 12–15',
  learningObjectives: [
    'Define L.C.M as the smallest non-zero number divisible by all given numbers.',
    'Find L.C.M of two or more numbers up to 3-digit by Prime Factorization Method.',
    'Find L.C.M of two, three, or four numbers using the Joint Division Method.',
    'Solve real-life transit, traffic lights, tree-planting, and divisibility problems (Exercise 1.4).',
  ],
  motivatingIntro: {
    heading: "Nuzat's 15 cm × 10 cm Square Builder & Hailey College Transit Revisited",
    story:
      'Remember our opening Chapter 1 puzzle—a Metro Bus arriving every 180 seconds and an Orange Train every 360 seconds at Hailey College? And look at Nuzat on page 13, arranging 15 cm × 10 cm rectangles edge-to-edge until they build a perfect square. Both puzzles ask: when do repeating steps meet for the FIRST time?',
    guidingQuestion:
      'How do we find the smallest number that is a multiple of two, three, or four given numbers?',
  },
  conceptExplanations: [
    {
      heading: 'Finding L.C.M by Prime Factorization',
      paragraphs: [
        'L.C.M (Least Common Multiple) of two or more numbers is the smallest of all their common multiples—the least number divisible by every given number.',
        'Using Prime Factorization: write each number as prime factors. Circle factors common to ALL (or for 3+ numbers, common to TWO OR MORE numbers!). Then multiply Common Prime Factors × Non-Common Prime Factors.',
      ],
      formulaHighlight:
        'L.C.M = Product of Common Prime Factors (2 or more) × Product of Non-Common Prime Factors',
    },
    {
      heading: 'Finding L.C.M by the Joint Division Method',
      paragraphs: [
        'Write all given numbers in a horizontal row separated by commas. Divide by the smallest prime number (2, 3, 5, 7, ...) that divides at least ONE number in the row. Write each quotient below, and simply bring down any number that is not divisible!',
        'Repeat until every number reaches 1 (or all remaining numbers are co-prime). Multiply all prime divisors on the left together to get the L.C.M.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'L.C.M (Least Common Multiple)',
      definition: 'The smallest non-zero common multiple divisible by all given numbers.',
      example: 'Common multiples of 10 & 15 are 30, 60, 90... → L.C.M = 30.',
    },
    {
      term: 'Bring-Down Step',
      definition: 'In Joint Division, copying a number unchanged to the next row if the prime divisor does not divide it.',
      example: 'Dividing row (4, 6, 9) by 2 gives (2, 3, 9) — 9 is brought down unchanged.',
    },
    {
      term: '3+ Number Common Rule',
      definition: 'When finding L.C.M of 3 or more numbers via prime factorization, count a prime as "common" if it appears in 2 OR MORE numbers.',
      example: 'Textbook Remember box (p. 13): pair factors shared by even just two of three numbers!',
    },
  ],
  diagramInfo: {
    title: "Nuzat's 15×10 → 30×30 Square & Joint Division Ladder (16, 24, 36)",
    caption:
      'Textbook Examples 18 & 20 (pp. 13–14): Building a square from rectangles vs. bringing down undivided numbers in Joint Division.',
    type: 'section-1-6-2',
  },
  workedExamples: [
    {
      id: 'ex-18',
      numberLabel: 'Example 18',
      pageRef: 'Textbook p. 13',
      title: "Nuzat tiles 15 cm × 10 cm rectangles into a square. Find the side of the smallest square:",
      methodName: 'Common Multiples Method',
      parts: [
        {
          label: '(i)',
          prompt: 'List multiples of 10 and 15',
          steps: [
            'Multiples of 10: 10, 20, 30, 40, 50, 60, 70, ...',
            'Multiples of 15: 15, 30, 45, 60, 75, ...',
            'First two common multiples: 30, 60.',
          ],
          conclusion: 'Least common multiple = 30 cm (smallest square is 30 cm × 30 cm).',
        },
      ],
    },
    {
      id: 'ex-19',
      numberLabel: 'Example 19',
      pageRef: 'Textbook p. 13',
      title: 'Find the L.C.M of 54 and 144 by Prime Factorization:',
      methodName: 'Prime Factorization Method',
      parts: [
        {
          label: '(i)',
          prompt: 'Pair common primes and multiply by non-common primes',
          steps: [
            '54 = 2 × 3 × 3 × 3',
            '144 = 2 × 2 × 2 × 2 × 3 × 3',
            'Common prime factors: 2, 3, 3 → product = 18.',
            'Non-common prime factors: 3 (from 54) and 2, 2, 2 (from 144) → product = 24.',
          ],
          conclusion: 'L.C.M = 18 × 24 = 432.',
        },
      ],
    },
    {
      id: 'ex-20',
      numberLabel: 'Example 20',
      pageRef: 'Textbook p. 14',
      title: 'Find the secret number (smallest number completely divisible by 16, 24 and 36):',
      methodName: 'Joint Division Method',
      parts: [
        {
          label: '(i)',
          prompt: 'Divide 16, 24, 36 jointly by prime divisors',
          steps: [
            'Row 1 (÷ 2): 16, 24, 36 → 8, 12, 18',
            'Row 2 (÷ 2): 8, 12, 18 → 4, 6, 9',
            'Row 3 (÷ 2): 4, 6, 9 → 2, 3, 9 (9 brought down)',
            'Row 4 (÷ 2): 2, 3, 9 → 1, 3, 9',
            'Row 5 (÷ 3): 1, 3, 9 → 1, 1, 3',
            'Row 6 (÷ 3): 1, 1, 3 → 1, 1, 1',
          ],
          conclusion: 'L.C.M = 2 × 2 × 2 × 2 × 3 × 3 = 144.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'GPO Traffic Lights Sync (Ex. 1.4 Q6)',
      description:
        'Four traffic lights at GPO Chowk turn green every 30 s, 60 s, 90 s, and 120 s. If all flash together at 9:00 a.m., L.C.M(30, 60, 90, 120) = 360 seconds = 6 minutes → they flash together again at 9:06 a.m.!',
      mathLink: 'Notice textbook p. 182 key has a typo "09:00 pm"; 9:06 a.m. is the verified answer.',
    },
    {
      title: 'Frog & Grasshopper Jumps (Ex. 1.4 Q3)',
      description:
        'A frog leaps 25 cm per jump while a grasshopper leaps 15 cm. They first land on the exact same spot at L.C.M(25, 15) = 75 cm!',
      mathLink: '3 frog leaps (3 × 25) = 5 grasshopper leaps (5 × 15) = 75 cm',
    },
  ],
  interestingFacts: [
    'Remember (p. 13): If one number is a factor of the other (like 180 and 360 in our Chapter Opener, or 29, 58, 116 in Ex. 1.4 Q5), the L.C.M is automatically the GREATER number (360 and 116)!',
    'Remember (p. 13): If all given numbers are prime (e.g., 5, 7, 11), their L.C.M is simply their product (5 × 7 × 11 = 385).',
    'Thinking Time (p. 14): What is the smallest 4-digit number divisible by 21, 56, and 63? Since L.C.M(21, 56, 63) = 504 (only 3 digits), double it: 504 × 2 = 1,008!',
    "Challenge (p. 13): Rida packs 64 mangoes and 56 oranges in equal fruit-count boxes. Since we are SPLITTING 64 and 56 into equal boxes, H.C.F(64, 56) = 8 proves Noureen (8 pieces per box) is right!",
  ],
  classroomActivity: {
    title: 'Human Rhythm Claps & Steps (Multiple Sync)',
    textbookRef: 'Aligned with Section 1.6.2 (pp. 12–15)',
    materials: ['Class counting aloud 1 to 24'],
    steps: [
      'Divide the class into Group A (claps on multiples of 4) and Group B (taps desks on multiples of 6).',
      'Count slowly from 1 to 24 together.',
      'Everyone watches which numbers make BOTH groups sound together.',
      'Check the very first number where both clap and tap together (12 = L.C.M(4, 6)), and the second (24).',
    ],
    observation:
      'Both groups hit together on common multiples 12 and 24; the earliest meeting is 12 (the L.C.M)!',
    discussionPrompt:
      'If Group C joins and snaps every 8 counts, when will all three groups sound together for the first time?',
  },
  homeActivity: {
    title: "Waqas's Orchard Grid (Practice -8)",
    materials: ['20–30 dried beans, buttons, or small stones', 'Notebook'],
    steps: [
      'Try arranging buttons into rows of 7, then rearrange the SAME buttons into rows of 9.',
      'Use the Joint Division Method in your notebook to find the least number of trees Waqas needs so he can plant 7, 9, OR 15 trees per row.',
      'Calculate L.C.M(7, 9, 15) = 315 trees!',
    ],
    recordingTip:
      'Write a note explaining why 315 is much larger than any single row count (unlike H.C.F!).',
  },
  commonErrors: [
    {
      mistakeTitle: 'Stopping at Common Factors only instead of including Non-Common Factors',
      wrongThinking: 'Forgetting to multiply the leftover non-common prime factors in Example 19 (54 and 144).',
      howToAvoid: 'H.C.F takes common primes ONLY; L.C.M takes Common × Non-Common primes!',
      exampleFix: 'L.C.M(54, 144) = (2×3×3) × (3×2×2×2) = 18 × 24 = 432.',
    },
    {
      mistakeTitle: 'Trusting textbook Answer Key typos without checking',
      wrongThinking: 'Accepting 3,364 for L.C.M(29, 58, 116) or 09:00 pm for GPO traffic lights.',
      howToAvoid: 'Always test: does 116 already divide by 29 (116 = 29×4) and 58 (116 = 58×2)? Yes!',
      exampleFix: 'Verified Ex. 1.4 Q5 = 116; Ex. 1.4 Q6 = 9:06 a.m.',
    },
  ],
  studyNotes: [
    {
      heading: 'Word Problem Clues for L.C.M',
      points: [
        'Keywords: "least", "smallest", "minimum", "earliest time together", "smallest number divisible by".',
        'L.C.M is ALWAYS ≥ the largest given number.',
        'For 2 numbers where small divides big, L.C.M = big number.',
      ],
    },
    {
      heading: 'H.C.F vs L.C.M Contrast',
      points: [
        'H.C.F splits/cuts big things into smaller equal parts (result ≤ smallest).',
        'L.C.M repeats small steps/intervals until they meet (result ≥ largest).',
      ],
    },
  ],
  summaryPoints: [
    'L.C.M is the smallest non-zero number divisible by all given numbers.',
    'By Prime Factorization, L.C.M = Common Primes (in 2 or more) × Non-Common Primes.',
    'In Joint Division, bring down undivided numbers cleanly until all numbers reach 1 (or co-prime), then multiply all prime divisors.',
  ],
  practiceSets: [
    {
      id: 'sec162-ex1-4',
      title: 'Practice -8, Thinking Time & Exercise 1.4',
      pageRef: 'Textbook pp. 14–15',
      instruction: 'Solve each verified textbook problem and enter your answer.',
      questions: [
        {
          id: 'p162-p8',
          label: 'Practice -8',
          prompt: 'Least number of trees Waqas can plant in rows of 7, 9, OR 15 trees:',
          acceptedAnswers: ['315', '315 trees'],
          placeholder: 'Enter number',
          hint: 'Find L.C.M(7, 9, 15). Note 9 = 3² and 15 = 3 × 5 share one 3.',
          explanation: '3 × 3 × 5 × 7 = 315 trees.',
          correctDisplay: '315',
        },
        {
          id: 'ex14-q1-iii',
          label: 'Ex 1.4 Q1(iii)',
          prompt: 'Find L.C.M of 20, 90, and 180:',
          acceptedAnswers: ['180'],
          placeholder: 'Enter L.C.M',
          hint: 'Check if both 20 and 90 already divide 180 completely!',
          explanation: '180 is divisible by 20 (×9), 90 (×2), and 180 (×1), so L.C.M = 180.',
          correctDisplay: '180',
        },
        {
          id: 'ex14-q2-iv',
          label: 'Ex 1.4 Q2(iv)',
          prompt: 'Find L.C.M of 7, 28, and 98 by Division Method:',
          acceptedAnswers: ['196'],
          placeholder: 'Enter L.C.M',
          hint: '28 = 2²×7 and 98 = 2×7². Multiply 2×2×7×7.',
          explanation: 'L.C.M(7, 28, 98) = 2² × 7² = 4 × 49 = 196.',
          correctDisplay: '196',
        },
        {
          id: 'ex14-q3',
          label: 'Ex 1.4 Q3',
          prompt: 'Distance (in cm) where a frog (25 cm/jump) and grasshopper (15 cm/jump) first meet:',
          acceptedAnswers: ['75', '75 cm', '75cm'],
          placeholder: 'e.g. 75',
          hint: 'Find L.C.M(25, 15).',
          explanation: '25 = 5×5 and 15 = 3×5 → L.C.M = 5×5×3 = 75 cm.',
          correctDisplay: '75 cm',
        },
        {
          id: 'ex14-q5',
          label: 'Ex 1.4 Q5',
          prompt: 'What is the smallest number completely divisible by 29, 58, and 116?',
          acceptedAnswers: ['116'],
          placeholder: 'Enter number',
          hint: 'Check 29 × 2 = 58 and 58 × 2 = 116!',
          explanation: 'Because 29 and 58 are both factors of 116, L.C.M(29, 58, 116) = 116.',
          correctDisplay: '116',
        },
        {
          id: 'ex14-q6',
          label: 'Ex 1.4 Q6',
          prompt: 'GPO lights flash every 30 s, 60 s, 90 s, 120 s starting at 9:00 a.m. When do they next flash together?',
          acceptedAnswers: ['9:06 a.m.', '9:06 am', '9:06', '09:06 am'],
          placeholder: 'e.g. 9:06 a.m.',
          hint: 'L.C.M(30, 60, 90, 120) = 360 seconds. Convert 360 s to minutes and add to 9:00 a.m.',
          explanation: '360 s ÷ 60 = 6 minutes → 9:00 a.m. + 6 min = 9:06 a.m.',
          correctDisplay: '9:06 a.m.',
        },
        {
          id: 'ex14-q7',
          label: 'Ex 1.4 Q7',
          prompt: 'Find the smallest 3-digit number completely divisible by 16, 24, and 30:',
          acceptedAnswers: ['240'],
          placeholder: 'Enter 3-digit number',
          hint: 'Find L.C.M(16, 24, 30): 16=2⁴, 24=2³×3, 30=2×3×5.',
          explanation: 'L.C.M(16, 24, 30) = 2⁴ × 3 × 5 = 16 × 15 = 240 (which is already 3 digits!).',
          correctDisplay: '240',
        },
        {
          id: 'ex14-think',
          label: 'Thinking Time',
          prompt: 'Smallest 4-digit number divisible by 21, 56, and 63:',
          acceptedAnswers: ['1008', '1,008'],
          placeholder: 'Enter 4-digit number',
          hint: 'First find L.C.M(21, 56, 63) = 504. Since 504 is 3 digits, find its next multiple!',
          explanation: 'L.C.M(21, 56, 63) = 504; smallest 4-digit multiple is 504 × 2 = 1,008.',
          correctDisplay: '1,008',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa162-1',
      question: 'In the Chapter Opener, the Hailey College bus arrives every 180 s and the train every 360 s. After how many minutes do they arrive together again?',
      options: ['3 minutes', '6 minutes', '9 minutes', '12 minutes'],
      correctIndex: 1,
      explanation: 'L.C.M(180, 360) = 360 seconds = 6 minutes.',
    },
    {
      id: 'sa162-2',
      question: 'In Example 19, 54 = 2 × 3³ and 144 = 2⁴ × 3². What is L.C.M(54, 144)?',
      options: ['18', '216', '432', '7,776'],
      correctIndex: 2,
      explanation: 'Common primes (2×3×3 = 18) × non-common primes (3×2×2×2 = 24) = 432.',
    },
    {
      id: 'sa162-3',
      question: 'In the p. 13 Challenge (64 mangoes and 56 oranges packed equally per box), who is correct: Nosheen (7 per box) or Noureen (8 per box)?',
      options: [
        'Nosheen (7), because 56 ÷ 7 = 8',
        'Noureen (8), because H.C.F(64, 56) = 8',
        'Both 7 and 8 divide 64 evenly',
        'Neither is correct',
      ],
      correctIndex: 1,
      explanation: '8 divides BOTH 64 (8×8) and 56 (8×7), whereas 7 does not divide 64 evenly. H.C.F(64, 56) = 8!',
    },
  ],
};
