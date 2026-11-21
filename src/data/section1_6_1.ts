import { StandardSectionData } from '../types/textbook';

export const SECTION_1_6_1_DATA: StandardSectionData = {
  id: 'section-1-6-1',
  sectionNumber: '1.6.1',
  title: 'H.C.F (Highest Common Factor)',
  pageRef: 'Textbook pp. 9–12',
  learningObjectives: [
    'Define H.C.F (also called G.C.F or G.C.D) as the greatest common factor that divides all given numbers completely.',
    'Find H.C.F of two or three numbers up to 3-digit (and larger) by Prime Factorization Method.',
    'Find H.C.F of two or more numbers by the Long Division Method.',
    'Identify co-prime numbers (H.C.F = 1) and solve real-life cutting, packing, and tiling word problems (Exercise 1.3).',
  ],
  motivatingIntro: {
    heading: "Alisha's 70 cm × 50 cm Blue Paper Tiling Puzzle",
    story:
      'Alisha wants to cover a rectangular 70 cm × 50 cm sheet of blue chart paper completely using identical square boxes with zero paper left over. Should she cut 5 cm squares or 10 cm squares to get the LARGEST possible identical squares?',
    guidingQuestion:
      'How do we find the greatest common factor that divides two or three numbers completely?',
  },
  conceptExplanations: [
    {
      heading: 'What is H.C.F (Highest Common Factor)?',
      paragraphs: [
        'H.C.F of two or more numbers is the greatest (highest) number that divides all the given numbers completely. It is also known as G.C.F (Greatest Common Factor) or G.C.D (Greatest Common Divisor).',
        'Remember: The H.C.F is ALWAYS smaller than or equal to the smallest number in the set of given numbers. If the H.C.F of two or more numbers is 1, those numbers are called Co-prime Numbers.',
      ],
      formulaHighlight:
        'H.C.F (Prime Factorization) = Product of prime factors common to ALL given numbers',
    },
    {
      heading: 'Long Division Method for Larger Numbers',
      paragraphs: [
        'When numbers are large, divide the larger number by the smaller number. Take the remainder as the new divisor and divide the previous divisor by it. Repeat until the remainder is 0—the LAST divisor is the H.C.F!',
        'For three numbers, first find the H.C.F of two numbers, then find the H.C.F of that result with the third number.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'H.C.F / G.C.F / G.C.D',
      definition: 'The greatest number among all common factors that divides all given numbers evenly.',
      example: 'Common factors of 70 & 50 are 1, 2, 5, 10 → H.C.F = 10.',
    },
    {
      term: 'Co-prime Numbers',
      definition: 'Two or more numbers whose Highest Common Factor (H.C.F) is 1.',
      example: 'Any two prime numbers (like 7 and 11), or 8 and 15, have H.C.F = 1.',
    },
    {
      term: 'Last Divisor Rule',
      definition: 'In Long Division H.C.F, the divisor that finally produces a remainder of 0 is the H.C.F.',
      example: '144 ÷ 108 (rem 36), then 108 ÷ 36 (rem 0) → H.C.F = 36.',
    },
  ],
  diagramInfo: {
    title: "Alisha's Square Grid (70 × 50) & Long Division Cascade (108 & 144)",
    caption:
      'Textbook Examples 13 & 16 (pp. 10–11): H.C.F finds the largest square tile (10 cm) and longest equal wire piece (36 m).',
    type: 'section-1-6-1',
  },
  workedExamples: [
    {
      id: 'ex-13',
      numberLabel: 'Example 13',
      pageRef: 'Textbook p. 10',
      title: "Cover Alisha's 70 cm × 50 cm sheet completely with the largest identical squares:",
      methodName: 'Common Factors List Method',
      parts: [
        {
          label: '(i)',
          prompt: 'List factors of 70 and 50 to find the greatest common side length',
          steps: [
            'Factors of 70: 1, 2, 5, 7, 10, 14, 35, 70.',
            'Factors of 50: 1, 2, 5, 10, 25, 50.',
            'Common factors: 1, 2, 5, 10.',
          ],
          conclusion: 'Highest common factor = 10 cm (so largest square box is 10 cm × 10 cm).',
        },
      ],
    },
    {
      id: 'ex-14',
      numberLabel: 'Example 14',
      pageRef: 'Textbook p. 10',
      title: 'Find H.C.F of 27, 54 and 315 using Prime Factorization:',
      methodName: 'Prime Factorization Method',
      parts: [
        {
          label: '(i)',
          prompt: 'Factorize all three numbers and pick common primes',
          steps: [
            '27 = 3 × 3 × 3',
            '54 = 2 × 3 × 3 × 3',
            '315 = 3 × 3 × 5 × 7',
            'Prime factors common to ALL three (27, 54, and 315): 3 and 3.',
          ],
          conclusion: 'H.C.F = 3 × 3 = 9.',
          note: 'Verification note: Textbook p. 10 has a printing typo saying "27 = 3×3×5×7" and "common to 27, 54 and 63"; the third number is 315 and the answer H.C.F = 9 is verified!',
        },
      ],
    },
    {
      id: 'ex-16-17',
      numberLabel: 'Examples 16 & 17',
      pageRef: 'Textbook p. 11',
      title: 'Long Division Method for 2 numbers (108 m, 144 m wires) and 3 numbers (65, 91, 117):',
      methodName: 'Long Division Method',
      parts: [
        {
          label: 'Ex. 16',
          prompt: 'Find maximum equal piece length from 108 m and 144 m wires',
          steps: [
            'Divide 144 by 108: 144 ÷ 108 = 1, remainder = 36.',
            'Divide previous divisor 108 by remainder 36: 108 ÷ 36 = 3, remainder = 0.',
          ],
          conclusion: 'Last divisor is 36, so maximum length of each equal piece is 36 m.',
        },
        {
          label: 'Ex. 17',
          prompt: 'Find H.C.F of 65, 91 and 117',
          steps: [
            'Step I (91 and 117): 117 ÷ 91 = 1 rem 26 → 91 ÷ 26 = 3 rem 13 → 26 ÷ 13 = 2 rem 0. H.C.F(91, 117) = 13.',
            'Step II (13 and 65): 65 ÷ 13 = 5 rem 0.',
          ],
          conclusion: 'H.C.F of 65, 91 and 117 is 13.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Measuring Tape for Exact Lengths (Practice -7)',
      description:
        'A builder measuring 160 m, 280 m, and 200 m plots needs the longest tape that measures all three with zero left over: H.C.F(160, 280, 200) = 40 m!',
      mathLink: '160 = 40×4, 280 = 40×7, 200 = 40×5',
    },
    {
      title: 'Tiling a Room Floor (Ex. 1.3 Q7)',
      description:
        'A room is 10 m 15 cm long (1,015 cm) and 8 m 80 cm wide (880 cm). Converting both to cm and taking H.C.F(1015, 880) gives the largest square tile: 5 cm!',
      mathLink: 'Always convert metres + centimetres into centimetres first!',
    },
  ],
  interestingFacts: [
    'Remember (p. 9): H.C.F can NEVER be bigger than the smallest given number—because a factor of a number cannot exceed that number!',
    'Ex. 1.3 Q3: The H.C.F of ANY two prime numbers (like 17 and 41) is ALWAYS 1, making every pair of different primes co-prime!',
    'H.C.F was called G.C.D (Greatest Common Divisor) by ancient Greek mathematician Euclid over 2,300 years ago—his Long Division algorithm is still one of the fastest methods in computers today.',
  ],
  classroomActivity: {
    title: 'Activity -2: Pocket Money H.C.F Challenge',
    textbookRef: 'Textbook Activity -2 (p. 12)',
    materials: ['3 slips of paper per group', 'Pencils'],
    steps: [
      'Form groups of three students. Each student writes a 3-digit pocket money amount (for example: Rs. 150, Rs. 225, Rs. 300) on paper.',
      'Combine the three 3-digit numbers in your group.',
      'Use Prime Factorization OR Long Division to find the H.C.F of all three pocket money amounts.',
      'Check: does your H.C.F divide all three numbers completely with zero remainder?',
    ],
    observation:
      'Many random 3-digit amounts turn out to have H.C.F = 1 (co-prime!), while multiples of 5 or 10 share bigger common factors like 15, 25, or 75.',
    discussionPrompt:
      'What happens if two numbers in your group are 101 and 203? Why is their H.C.F equal to 1?',
  },
  homeActivity: {
    title: 'Fruit Basket & Sweet Box Splitting',
    materials: ['Household fruit/biscuits or buttons (e.g., 12 biscuits and 18 dates)', 'Small plates'],
    steps: [
      'Take two different quantities from the kitchen (or draw 16 Science books, 28 Maths books, and 30 English books as in Ex. 1.3 Q5).',
      'Find the largest equal number of items per plate/bundle without mixing the types.',
      'Verify your physical grouping matches H.C.F!',
    ],
    recordingTip: 'For Ex. 1.3 Q5 (16, 28, 30), H.C.F = 2 books per equal bundle!',
  },
  commonErrors: [
    {
      mistakeTitle: 'Including a factor shared by only 2 of 3 numbers',
      wrongThinking: 'Multiplying 2 × 3 = 6 in Example 14 (27, 54, 315) even though 2 only divides 54.',
      howToAvoid: 'For H.C.F, a prime factor MUST appear in EVERY single number (all 3)!',
      exampleFix: 'Only 3 × 3 = 9 appears in 27, 54, AND 315.',
    },
    {
      mistakeTitle: 'Forgetting unit conversion in word problems',
      wrongThinking: 'Trying to find H.C.F of "10.15 m" and "8.80 m" directly without converting to cm.',
      howToAvoid: 'Convert metres and centimetres into one whole-number unit (1 m = 100 cm) first!',
      exampleFix: '10 m 15 cm = 1,015 cm and 8 m 80 cm = 880 cm → H.C.F(1015, 880) = 5 cm.',
    },
  ],
  studyNotes: [
    {
      heading: 'Word Problem Clues for H.C.F',
      points: [
        'Look for keywords: "greatest", "highest", "maximum", "largest square", "equal bundles/rows".',
        'H.C.F is always ≤ the smallest number in the problem.',
        'If H.C.F = 1, the numbers are co-prime.',
      ],
    },
    {
      heading: 'Two Methods at a Glance',
      points: [
        'Prime Factorization: Factorize each separately → multiply primes common to ALL.',
        'Long Division: Divide big ÷ small → previous divisor ÷ remainder → stop at rem 0 (last divisor wins!).',
      ],
    },
  ],
  summaryPoints: [
    'H.C.F (G.C.F / G.C.D) is the greatest number that divides all given numbers completely.',
    'We can find H.C.F by Listing Common Factors, Prime Factorization, or Long Division.',
    'If H.C.F of given numbers is 1, they are called co-prime numbers.',
  ],
  practiceSets: [
    {
      id: 'sec161-ex1-3',
      title: 'Practice -7 & Exercise 1.3',
      pageRef: 'Textbook p. 12',
      instruction: 'Calculate the H.C.F cleanly; enter just the number (or unit if stated).',
      questions: [
        {
          id: 'p161-p7',
          label: 'Practice -7',
          prompt: 'Greatest length of tape to measure 160 m, 280 m and 200 m exactly (in m):',
          acceptedAnswers: ['40', '40 m', '40m'],
          placeholder: 'e.g. 40',
          hint: 'Find H.C.F(160, 280, 200). Notice 160 = 40×4, 280 = 40×7, 200 = 40×5.',
          explanation: 'H.C.F(160, 280, 200) = 2×2×2×5 = 40 m.',
          correctDisplay: '40 m',
        },
        {
          id: 'ex13-q1-vi',
          label: 'Ex 1.3 Q1(vi)',
          prompt: 'Find H.C.F of 36, 54 and 108 by Prime Factorization:',
          acceptedAnswers: ['18'],
          placeholder: 'Enter H.C.F',
          hint: '36 = 2²×3², 54 = 2×3³, 108 = 2²×3³. Common primes: one 2 and two 3s.',
          explanation: 'Common prime factors = 2 × 3 × 3 = 18.',
          correctDisplay: '18',
        },
        {
          id: 'ex13-q2-ii',
          label: 'Ex 1.3 Q2(ii)',
          prompt: 'Find H.C.F of 104 and 234 by Long Division:',
          acceptedAnswers: ['26'],
          placeholder: 'Enter H.C.F',
          hint: '234 ÷ 104 = 2 rem 26; then divide 104 ÷ 26.',
          explanation: '234 ÷ 104 = 2 rem 26; 104 ÷ 26 = 4 rem 0. Last divisor = 26.',
          correctDisplay: '26',
        },
        {
          id: 'ex13-q2-iii',
          label: 'Ex 1.3 Q2(iii)',
          prompt: 'Find H.C.F of 400 and 3,996 by Long Division:',
          acceptedAnswers: ['4'],
          placeholder: 'Enter H.C.F',
          hint: '3996 ÷ 400 = 9 rem 396; then 400 ÷ 396 = 1 rem 4; then 396 ÷ 4 = 99 rem 0.',
          explanation: 'Last divisor is 4, so H.C.F(400, 3996) = 4.',
          correctDisplay: '4',
        },
        {
          id: 'ex13-q4',
          label: 'Ex 1.3 Q4',
          prompt: 'Can the H.C.F of 8 and 64 be greater than 8? (Yes or No)',
          acceptedAnswers: ['no'],
          placeholder: 'Yes or No',
          hint: 'Can any factor of 8 be bigger than 8 itself?',
          explanation: 'No! The H.C.F is always smaller than or equal to the smallest number (here H.C.F(8, 64) = 8).',
          correctDisplay: 'No (H.C.F is 8)',
        },
        {
          id: 'ex13-q5',
          label: 'Ex 1.3 Q5',
          prompt: 'Max equal books per bundle when packing 16 Science, 28 Maths, and 30 English books without mixing:',
          acceptedAnswers: ['2', '2 books'],
          placeholder: 'Enter number',
          hint: 'Find H.C.F(16, 28, 30).',
          explanation: '16=2⁴, 28=2²×7, 30=2×3×5 → common prime factor is only 2.',
          correctDisplay: '2 books',
        },
        {
          id: 'ex13-q6',
          label: 'Ex 1.3 Q6',
          prompt: 'Maximum equal number of students per row for 50, 70, and 80 students:',
          acceptedAnswers: ['10', '10 students'],
          placeholder: 'Enter number',
          hint: 'Find H.C.F(50, 70, 80).',
          explanation: 'H.C.F(50, 70, 80) = 10 students per row.',
          correctDisplay: '10 students',
        },
        {
          id: 'ex13-q7',
          label: 'Ex 1.3 Q7',
          prompt: 'Largest square tile side (in cm) for a 10 m 15 cm × 8 m 80 cm room floor:',
          acceptedAnswers: ['5', '5 cm', '5cm'],
          placeholder: 'e.g. 5',
          hint: 'Convert to cm first: 1,015 cm and 880 cm, then find H.C.F(1015, 880).',
          explanation: '1015 ÷ 880 = 1 rem 135 → 880 ÷ 135 = 6 rem 70 → 135 ÷ 70 = 1 rem 65 → 70 ÷ 65 = 1 rem 5 → 65 ÷ 5 = 13 rem 0. H.C.F = 5 cm.',
          correctDisplay: '5 cm',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa161-1',
      question: 'What is the H.C.F of any two prime numbers (Exercise 1.3 Q3)?',
      options: ['0', '1', '2', 'Their product'],
      correctIndex: 1,
      explanation: 'Two different prime numbers share only 1 as a common factor, so their H.C.F is 1 (they are co-prime).',
    },
    {
      id: 'sa161-2',
      question: 'Using Long Division for 108 and 144 (Example 16), 144 ÷ 108 leaves remainder 36. What is the next step?',
      options: [
        'Divide 144 by 36',
        'Divide 108 by 36',
        'Multiply 108 × 36',
        'Stop and pick 108',
      ],
      correctIndex: 1,
      explanation: 'In the Long Division Method, the remainder (36) becomes the new divisor and the previous divisor (108) becomes the new dividend: 108 ÷ 36 = 3 rem 0.',
    },
    {
      id: 'sa161-3',
      question: 'Which pair of numbers is Co-prime?',
      options: ['12 and 18', '15 and 25', '8 and 15', '14 and 21'],
      correctIndex: 2,
      explanation: 'Factors of 8 are {1, 2, 4, 8} and factors of 15 are {1, 3, 5, 15}. Their only common factor is 1, so H.C.F(8, 15) = 1.',
    },
  ],
};
