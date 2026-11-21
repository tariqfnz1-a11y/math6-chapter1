import { StandardSectionData } from '../types/textbook';

export const SECTION_1_2_DATA: StandardSectionData = {
  id: 'section-1-2',
  sectionNumber: '1.2',
  title: 'Identification of Factors up to 3-Digit Numbers',
  pageRef: 'Textbook p. 4',
  learningObjectives: [
    'Test whether a given number is a factor of any 2-digit or 3-digit number up to 999.',
    'Prove factor status using long division and the zero-remainder check.',
    'Explain clearly why a number is or is not a factor of a 3-digit dividend.',
    'List all factors of 2-digit numbers and verify factor pairs of 3-digit numbers.',
  ],
  motivatingIntro: {
    heading: 'Packing 625 Notebooks for School Prize Day',
    story:
      'Your school has 625 mathematics notebooks to pack into equal bundles for classes. One teacher suggests packing 25 notebooks per bundle, while another suggests 17 per bundle. Without counting one by one, how can we know which bundle size leaves zero notebooks left over?',
    guidingQuestion:
      'How do we check if a 2-digit number divides a 3-digit number like 625 completely with no remainder?',
  },
  conceptExplanations: [
    {
      heading: 'How to Test a Factor of Any 2- or 3-Digit Number',
      paragraphs: [
        'In Section 1.1, we learned that a factor divides a dividend completely leaving zero remainder. With larger 2-digit and 3-digit numbers (from 100 up to 999), we cannot always guess from multiplication tables up to 10.',
        'Instead, we divide the 3-digit dividend by the test divisor using long division. If the remainder after subtracting is 0, the divisor is a factor (and the quotient is its partner factor). If any non-zero remainder is left over, the divisor is NOT a factor.',
      ],
      formulaHighlight:
        'Factor Test Rule: Dividend ÷ Divisor = Quotient (Remainder 0)  ⇒  Divisor is a factor!',
    },
    {
      heading: 'Using Quick Divisibility Clues Before Dividing',
      paragraphs: [
        'Before doing long division, look at the ones digit of the 3-digit number. Any even number (ending in 0, 2, 4, 6, or 8) always has 2 as a factor. Any number ending in 5 or 0 always has 5 as a factor, and any number greater than 0 ending in 0 has 2, 5, and 10 as factors.',
        'These quick clues help you spot easy factors right away, while long division checks every other divisor such as 3, 7, 11, 17, or 25.',
      ],
    },
  ],
  keyTerms: [
    {
      term: '3-Digit Dividend',
      definition: 'A whole number from 100 to 999 that is being divided during a factor test.',
      example: 'In 625 ÷ 25, the 3-digit dividend is 625.',
    },
    {
      term: 'Zero Remainder',
      definition: 'Nothing left over after division, proving the divisor fits an exact whole number of times.',
      example: '625 ÷ 25 = 25 with remainder 0, so 25 is a factor of 625.',
    },
    {
      term: 'Non-Factor',
      definition: 'A divisor that leaves a remainder other than 0 when dividing the dividend.',
      example: '625 ÷ 17 = 36 with remainder 13, so 17 is NOT a factor of 625.',
    },
  ],
  diagramInfo: {
    title: 'Comparing Complete Division vs. Remainder Left Over (625 ÷ 25 vs. 625 ÷ 17)',
    caption:
      'Textbook Example 6 (p. 4): 25 divides 625 completely with remainder 0, whereas 17 leaves remainder 13.',
    type: 'section-1-2',
  },
  workedExamples: [
    {
      id: 'ex-5',
      numberLabel: 'Example 5',
      pageRef: 'Textbook p. 4',
      title: 'Which of the following numbers are the factors of 30 and why?',
      methodName: 'Zero-Remainder Division Check',
      parts: [
        {
          label: '(i)',
          prompt: 'Check 5',
          steps: [
            'Divide 30 by 5: 30 ÷ 5 = 6.',
            'Check multiplication: 5 × 6 = 30, remainder = 30 − 30 = 0.',
          ],
          conclusion: '5 is a factor of 30 because it divides 30 completely with zero remainder.',
        },
        {
          label: '(ii)',
          prompt: 'Check 7',
          steps: [
            'Divide 30 by 7: 7 × 4 = 28 (closest multiple ≤ 30).',
            'Subtract to find remainder: 30 − 28 = 2 (remainder ≠ 0).',
          ],
          conclusion: '7 is NOT a factor of 30 because it does not divide 30 completely (remainder 2).',
        },
        {
          label: '(iii)',
          prompt: 'Check 3',
          steps: [
            'Divide 30 by 3: 30 ÷ 3 = 10.',
            'Check multiplication: 3 × 10 = 30, remainder = 0.',
          ],
          conclusion: '3 is a factor of 30 because it divides 30 completely with zero remainder.',
        },
        {
          label: '(iv)',
          prompt: 'Check 11',
          steps: [
            'Divide 30 by 11: 11 × 2 = 22 (closest multiple ≤ 30).',
            'Subtract to find remainder: 30 − 22 = 8 (remainder ≠ 0).',
          ],
          conclusion: '11 is NOT a factor of 30 because dividing leaves remainder 8.',
        },
      ],
    },
    {
      id: 'ex-6',
      numberLabel: 'Example 6',
      pageRef: 'Textbook p. 4',
      title: 'Which of the following numbers are the factors of 625 and why?',
      methodName: '3-Digit Long Division Test',
      parts: [
        {
          label: '(i)',
          prompt: 'Check 25 as a factor of 625',
          steps: [
            'Divide first two digits (62) by 25: 25 × 2 = 50; 62 − 50 = 12.',
            'Bring down 5 to make 125.',
            'Divide 125 by 25: 25 × 5 = 125; 125 − 125 = 0 (remainder = 0).',
          ],
          conclusion: '25 is a factor of 625 because 625 ÷ 25 = 25 with zero remainder.',
          note: 'Notice that 625 ends in 5, so 5 is also guaranteed to be a factor (625 ÷ 5 = 125).',
        },
        {
          label: '(ii)',
          prompt: 'Check 17 as a factor of 625',
          steps: [
            'Divide 62 by 17: 17 × 3 = 51; 62 − 51 = 11.',
            'Bring down 5 to make 115.',
            'Divide 115 by 17: 17 × 6 = 102; 115 − 102 = 13 (remainder = 13).',
          ],
          conclusion: '17 is NOT a factor of 625 because dividing leaves a remainder of 13.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Morning Assembly Rows',
      description:
        'If 240 students stand for morning assembly, a PT teacher can arrange them in equal rows of 12, 15, or 20 because each divides 240 with zero remainder—never rows of 17!',
      mathLink: '240 ÷ 15 = 16 equal rows (15 and 16 are partner factors)',
    },
    {
      title: 'Packaging 3-Digit Orders in Cartons',
      description:
        'A biscuit factory packing 450 packets into cartons needs a box size that divides 450 completely, such as 15 or 25 packets per carton, so no loose packets are left behind.',
      mathLink: '450 ÷ 25 = 18 full cartons (remainder 0)',
    },
  ],
  interestingFacts: [
    '625 is a special number: 25 × 25 = 625, so its quotient and divisor are the exact same number!',
    'Every 3-digit number ending in 00 (like 100, 200, 300) automatically has 2, 4, 5, 10, 20, 25, 50, and 100 as factors.',
    'Because factors always come in pairs, testing one 2-digit factor of a 3-digit number immediately gives you a second factor (the quotient).',
  ],
  classroomActivity: {
    title: '3-Digit Factor Detective Relay',
    textbookRef: 'Aligned with Section 1.2 (p. 4)',
    materials: ['3 large cards with 3-digit dividends (120, 225, 360)', 'Small divisor cards (5, 7, 9, 12, 15, 25)', 'Chalkboard or notebook'],
    steps: [
      'Form groups of 4 students. Each group picks one 3-digit dividend card.',
      'Draw two small divisor cards from the stack without peeking.',
      'Divide the 3-digit number by each divisor on paper and circle the remainder.',
      'Present your verdict aloud using the textbook sentence: "___ is / is not a factor of ___ because remainder is ___."',
    ],
    observation:
      'Every divisor that gave remainder 0 also gave a whole-number quotient that is itself another factor of the 3-digit number.',
    discussionPrompt:
      'How did the ones digit (0 or 5) help your team guess factors before even finishing the division?',
  },
  homeActivity: {
    title: 'Book Pages & Grocery Pack Check',
    materials: ['Any school textbook (note total page count)', 'Notebook and pencil'],
    steps: [
      'Open the last numbered page of your textbook or storybook to get a 3-digit number (for example, 184 pages).',
      'Suppose you want to read the same number of pages every day for 4 days, 5 days, or 8 days.',
      'Divide the total page number by 4, 5, and 8 to find which reading plans finish the book with 0 pages left over.',
    ],
    recordingTip:
      'Write a 3-row table in your notebook with columns: Days | Division Check | Remainder | Factor? (Yes/No).',
  },
  commonErrors: [
    {
      mistakeTitle: 'Judging only by the last digit',
      wrongThinking: 'Thinking 17 must be a factor of 227 because both end in 7.',
      howToAvoid: 'Last-digit rules only guarantee factors for 2, 5, and 10. For 7, 17, or 25, always perform full division.',
      exampleFix: '227 ÷ 17 = 13 remainder 6 (so 17 is NOT a factor of 227).',
    },
    {
      mistakeTitle: 'Stopping division too early',
      wrongThinking: 'Forgetting to bring down the ones digit in 625 ÷ 25 and thinking the remainder is 12.',
      howToAvoid: 'Always bring down every digit of the 3-digit dividend until no digits remain.',
      exampleFix: 'Bring down 5 → 125 ÷ 25 = 5 → final remainder = 0.',
    },
  ],
  studyNotes: [
    {
      heading: '3-Step Factor Verification',
      points: [
        'Step 1: Set up Dividend ÷ Divisor.',
        'Step 2: Complete long division carefully to find quotient and remainder.',
        'Step 3: Remainder = 0 → Yes (Factor). Remainder > 0 → No (Not a factor).',
      ],
    },
    {
      heading: 'Fast Ones-Digit Clues',
      points: [
        'Ends in 0, 2, 4, 6, 8 → 2 is always a factor.',
        'Ends in 0 or 5 → 5 is always a factor.',
        'Ends in 0 (and > 0) → 2, 5, and 10 are all factors.',
      ],
    },
  ],
  summaryPoints: [
    'To test if a number is a factor of a 2- or 3-digit number, divide completely and inspect the remainder.',
    'A remainder of 0 proves the divisor is a factor; any non-zero remainder proves it is not.',
    'When Divisor × Quotient = Dividend, both the divisor and the quotient are factors of the dividend.',
  ],
  practiceSets: [
    {
      id: 'sec12-practice3-factors',
      title: 'Practice -3 (Factors Part) & 3-Digit Checks',
      pageRef: 'Textbook p. 4 & Ex. 1.1 Prep',
      instruction:
        'List all factors separated by commas (e.g., 1, 2, 3), or answer Yes / No for 3-digit factor checks.',
      questions: [
        {
          id: 'p12-q1',
          label: 'Practice -3 (i)',
          prompt: 'Write all factors of 36:',
          acceptedAnswers: ['1, 2, 3, 4, 6, 9, 12, 18, 36'],
          unorderedNumbers: [1, 2, 3, 4, 6, 9, 12, 18, 36],
          placeholder: 'e.g. 1, 2, 3, ...',
          hint: 'Find pairs: 1×36, 2×18, 3×12, 4×9, 6×6 (stop when 6 repeats!).',
          explanation: '36 = 1×36 = 2×18 = 3×12 = 4×9 = 6×6, giving 9 factors.',
          correctDisplay: '1, 2, 3, 4, 6, 9, 12, 18, 36',
        },
        {
          id: 'p12-q2',
          label: 'Practice -3 (ii)',
          prompt: 'Write all factors of 45:',
          acceptedAnswers: ['1, 3, 5, 9, 15, 45'],
          unorderedNumbers: [1, 3, 5, 9, 15, 45],
          placeholder: 'e.g. 1, 3, 5, ...',
          hint: '45 is odd (so 2 is not a factor). Check 1×45, 3×15, 5×9.',
          explanation: '45 = 1×45 = 3×15 = 5×9, so its factors are 1, 3, 5, 9, 15, 45.',
          correctDisplay: '1, 3, 5, 9, 15, 45',
        },
        {
          id: 'p12-q3',
          label: 'Practice -3 (iii)',
          prompt: 'Write all factors of 76:',
          acceptedAnswers: ['1, 2, 4, 19, 38, 76'],
          unorderedNumbers: [1, 2, 4, 19, 38, 76],
          placeholder: 'e.g. 1, 2, 4, ...',
          hint: '76 is even: 1×76, 2×38, 4×19. Does 3, 5, 6, 7, 8, or 9 divide 76?',
          explanation: '76 = 1×76 = 2×38 = 4×19; no number between 5 and 18 divides 76 evenly.',
          correctDisplay: '1, 2, 4, 19, 38, 76',
        },
        {
          id: 'p12-q4',
          label: '3-Digit Check (a)',
          prompt: 'Is 15 a factor of 240? (Type Yes or No)',
          acceptedAnswers: ['yes'],
          placeholder: 'Yes or No',
          hint: 'Divide 240 by 15. Think: 15 × 10 = 150, and 90 remains. How many 15s in 90?',
          explanation: '240 ÷ 15 = 16 with remainder 0, so 15 IS a factor of 240.',
          correctDisplay: 'Yes',
        },
        {
          id: 'p12-q5',
          label: '3-Digit Check (b)',
          prompt: 'Is 14 a factor of 230? (Type Yes or No)',
          acceptedAnswers: ['no'],
          placeholder: 'Yes or No',
          hint: 'Divide 230 by 14: 14 × 16 = 224. What is left over?',
          explanation: '230 ÷ 14 = 16 with remainder 6 (≠ 0), so 14 is NOT a factor of 230.',
          correctDisplay: 'No',
        },
        {
          id: 'p12-q6',
          label: '3-Digit Check (c)',
          prompt: 'Write the missing partner factor for 165 = 15 × ____',
          acceptedAnswers: ['11'],
          placeholder: 'Enter number',
          hint: 'Divide 165 by 15 (15 × 10 = 150, leaving 15).',
          explanation: '165 ÷ 15 = 11 with remainder 0, so 11 is the partner factor.',
          correctDisplay: '11',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa12-1',
      question: 'Which number is a factor of 625?',
      options: ['17', '25', '12', '30'],
      correctIndex: 1,
      explanation: '625 ÷ 25 = 25 with zero remainder, whereas 17, 12, and 30 leave non-zero remainders.',
    },
    {
      id: 'sa12-2',
      question: 'When 350 is divided by 14, the quotient is 25 and the remainder is 0. Which statement is true?',
      options: [
        '14 and 25 are both factors of 350',
        'Only 14 is a factor of 350',
        'Neither 14 nor 25 is a factor',
        '350 is a factor of 14',
      ],
      correctIndex: 0,
      explanation: 'Because 14 × 25 = 350 with remainder 0, both the divisor (14) and quotient (25) are factors of 350.',
    },
    {
      id: 'sa12-3',
      question: 'A 3-digit number ends in 0 (e.g., 430). Which set of numbers MUST all be its factors?',
      options: ['3, 6, 9', '2, 5, 10', '4, 8, 12', '7, 11, 13'],
      correctIndex: 1,
      explanation: 'As taught in the textbook Fun Facts, every whole number greater than 0 ending in 0 has 2, 5, and 10 as factors.',
    },
  ],
};
