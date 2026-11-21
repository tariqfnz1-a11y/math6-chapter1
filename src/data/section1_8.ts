import { StandardSectionData } from '../types/textbook';

export const SECTION_1_8_DATA: StandardSectionData = {
  id: 'section-1-8',
  sectionNumber: '1.8',
  title: 'Square of Numbers up to 2-Digit Numbers',
  pageRef: 'Textbook pp. 16–17',
  learningObjectives: [
    'Define square numbers using full square arrays (1, 4, 9, 16, 25, ...).',
    'Explain why hollow arrangements (like 12 apples around a border) are NOT square numbers.',
    'Calculate the square of any positive or negative integer up to 2-digit numbers (Example 23 & Exercise 1.6).',
    'Spot square numbers on the 10 × 10 multiplication chart diagonal (Activity -4).',
  ],
  motivatingIntro: {
    heading: 'Why Are 9 Apples a Square Number, While 12 Apples Are Not?',
    story:
      'If you place 9 apples in 3 rows of 3, they form a completely filled square! Someone tries placing 12 apples around the edges of a square frame—leaving an empty hole in the middle. Does that make 12 a square number?',
    guidingQuestion:
      'What makes a number a true "square number," and how do we square 2-digit positive and negative integers?',
  },
  conceptExplanations: [
    {
      heading: 'What Is a Square Number?',
      paragraphs: [
        'Numbers or objects that can be arranged into a completely filled square array (same number of rows and columns) are called Square Numbers: 1×1 = 1, 2×2 = 4, 3×3 = 9, 4×4 = 16, 5×5 = 25, and so on.',
        'Important Textbook Note (p. 16): A square box/array must be FULL inside if we count the number as a square number. Because 12 leaves the center hollow, 12 is NOT a square number!',
      ],
      formulaHighlight: 'Square of n:   n² = n × n   (e.g., 7² = 7 × 7 = 49  and  (-3)² = (-3) × (-3) = +9)',
    },
    {
      heading: 'Squaring Positive and Negative Integers up to 2 Digits',
      paragraphs: [
        'To find the square of any 2-digit integer (positive or negative), multiply the integer by itself. Remember the integer sign rule: Negative × Negative = Positive!',
        'That means (-8)² = (-8) × (-8) = 64 and (-31)² = (-31) × (-31) = 961. The square of ANY non-zero integer is always positive!',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Square Number',
      definition: 'A number obtained by multiplying an integer by itself; can form a completely filled square array.',
      example: '1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169...',
    },
    {
      term: 'Square Array',
      definition: 'A filled grid with an equal number of rows and columns and zero hollow gaps.',
      example: '4 rows × 4 columns = 16 objects (full square).',
    },
    {
      term: 'Squaring a Negative Integer',
      definition: 'Multiplying a negative integer by itself always gives a positive square.',
      example: '(-3)² = (-3) × (-3) = 9 (from Example 23).',
    },
  ],
  diagramInfo: {
    title: 'Full Square Arrays vs. Hollow 12-Apple Frame & Integer Squaring',
    caption:
      'Textbook p. 16 & Example 23: Full 3×3 array (9), hollow 12-dot counterexample, and squaring (-3) and 7.',
    type: 'section-1-8',
  },
  workedExamples: [
    {
      id: 'ex-23',
      numberLabel: 'Example 23',
      pageRef: 'Textbook p. 16',
      title: 'Find the square number of the integers −3 and 7:',
      methodName: 'Self-Multiplication (n × n)',
      parts: [
        {
          label: '(i)',
          prompt: 'Find the square of −3',
          steps: [
            'Write in index form: (-3)^2.',
            'Multiply -3 by itself: (-3) × (-3).',
            'Since minus × minus = plus and 3 × 3 = 9, the answer is +9.',
          ],
          conclusion: 'Square of -3 is 9.',
        },
        {
          label: '(ii)',
          prompt: 'Find the square of 7',
          steps: [
            'Write in index form: 7^2.',
            'Multiply 7 by itself: 7 × 7 = 49.',
          ],
          conclusion: 'Square of 7 is 49.',
        },
      ],
    },
    {
      id: 'ex-18-2digit',
      numberLabel: '2-Digit Practice',
      pageRef: 'Exercise 1.6 Prep (p. 17)',
      title: 'Calculate (-31)^2 and 43^2:',
      methodName: '2-Digit Multiplication',
      parts: [
        {
          label: '(a)',
          prompt: 'Square of −31',
          steps: [
            '(-31)^2 = (-31) × (-31).',
            '31 × 30 = 930, and 31 × 1 = 31 → 930 + 31 = 961.',
            'Negative × Negative = Positive (+961).',
          ],
          conclusion: '(-31)^2 = 961.',
        },
        {
          label: '(b)',
          prompt: 'Square of 43',
          steps: [
            '43^2 = 43 × 43.',
            '43 × 40 = 1,720, and 43 × 3 = 129 → 1,720 + 129 = 1,849.',
          ],
          conclusion: '43^2 = 1,849.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Chessboards, Ludo Boards & Square Rooms',
      description:
        'A standard chessboard has 8 rows of 8 squares (8² = 64 squares), and tiling a 13 ft × 13 ft square room takes 13² = 169 square tiles!',
      mathLink: 'Area of any square = side × side = side²',
    },
    {
      title: 'Marching Bands & PT Formations',
      description:
        '144 cadets can march in a crisp 12 × 12 square parade formation because 144 = 12² is a perfect square number.',
      mathLink: '12 rows × 12 columns = 144 cadets',
    },
  ],
  interestingFacts: [
    'Square numbers NEVER end in 2, 3, 7, or 8! They can only end in 0, 1, 4, 5, 6, or 9.',
    'Add consecutive odd numbers starting from 1 and you ALWAYS land on a square: 1 = 1², 1+3 = 4 (2²), 1+3+5 = 9 (3²), 1+3+5+7 = 16 (4²)!',
    'Verification Note (p. 17): In Exercise 1.6 Q1, parts (iii), (iv), and (v) accidentally all print "17". Remember 17 is NOT a square number—144 (12²), 169 (13²), 121 (11²), and 25 (5²) ARE the squares in Q1!',
  ],
  classroomActivity: {
    title: 'Activity -4 & -5: 10×10 Diagonal Chart & Square Block Matcher',
    textbookRef: 'Textbook Activity -4 (p. 16) & Activity -5 (p. 18)',
    materials: ['10×10 multiplication chart grid', 'Red colour pencil / interactive lab above'],
    steps: [
      'Open the 10 × 10 multiplication table in Activity -4 (or the Interactive Lab above).',
      'Find 1×1=1, 2×2=4, 3×3=9, ..., 10×10=100 and shade each box in red.',
      'Observe the geometric pattern formed by all shaded boxes across the table.',
      'Next, match pairs like 4² ↔ 16 and 15² ↔ 225 in Activity -5!',
    ],
    observation:
      'Every shaded square number forms a straight line down the main diagonal from top-left (1) to bottom-right (100)!',
    discussionPrompt:
      'How much do you add each time to jump from 1 to 4, 4 to 9, 9 to 16, and 16 to 25?',
  },
  homeActivity: {
    title: 'Project -3: Family Member Ages Square Chart',
    materials: ['Chart paper or notebook page', 'Markers/pencils'],
    steps: [
      'Write the names and ages (in years) of all your family members on a chart.',
      'Check if anyone in your family currently has an age that is a square number (e.g., 4, 9, 16, 25, 36, 49, 64)!',
      'Calculate the square (age × age) of every family member’s age.',
    ],
    recordingTip:
      'Make a 3-column chart: Family Member | Age (n) | Is Age a Square? | Age Squared (n²).',
  },
  commonErrors: [
    {
      mistakeTitle: 'Multiplying by 2 instead of multiplying the number by itself',
      wrongThinking: 'Writing 13² = 13 × 2 = 26.',
      howToAvoid: 'The power ² means multiply the base by ITSELF two times: 13 × 13.',
      exampleFix: '13² = 13 × 13 = 169.',
    },
    {
      mistakeTitle: 'Writing (-3)² = -9',
      wrongThinking: 'Keeping the minus sign when squaring a negative number.',
      howToAvoid: 'Remember: (-3)² = (-3) × (-3). Two negatives multiplied together always give a POSITIVE product!',
      exampleFix: '(-3)² = +9, and (-71)² = +5,041.',
    },
  ],
  studyNotes: [
    {
      heading: 'Squares 1² to 15² to Memorize',
      points: [
        '1²=1, 2²=4, 3²=9, 4²=16, 5²=25',
        '6²=36, 7²=49, 8²=64, 9²=81, 10²=100',
        '11²=121, 12²=144, 13²=169, 14²=196, 15²=225',
      ],
    },
    {
      heading: 'Sign & Array Rules',
      points: [
        'Square array must be completely filled (no hollow center like 12).',
        '(negative)² = positive (e.g., (-8)² = 64).',
      ],
    },
  ],
  summaryPoints: [
    'Square numbers are numbers of objects that form a completely filled square array (1, 4, 9, 16, 25, ...).',
    'To square any 2-digit positive or negative integer, multiply it by itself: n² = n × n.',
    'The square of any negative integer is always positive because (−) × (−) = (+).',
  ],
  practiceSets: [
    {
      id: 'sec18-ex1-6',
      title: 'Exercise 1.6',
      pageRef: 'Textbook p. 17',
      instruction: 'Verify square numbers (Yes/No) and compute integer squares.',
      questions: [
        {
          id: 'ex16-q1-144',
          label: 'Ex 1.6 Q1(vi)',
          prompt: 'Is 144 a square number? (Yes or No)',
          acceptedAnswers: ['yes'],
          placeholder: 'Yes or No',
          hint: 'Think: what number multiplied by itself equals 144? Try 12 × 12.',
          explanation: 'Yes, 12 × 12 = 144 (so 144 = 12²).',
          correctDisplay: 'Yes (12²)',
        },
        {
          id: 'ex16-q1-79',
          label: 'Ex 1.6 Q1(vii)',
          prompt: 'Is 79 a square number? (Yes or No)',
          acceptedAnswers: ['no'],
          placeholder: 'Yes or No',
          hint: 'Check 8² = 64 and 9² = 81. Also notice 79 ends in 9, yet sits between 64 and 81!',
          explanation: 'No, 79 falls between 8² (64) and 9² (81), so it cannot form a full square array.',
          correctDisplay: 'No',
        },
        {
          id: 'ex16-q1-169',
          label: 'Ex 1.6 Q1(viii)',
          prompt: 'Is 169 a square number? (Yes or No)',
          acceptedAnswers: ['yes'],
          placeholder: 'Yes or No',
          hint: 'Try 13 × 13.',
          explanation: 'Yes, 13 × 13 = 169.',
          correctDisplay: 'Yes (13²)',
        },
        {
          id: 'ex16-q2-i',
          label: 'Ex 1.6 Q2(i)',
          prompt: 'Calculate the square of 13 (13²):',
          acceptedAnswers: ['169'],
          placeholder: 'Enter square',
          hint: 'Multiply 13 × 13.',
          explanation: '13 × 13 = 169.',
          correctDisplay: '169',
        },
        {
          id: 'ex16-q2-ii',
          label: 'Ex 1.6 Q2(ii)',
          prompt: 'Calculate the square of −8 ((-8)²):',
          acceptedAnswers: ['64', '+64'],
          placeholder: 'Enter square',
          hint: '(-8) × (-8) gives a positive product!',
          explanation: '(-8) × (-8) = +64.',
          correctDisplay: '64',
        },
        {
          id: 'ex16-q2-iii',
          label: 'Ex 1.6 Q2(iii)',
          prompt: 'Calculate the square of 23 (23²):',
          acceptedAnswers: ['529'],
          placeholder: 'Enter square',
          hint: 'Multiply 23 × 20 (= 460) plus 23 × 3 (= 69).',
          explanation: '23 × 23 = 529.',
          correctDisplay: '529',
        },
        {
          id: 'ex16-q2-v',
          label: 'Ex 1.6 Q2(v)',
          prompt: 'Calculate the square of −31 ((-31)²):',
          acceptedAnswers: ['961', '+961'],
          placeholder: 'Enter square',
          hint: 'Multiply (-31) × (-31). Remember minus × minus = plus!',
          explanation: '(-31) × (-31) = 961.',
          correctDisplay: '961',
        },
        {
          id: 'ex16-q2-viii',
          label: 'Ex 1.6 Q2(viii)',
          prompt: 'Calculate the square of 57 (57²):',
          acceptedAnswers: ['3249', '3,249'],
          placeholder: 'Enter square',
          hint: 'Multiply 57 × 50 (= 2,850) + 57 × 7 (= 399).',
          explanation: '57 × 57 = 3,249.',
          correctDisplay: '3,249',
        },
        {
          id: 'ex16-q2-ix',
          label: 'Ex 1.6 Q2(ix)',
          prompt: 'Calculate the square of −71 ((-71)²):',
          acceptedAnswers: ['5041', '5,041'],
          placeholder: 'Enter square',
          hint: 'Multiply (-71) × (-71).',
          explanation: '(-71) × (-71) = 5,041.',
          correctDisplay: '5,041',
        },
        {
          id: 'ex16-q2-x',
          label: 'Ex 1.6 Q2(x)',
          prompt: 'Calculate the square of 93 (93²):',
          acceptedAnswers: ['8649', '8,649'],
          placeholder: 'Enter square',
          hint: 'Multiply 93 × 90 (= 8,370) + 93 × 3 (= 279).',
          explanation: '93 × 93 = 8,649.',
          correctDisplay: '8,649',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa18-1',
      question: 'Why is 12 NOT a square number (Textbook Note p. 16)?',
      options: [
        'Because 12 is an even number',
        'Because 12 objects cannot form a completely filled square array (a 4×4 square border leaves the center hollow)',
        'Because 12 has too many factors',
        'Because 12 is smaller than 25',
      ],
      correctIndex: 1,
      explanation: 'A square array must be completely full inside; 12 leaves an empty hole in the middle.',
    },
    {
      id: 'sa18-2',
      question: 'What is (-3)² + 7² (from Example 23)?',
      options: ['40', '58', '-40', '16'],
      correctIndex: 1,
      explanation: '(-3)² = +9 and 7² = 49, so 9 + 49 = 58.',
    },
    {
      id: 'sa18-3',
      question: 'In Exercise 1.6 Q1, which list contains ONLY true square numbers?',
      options: [
        '18, 25, 79',
        '25, 144, 169, 121',
        '17, 68, 121',
        '25, 68, 144',
      ],
      correctIndex: 1,
      explanation: '25 = 5², 144 = 12², 169 = 13², and 121 = 11² are all true square numbers.',
    },
  ],
};
