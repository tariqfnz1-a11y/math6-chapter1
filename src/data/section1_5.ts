import { StandardSectionData } from '../types/textbook';

export const SECTION_1_5_DATA: StandardSectionData = {
  id: 'section-1-5',
  sectionNumber: '1.5',
  title: 'Prime Factors of up to 4-Digit Numbers & Index Notation',
  pageRef: 'Textbook pp. 7–9',
  learningObjectives: [
    'Break down any composite number up to 4 digits into a product of prime numbers.',
    'Find prime factorization using both the Division Method and the Factor Tree Method.',
    'Convert between expanded form (e.g., 2 × 2 × 3 × 3 × 3) and index notation (2^2 × 3^3).',
    'Identify the Base and Index (exponent/power) in exponential form (Exercise 1.2).',
  ],
  motivatingIntro: {
    heading: 'Every Composite Number Has a Secret Prime Recipe!',
    story:
      'Just like every building is made of bricks, every composite number up to 4 digits—like 108 or 7,875—is built by multiplying prime numbers together! Instead of writing 2 × 2 × 2 × 2 × 2 five times, mathematicians invented a neat shorthand called Index Notation.',
    guidingQuestion:
      'How do we break a 3- or 4-digit number down to its prime building blocks and write the answer cleanly using powers?',
  },
  conceptExplanations: [
    {
      heading: 'Two Methods for Prime Factorization',
      paragraphs: [
        'Factorization is the process of writing a given number into its factors. When all those factors are prime numbers, it is called Prime Factorization. You can use two textbook methods:',
        '1) Division Method: Divide repeatedly by the smallest possible prime number (2, then 3, then 5, 7, 11, ...) until the quotient reaches 1. 2) Factor Tree Method: Split the number into two factors, circle any prime numbers as leaves, and keep branching any composite numbers until every bottom leaf is prime.',
      ],
    },
    {
      heading: 'Expanded Form vs. Index Notation',
      paragraphs: [
        'When we write out every repeated prime factor with multiplication signs, such as 2 × 2 × 3 × 3 × 3, that is called Expanded Form.',
        'When we group repeated primes with a small raised power, such as 2^2 × 3^3, that is called Index Notation. In 2^5, 2 is the Base (the factor being multiplied) and 5 is the Index, power, or exponent (telling how many times to multiply the base).',
      ],
      formulaHighlight:
        'Expanded Form: 2 × 2 × 3 × 3 × 3 = 108   ↔   Index Notation: 2^2 × 3^3 = 108',
    },
  ],
  keyTerms: [
    {
      term: 'Prime Factorization',
      definition: 'The process of expressing a composite number as a product of prime numbers only.',
      example: 'Prime factorization of 36 is 2 × 2 × 3 × 3.',
    },
    {
      term: 'Index Notation',
      definition: 'Writing repeated prime factors in exponential form using a base and an index (power).',
      example: '2 × 2 × 2 × 2 × 2 = 2^5 (read as "2 raised to power 5").',
    },
    {
      term: 'Base & Index (Exponent)',
      definition: 'In a^n, "a" is the base (repeated factor) and "n" is the index/power (how many times it is multiplied).',
      example: 'In 5^4, 5 is the base and 4 is the power/index.',
    },
  ],
  diagramInfo: {
    title: 'Division Method vs. Factor Tree for 36 & Index Notation Anatomy',
    caption:
      'Textbook Example 11 (p. 7) and Remember Box (p. 8): Both methods give the exact same prime factors 2 × 2 × 3 × 3 = 2² × 3².',
    type: 'section-1-5',
  },
  workedExamples: [
    {
      id: 'ex-11',
      numberLabel: 'Example 11',
      pageRef: 'Textbook p. 7',
      title: 'Find the prime factorization of 36 using both methods:',
      methodName: 'Division Method & Factor Tree Method',
      parts: [
        {
          label: 'Method 1',
          prompt: 'Division Method for 36',
          steps: [
            'Divide 36 by smallest prime 2: 36 ÷ 2 = 18.',
            'Divide 18 by 2: 18 ÷ 2 = 9.',
            '9 is not divisible by 2, so divide by next prime 3: 9 ÷ 3 = 3.',
            'Divide 3 by 3: 3 ÷ 3 = 1.',
          ],
          conclusion: 'Prime factors of 36 = 2 × 2 × 3 × 3 (= 2^2 × 3^2).',
        },
        {
          label: 'Method 2',
          prompt: 'Factor Tree Method for 36',
          steps: [
            'Split 36 into 2 × 18 (circle 2 as prime; keep splitting 18).',
            'Split 18 into 2 × 9 (circle 2; keep splitting 9).',
            'Split 9 into 3 × 3 (circle both 3s since both are prime).',
          ],
          conclusion: 'Collecting all prime leaves gives 2 × 2 × 3 × 3.',
          note: 'Textbook Note (p. 8): In tests, use one method unless a problem specifically names the method.',
        },
      ],
    },
    {
      id: 'ex-12',
      numberLabel: 'Example 12',
      pageRef: 'Textbook p. 8',
      title: 'Find prime factorization of 108 and express in index notation:',
      methodName: 'Division Method → Index Notation',
      parts: [
        {
          label: '(i)',
          prompt: 'Factorize 108 and convert to index notation',
          steps: [
            '108 ÷ 2 = 54',
            '54 ÷ 2 = 27',
            '27 ÷ 3 = 9,  9 ÷ 3 = 3,  3 ÷ 3 = 1',
            'Expanded form: 108 = 2 × 2 × 3 × 3 × 3 (two 2s and three 3s).',
          ],
          conclusion: 'Index notation: 108 = 2^2 × 3^3.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Finding Equal Container & Package Sizes',
      description:
        'A warehouse with 2,600 boxes can quickly see all possible equal pallet sizes by checking the prime factors of 2,600 (2^3 × 5^2 × 13).',
      mathLink: 'Prime factors reveal every hidden divisor of a 4-digit number!',
    },
    {
      title: 'Compact Scientific Writing',
      description:
        'Scientists and computer programmers write huge repeated multiplications like 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 as 2^8 instead of filling pages with twos.',
      mathLink: 'Index notation saves space and avoids counting mistakes.',
    },
  ],
  interestingFacts: [
    'Every composite number has ONE unique prime factorization—no matter whether you start a factor tree with 2×18 or 4×9, you always land on the exact same prime leaves!',
    'Challenge (p. 8): "I am the product of two different prime factors, one raised to the 2nd power, between 62 and 82. Who am I?" Multiple numbers win: 63 (3²×7), 68 (2²×17), 75 (5²×3), and 76 (2²×19)!',
    'Thinking Time (p. 7): Among numbers 1–10, the primes are 2, 3, 5, 7. Notice 7 is the only one whose double (14) steps outside the 1–10 group!',
  ],
  classroomActivity: {
    title: 'Same Recipe Challenge (Method Equivalence Race)',
    textbookRef: 'Aligned with Exercise 1.2 Q5 (p. 9)',
    materials: ['Whiteboard/notebook', 'Timer'],
    steps: [
      'Split the class into Team Division and Team Factor Tree.',
      'Give both teams the same 4-digit number: 2,600 (from Ex. 1.2 Q5).',
      'Team Division divides step-by-step from 2,600 down to 1.',
      'Team Factor Tree splits 2,600 = 26 × 100 and keeps branching each side.',
      'Compare the final prime factors and write the shared answer in index notation.',
    ],
    observation:
      'Both teams end up with three 2s, two 5s, and one 13: 2^3 × 5^2 × 13 = 2,600!',
    discussionPrompt:
      'Which method felt faster for numbers ending in 00 like 2,600, and why?',
  },
  homeActivity: {
    title: 'Project -2: Reversed-Digit Square Puzzle',
    materials: ['Notebook and pencil'],
    steps: [
      'Search for a 2-digit number such that the square of the sum of its digits equals the number obtained when its digits are reversed.',
      'Hint: Since the reversed 2-digit number is a square, test 2-digit squares like 16, 25, 36, 49, 64, and 81!',
      'Check 18: sum of digits = 1 + 8 = 9; square of 9 = 9² = 81; reversing the digits of 18 gives 81!',
    ],
    recordingTip:
      'Write down your Prime Factorization of 18 (2 × 3²) and 81 (3⁴) beside your puzzle solution.',
  },
  commonErrors: [
    {
      mistakeTitle: 'Stopping with a composite factor in a factor tree',
      wrongThinking: 'Writing 36 = 4 × 9 and stopping before breaking 4 into 2×2 and 9 into 3×3.',
      howToAvoid: 'Every final factor in prime factorization MUST be prime (2, 3, 5, 7, 11, ...).',
      exampleFix: '36 = 2 × 2 × 3 × 3 = 2^2 × 3^2.',
    },
    {
      mistakeTitle: 'Confusing index multiplication with regular multiplication',
      wrongThinking: 'Thinking 2^3 means 2 × 3 = 6.',
      howToAvoid: 'The exponent 3 counts how many times to multiply the base 2 by itself.',
      exampleFix: '2^3 = 2 × 2 × 2 = 8 (and write a^b using ^ in practice answers below).',
    },
  ],
  studyNotes: [
    {
      heading: 'Prime Factorization Checklist',
      points: [
        'Use only prime divisors: 2, 3, 5, 7, 11, 13, 17, 19, ...',
        'Multiply your final prime factors back together to confirm you get the original number!',
        'Group identical primes using exponents (index notation).',
      ],
    },
    {
      heading: 'Textbook Verification Alert',
      points: [
        'In Ex. 1.2 Q2(i), 5×5×5×5×7 has four 5s, so it equals 5^4 × 7 (p. 182 key has a typo 5^2).',
        'In Ex. 1.2 Q2(iv), 11×11×11×11×13×19×19×19 = 11^4 × 13 × 19^3.',
        'Always verify by counting how many times each prime appears!',
      ],
    },
  ],
  summaryPoints: [
    'Prime factorization breaks any composite number into prime factors using the Division Method or Factor Tree Method.',
    'Expanded form lists every repeated prime factor; index notation writes them compactly using Base^Index.',
    'Every composite number has a unique prime factorization regardless of which method you use.',
  ],
  practiceSets: [
    {
      id: 'sec15-ex1-2',
      title: 'Practice -5, Practice -6 & Exercise 1.2',
      pageRef: 'Textbook pp. 7–9',
      instruction:
        'Use ^ for exponents when entering index notation (for example, write 2^2 × 3^3 or 2^2 x 3^3), and x or × for expanded form.',
      questions: [
        {
          id: 'p15-p5-210',
          label: 'Practice -5 (ii)',
          prompt: 'Write the prime factorization of 210 in ascending order:',
          acceptedAnswers: ['2 x 3 x 5 x 7', '2 × 3 × 5 × 7', '2*3*5*7'],
          placeholder: 'e.g. 2 x 3 x 5 x 7',
          hint: 'Divide 210 ÷ 2 = 105, then 105 ÷ 3 = 35, then 35 ÷ 5 = 7.',
          explanation: '210 = 2 × 3 × 5 × 7 (product of the first four primes!).',
          correctDisplay: '2 × 3 × 5 × 7',
        },
        {
          id: 'p15-p6-96',
          label: 'Practice -6 (i)',
          prompt: 'Express 96 in index notation:',
          acceptedAnswers: ['2^5 x 3', '2^5 × 3', '2^5*3'],
          placeholder: 'e.g. 2^5 x 3',
          hint: 'Divide 96 by 2 five times until you reach 3.',
          explanation: '96 = 2 × 2 × 2 × 2 × 2 × 3 = 2^5 × 3.',
          correctDisplay: '2^5 × 3',
        },
        {
          id: 'ex12-q2-i',
          label: 'Ex 1.2 Q2(i)',
          prompt: 'Write 5 × 5 × 5 × 5 × 7 in index notation:',
          acceptedAnswers: ['5^4 x 7', '5^4 × 7', '5^4*7'],
          placeholder: 'e.g. 5^4 x 7',
          hint: 'Count how many 5s are multiplied together (four 5s) and one 7.',
          explanation: 'There are four 5s and one 7, giving 5^4 × 7.',
          correctDisplay: '5^4 × 7',
        },
        {
          id: 'ex12-q3-vi',
          label: 'Ex 1.2 Q3(vi)',
          prompt: 'Find prime factorization of 540 in index notation:',
          acceptedAnswers: ['2^2 x 3^3 x 5', '2^2 × 3^3 × 5', '2^2*3^3*5'],
          placeholder: 'e.g. 2^2 x 3^3 x 5',
          hint: '540 = 54 × 10 = (2 × 3^3) × (2 × 5).',
          explanation: '540 = 2 × 2 × 3 × 3 × 3 × 5 = 2^2 × 3^3 × 5.',
          correctDisplay: '2^2 × 3^3 × 5',
        },
        {
          id: 'ex12-q4-x',
          label: 'Ex 1.2 Q4(x)',
          prompt: 'Find prime factorization of 7,875 in index notation:',
          acceptedAnswers: ['3^2 x 5^3 x 7', '3^2 × 5^3 × 7', '3^2*5^3*7'],
          placeholder: 'e.g. 3^2 x 5^3 x 7',
          hint: 'Divide by 3 twice (7875 → 2625 → 875), then divide by 5 three times (875 → 175 → 35 → 7).',
          explanation: '7,875 = 3 × 3 × 5 × 5 × 5 × 7 = 3^2 × 5^3 × 7.',
          correctDisplay: '3^2 × 5^3 × 7',
        },
        {
          id: 'ex12-q6',
          label: 'Ex 1.2 Q6',
          prompt: 'I am a product of three different prime numbers, my greatest prime factor is 13, and I am between 100 and 200. Who am I?',
          acceptedAnswers: ['182', '130'],
          placeholder: 'Enter number',
          hint: 'Try multiplying the two smallest primes (2 and 7, or 2 and 5) with 13.',
          explanation: '2 × 7 × 13 = 182 and 2 × 5 × 13 = 130 both use 3 different primes with 13 as the greatest prime factor and lie between 100 and 200!',
          correctDisplay: '182 (or 130 = 2 × 5 × 13)',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa15-1',
      question: 'In the index notation 5⁴, which part is the Base and which is the Index (Power)?',
      options: [
        '4 is Base and 5 is Power',
        '5 is Base and 4 is Power',
        'Both 4 and 5 are Powers',
        '5 × 4 = 20 is the Base',
      ],
      correctIndex: 1,
      explanation: 'As shown on textbook p. 8, the bottom repeated factor (5) is the Base and the raised number (4) is the Index/Power.',
    },
    {
      id: 'sa15-2',
      question: 'What is the prime factorization of 108 in index notation (Example 12)?',
      options: ['2³ × 3²', '2² × 3³', '2 × 3⁴', '4 × 27'],
      correctIndex: 1,
      explanation: '108 = 2 × 2 × 3 × 3 × 3 = 2² × 3³.',
    },
    {
      id: 'sa15-3',
      question: 'Which number is a valid solution to the p. 8 Challenge (product of two different primes, one squared, between 62 and 82)?',
      options: ['64 (= 2⁶)', '70 (= 2 × 5 × 7)', '75 (= 5² × 3)', '81 (= 3⁴)'],
      correctIndex: 2,
      explanation: '75 = 5² × 3 has two different prime factors (5 and 3), one raised to the 2nd power, and lies between 62 and 82 (63, 68, and 76 also work).',
    },
  ],
};
