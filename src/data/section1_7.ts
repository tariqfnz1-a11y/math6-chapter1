import { StandardSectionData } from '../types/textbook';

export const SECTION_1_7_DATA: StandardSectionData = {
  id: 'section-1-7',
  sectionNumber: '1.7',
  title: 'Relationship Between HCF and LCM',
  pageRef: 'Textbook pp. 15–16',
  learningObjectives: [
    'Verify the fundamental rule: H.C.F × L.C.M = First Number × Second Number.',
    'Use the relationship formula to calculate L.C.M quickly when H.C.F is known (and vice versa).',
    'Find a missing number when H.C.F, L.C.M, and one number are given (Exercise 1.5).',
    'Spot impossible inputs by checking whether H.C.F divides L.C.M completely.',
  ],
  motivatingIntro: {
    heading: 'One Formula Connects Both H.C.F and L.C.M!',
    story:
      'Suppose you already found that the H.C.F of 32 and 48 is 16. Do you need a brand-new prime factorization table just to find their L.C.M? No! H.C.F and L.C.M are secret partners linked by a single balance equation.',
    guidingQuestion:
      'If we multiply the H.C.F and L.C.M of two numbers together, how does that product compare to multiplying the two original numbers?',
  },
  conceptExplanations: [
    {
      heading: 'The Product Identity for Any Two Numbers',
      paragraphs: [
        'For any two whole numbers, the product of their H.C.F and L.C.M is ALWAYS equal to the product of the two numbers themselves!',
        'From this rule, we can rearrange the equation to find any one missing piece if the other three are known.',
      ],
      formulaHighlight:
        'H.C.F × L.C.M = First Number × Second Number   ⇒   Second Number = (H.C.F × L.C.M) ÷ First Number',
    },
    {
      heading: 'Why Does This Relationship Work?',
      paragraphs: [
        'When we split two numbers into prime factors, the H.C.F collects their shared (overlapping) prime factors once, while the L.C.M collects those shared prime factors PLUS all the leftover prime factors. Multiplying H.C.F × L.C.M gathers every prime factor from BOTH numbers!',
        'Also remember a key check: H.C.F of two numbers MUST always be a factor of their L.C.M (meaning L.C.M ÷ H.C.F always leaves remainder 0).',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Product Identity',
      definition: 'The rule that H.C.F × L.C.M = First Number × Second Number for any two numbers.',
      example: 'For 12 and 21: H.C.F (3) × L.C.M (84) = 252 = 12 × 21.',
    },
    {
      term: 'Missing Number Formula',
      definition: 'Dividing (H.C.F × L.C.M) by the known number to reveal the unknown second number.',
      example: '(36 × 1,260) ÷ 72 = 630.',
    },
    {
      term: 'H.C.F Divides L.C.M Rule',
      definition: 'Every valid H.C.F divides the L.C.M of the same numbers with zero remainder.',
      example: 'For 32 and 48, H.C.F = 16 divides L.C.M = 96 cleanly (96 ÷ 16 = 6).',
    },
  ],
  diagramInfo: {
    title: 'Balance Proof of H.C.F × L.C.M = First × Second Number',
    caption:
      'Textbook Examples 21 & 22 (p. 15): Both sides of the equation produce the exact same product.',
    type: 'section-1-7',
  },
  workedExamples: [
    {
      id: 'ex-21',
      numberLabel: 'Example 21',
      pageRef: 'Textbook p. 15',
      title: 'Find the relationship between H.C.F and L.C.M of 12 and 21:',
      methodName: 'Verify Product Equality',
      parts: [
        {
          label: '(i)',
          prompt: 'Compute H.C.F, L.C.M, and compare both products',
          steps: [
            'Factors of 12 = 2 × 2 × 3; Factors of 21 = 3 × 7.',
            'H.C.F(12, 21) = 3;  L.C.M(12, 21) = 3 × 2 × 2 × 7 = 84.',
            'Left side: H.C.F × L.C.M = 3 × 84 = 252.',
            'Right side: First number × Second number = 12 × 21 = 252.',
          ],
          conclusion: 'Both equal 252, proving H.C.F × L.C.M = First number × Second number.',
        },
      ],
    },
    {
      id: 'ex-22',
      numberLabel: 'Example 22',
      pageRef: 'Textbook p. 15',
      title: 'Find the relationship between H.C.F and L.C.M of 32 and 48:',
      methodName: 'Verify Product Equality',
      parts: [
        {
          label: '(i)',
          prompt: 'Use prime factorization of 32 and 48',
          steps: [
            '32 = 2 × 2 × 2 × 2 × 2 = 2^5',
            '48 = 2 × 2 × 2 × 2 × 3 = 2^4 × 3',
            'H.C.F = 2 × 2 × 2 × 2 = 16;  L.C.M = 16 × 2 × 3 = 96.',
            'Check: 16 × 96 = 1,536, and 32 × 48 = 1,536.',
          ],
          conclusion: '1,536 = 1,536, verifying the relationship formula.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Finding a Hidden Schedule Interval',
      description:
        'If two buses meet every 360 seconds (L.C.M), their greatest common divisor interval is 180 s (H.C.F), and Bus A comes every 180 s, the formula immediately tells you Bus B arrives every (180 × 360) ÷ 180 = 360 seconds!',
      mathLink: 'Second Interval = (H.C.F × L.C.M) ÷ First Interval',
    },
    {
      title: 'Fast L.C.M Shortcut from Long Division H.C.F',
      description:
        'For large numbers like 680 and 584 (Ex. 1.5 Q2), finding H.C.F = 8 via Long Division takes seconds, and then L.C.M = (680 × 584) ÷ 8 = 49,640 immediately!',
      mathLink: 'Divide one number by H.C.F first before multiplying to keep numbers small!',
    },
  ],
  interestingFacts: [
    'Shortcut Trick: To compute (a × b) ÷ H.C.F without huge numbers, divide ONE of the numbers by H.C.F first! For example, (680 ÷ 8) × 584 = 85 × 584 = 49,640.',
    'Caution: The formula H.C.F × L.C.M = a × b works for ANY TWO numbers—it does NOT automatically equal a × b × c for three numbers!',
    'Math Detective (p. 16 Challenge): The textbook Challenge asks for H.C.F = 10, L.C.M = 399, and one number = 190. Using the formula gives (10 × 399) ÷ 190 = 21, BUT real H.C.F must always divide L.C.M (10 does NOT divide 399), so that textbook puzzle has a print mismatch!',
  ],
  classroomActivity: {
    title: 'Activity -4: Textbook Prices H.C.F & L.C.M Check',
    textbookRef: 'Textbook Activity -4 [first] (p. 16)',
    materials: ['Grade 6 Science textbook (price on back cover)', 'Grade 6 Mathematics textbook (price on back cover)', 'Notebook'],
    steps: [
      'Look at the printed price in Rupees on the back covers of your Science and Mathematics textbooks (round to whole Rupees if needed, or try example prices Rs. 160 and Rs. 240).',
      'Calculate the H.C.F and L.C.M of the two textbook prices.',
      'Multiply H.C.F × L.C.M on the left side of your page, and Price 1 × Price 2 on the right side.',
      'Compare both answers with your desk partner!',
    ],
    observation:
      'Both products match identically every single time!',
    discussionPrompt:
      'Why is dividing First Number by H.C.F before multiplying by Second Number faster than multiplying big numbers first?',
  },
  homeActivity: {
    title: 'Two Grocery Prices Relationship Check',
    materials: ['Two whole-rupee prices from food packets (e.g., Rs. 45 and Rs. 75)', 'Notebook'],
    steps: [
      'Pick two 2-digit whole-rupee prices from items in your kitchen.',
      'Find their H.C.F and L.C.M.',
      'Prove on paper that H.C.F × L.C.M equals Item 1 Price × Item 2 Price.',
    ],
    recordingTip: 'Draw a simple balance scale under your check with both totals on the two pans!',
  },
  commonErrors: [
    {
      mistakeTitle: 'Adding H.C.F and L.C.M instead of multiplying',
      wrongThinking: 'Writing H.C.F + L.C.M = First + Second.',
      howToAvoid: 'The relationship is ALWAYS multiplication (×), never addition (+).',
      exampleFix: 'For 10 & 25: 5 × 50 = 250 = 10 × 25 (whereas 5 + 50 = 55 ≠ 35).',
    },
    {
      mistakeTitle: 'Multiplying big numbers before dividing in Ex. 1.5 Q3 & Q4',
      wrongThinking: 'Trying to multiply 48 × 1,440 first and making arithmetic slips.',
      howToAvoid: 'Cancel/divide 1,440 ÷ 240 = 6 first, then multiply 48 × 6 = 288!',
      exampleFix: '(48 × 1440) ÷ 240 = 48 × (1440 ÷ 240) = 48 × 6 = 288.',
    },
  ],
  studyNotes: [
    {
      heading: 'Four Ways to Use the Identity',
      points: [
        'H.C.F × L.C.M = First × Second',
        'L.C.M = (First × Second) ÷ H.C.F',
        'H.C.F = (First × Second) ÷ L.C.M',
        'Missing Number = (H.C.F × L.C.M) ÷ Given Number',
      ],
    },
    {
      heading: 'Two Essential Rules',
      points: [
        'Applies directly to TWO numbers only.',
        'H.C.F must divide L.C.M with remainder 0.',
      ],
    },
  ],
  summaryPoints: [
    'For any two numbers, H.C.F × L.C.M equals First Number × Second Number.',
    'If you know any three values among First Number, Second Number, H.C.F, and L.C.M, you can find the fourth.',
    'For any valid pair of numbers, H.C.F always divides L.C.M evenly.',
  ],
  practiceSets: [
    {
      id: 'sec17-ex1-5',
      title: 'Exercise 1.5',
      pageRef: 'Textbook p. 16',
      instruction: 'Calculate the verified values using H.C.F × L.C.M = First × Second.',
      questions: [
        {
          id: 'ex15-q1-i',
          label: 'Ex 1.5 Q1(i)',
          prompt: 'Verify 10 and 25: what do BOTH (H.C.F × L.C.M) and (10 × 25) equal?',
          acceptedAnswers: ['250'],
          placeholder: 'Enter product',
          hint: 'H.C.F(10, 25) = 5 and L.C.M(10, 25) = 50. Multiply 5 × 50.',
          explanation: '5 × 50 = 250, which equals 10 × 25 = 250.',
          correctDisplay: '250',
        },
        {
          id: 'ex15-q1-iii',
          label: 'Ex 1.5 Q1(iii)',
          prompt: 'For 34 and 68, what is H.C.F × L.C.M?',
          acceptedAnswers: ['2312', '2,312'],
          placeholder: 'e.g. 2312',
          hint: '34 divides 68, so H.C.F = 34 and L.C.M = 68. Multiply 34 × 68.',
          explanation: '34 × 68 = 2,312.',
          correctDisplay: '2,312',
        },
        {
          id: 'ex15-q2',
          label: 'Ex 1.5 Q2',
          prompt: 'For 680 and 584, H.C.F = 8. What is their L.C.M?',
          acceptedAnswers: ['49640', '49,640'],
          placeholder: 'Enter L.C.M',
          hint: 'Use L.C.M = (680 × 584) ÷ 8 = 85 × 584.',
          explanation: '85 × 584 = 49,640 (and 8 × 49,640 = 397,120 = 680 × 584).',
          correctDisplay: '49,640',
        },
        {
          id: 'ex15-q3',
          label: 'Ex 1.5 Q3',
          prompt: 'H.C.F = 36, L.C.M = 1,260, and one number is 72. Find the other number:',
          acceptedAnswers: ['630'],
          placeholder: 'Enter number',
          hint: 'Other number = (36 × 1,260) ÷ 72. Notice 36 ÷ 72 = 1/2, so just halve 1,260!',
          explanation: '(36 × 1,260) ÷ 72 = 1,260 ÷ 2 = 630.',
          correctDisplay: '630',
        },
        {
          id: 'ex15-q4',
          label: 'Ex 1.5 Q4',
          prompt: 'H.C.F = 48, L.C.M = 1,440, and one number is 240. Find the other number:',
          acceptedAnswers: ['288'],
          placeholder: 'Enter number',
          hint: 'Other number = (48 × 1,440) ÷ 240. First simplify 1,440 ÷ 240 = 6!',
          explanation: '48 × (1,440 ÷ 240) = 48 × 6 = 288.',
          correctDisplay: '288',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa17-1',
      question: 'If H.C.F of two numbers is 16 and their L.C.M is 96 (Example 22), what is the product of the two numbers?',
      options: ['112', '80', '1,536', '6'],
      correctIndex: 2,
      explanation: 'First × Second = H.C.F × L.C.M = 16 × 96 = 1,536.',
    },
    {
      id: 'sa17-2',
      question: 'If H.C.F = 36, L.C.M = 1,260, and one number = 72 (Ex. 1.5 Q3), what is the other number?',
      options: ['18', '315', '630', '2,520'],
      correctIndex: 2,
      explanation: '(36 × 1,260) ÷ 72 = 630.',
    },
    {
      id: 'sa17-3',
      question: 'Which statement is ALWAYS true for the H.C.F and L.C.M of any two whole numbers?',
      options: [
        'H.C.F is greater than L.C.M',
        'H.C.F divides L.C.M completely (zero remainder)',
        'H.C.F + L.C.M = First + Second',
        'L.C.M can be smaller than both numbers',
      ],
      correctIndex: 1,
      explanation: 'Because H.C.F divides both numbers and both numbers divide L.C.M, H.C.F always divides L.C.M completely.',
    },
  ],
};
