import { StandardSectionData } from '../types/textbook';

export const SECTION_1_4_DATA: StandardSectionData = {
  id: 'section-1-4',
  sectionNumber: '1.4',
  title: 'Prime Numbers and Composite Numbers',
  pageRef: 'Textbook pp. 4–7',
  learningObjectives: [
    'Define prime numbers (P) and composite numbers (C) by counting their different factors.',
    'Explain why 1 is classified as neither prime nor composite.',
    'Use the Sieve of Eratosthenes to find all prime numbers from 1 to 100.',
    'Identify twin primes and classify numbers cleanly (Exercise 1.1).',
  ],
  motivatingIntro: {
    heading: 'Why Can 12 Eggs Fit into Many Trays, While 7 Eggs Fit Only One Way?',
    story:
      'Think about packing 12 eggs into equal rows: you can pack them as 1 × 12, 2 × 6, or 3 × 4! Now try packing 7 eggs into equal rows—no matter how hard you try, you can only make 1 single row of 7. Why do some numbers have only two factors while others have many?',
    guidingQuestion:
      'How can we sort all natural numbers into Prime, Composite, and Neither Prime Nor Composite?',
  },
  conceptExplanations: [
    {
      heading: 'Prime Numbers (P) and Composite Numbers (C)',
      paragraphs: [
        'A natural number which has only two different factors, 1 and the number itself, is called a prime number (denoted by P = {2, 3, 5, 7, 11, ...}). For example, 7 has only two factors: 1 and 7.',
        'A natural number which has more than two different factors is a composite number (denoted by C = {4, 6, 8, 9, 10, 12, ...}). Because 1 has only ONE factor (itself), it has neither two factors nor more than two—so 1 is Neither Prime Nor Composite!',
      ],
      formulaHighlight:
        'Factor Count Rule:  1 factor (1) = Neither  |  2 different factors = Prime (P)  |  > 2 factors = Composite (C)',
    },
    {
      heading: 'The Sieve of Eratosthenes & Twin Primes',
      paragraphs: [
        'To find all prime numbers from 1 to 100, circle 1 (neither prime nor composite). Then shade multiples of 2 (except 2), multiples of 3 (except 3), multiples of 5 (except 5), and multiples of 7 (except 7). All 25 numbers left UNSHADED are prime numbers!',
        'When two prime numbers differ by 2 (such as 3 and 5, or 11 and 13), they are called Twin Primes.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Prime Number (P)',
      definition: 'A natural number with exactly two different factors: 1 and the number itself.',
      example: '2, 3, 5, 7, 11, 13, 41 (note: 2 is the ONLY even prime!)',
    },
    {
      term: 'Composite Number (C)',
      definition: 'A natural number that has more than two different factors.',
      example: '4, 6, 8, 9, 38 (factors: 1, 2, 19, 38), 51 (1, 3, 17, 51)',
    },
    {
      term: 'Twin Primes',
      definition: 'Two prime numbers that have a difference of 2.',
      example: '(3, 5), (5, 7), (11, 13), (17, 19), (29, 31), (41, 43), (59, 61), (71, 73)',
    },
  ],
  diagramInfo: {
    title: 'Classification of Natural Numbers & Factor-Array Proof',
    caption:
      'Textbook pp. 4–6: Sorting Natural Numbers into Prime (2 factors), 1 (1 factor), and Composite (> 2 factors).',
    type: 'section-1-4',
  },
  workedExamples: [
    {
      id: 'ex-8',
      numberLabel: 'Example 8',
      pageRef: 'Textbook p. 5',
      title: 'Identify the prime number from (i) 41, (ii) 38, (iii) 51:',
      methodName: 'Counting Factors',
      parts: [
        {
          label: '(i)',
          prompt: 'Check 41',
          steps: [
            'Test divisors 2, 3, 5, 7: none divide 41 completely.',
            'Factors of 41 are only 1 and 41 (2 factors).',
          ],
          conclusion: '41 IS a prime number.',
        },
        {
          label: '(ii) & (iii)',
          prompt: 'Check 38 and 51',
          steps: [
            'Factors of 38: 1, 2, 19, 38 (4 factors > 2).',
            'Factors of 51: 1, 3, 17, 51 (4 factors > 2, since 3 × 17 = 51).',
          ],
          conclusion: 'Neither 38 nor 51 is prime; both are composite numbers.',
        },
      ],
    },
    {
      id: 'ex-9',
      numberLabel: 'Example 9',
      pageRef: 'Textbook p. 5',
      title: 'Identify the composite numbers from (i) 29, (ii) 39, (iii) 56:',
      methodName: 'Counting Factors',
      parts: [
        {
          label: '(i)–(iii)',
          prompt: 'Check factor counts of 29, 39, and 56',
          steps: [
            'Factors of 29: 1, 29 (only 2 factors → prime, not composite).',
            'Factors of 39: 1, 3, 13, 39 (4 factors > 2).',
            'Factors of 56: 1, 2, 4, 7, 8, 14, 28, 56 (8 factors > 2).',
          ],
          conclusion: '39 and 56 are composite numbers; 29 is prime.',
        },
      ],
    },
    {
      id: 'ex-10',
      numberLabel: 'Example 10',
      pageRef: 'Textbook p. 6',
      title: 'Classify 65, 77, 29, 1, 19, 63, 37 into Prime, Composite, and Neither:',
      methodName: '3-Group Classification',
      parts: [
        {
          label: 'Table',
          prompt: 'Sort each number by factor count',
          steps: [
            'Prime (exactly 2 factors): 19 (1, 19), 29 (1, 29), 37 (1, 37).',
            'Composite (> 2 factors): 63 (divisible by 3, 7, 9), 65 (divisible by 5, 13), 77 (divisible by 7, 11).',
            'Neither Prime Nor-Composite: 1 (has only 1 factor).',
          ],
          conclusion: 'Prime = {19, 29, 37}; Composite = {63, 65, 77}; Neither = {1}.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Packing Equal Boxes Without Waste',
      description:
        'A baker with a composite number of laddoos (24) can pack boxes of 2×12, 3×8, or 4×6, whereas a prime number (23) cannot be split into smaller equal boxes.',
      mathLink: 'Composite quantities split cleanly into equal smaller rows.',
    },
    {
      title: 'Digital Passwords & Banking Security',
      description:
        'Modern internet banking locks use very large prime numbers multiplied together because prime factors are hard for computers to split back apart!',
      mathLink: 'Prime numbers act as the building blocks of digital locks.',
    },
  ],
  interestingFacts: [
    'History (p. 6): Eratosthenes (276 BCE – 194 BCE) was a famous Greek mathematician who invented the Sieve of Eratosthenes over 2,200 years ago!',
    '2 is the smallest prime number and the ONLY even prime number—every other even number is composite because it has 2 as a third factor.',
    'Challenge (p. 5): 17 and 71 are reversed-digit primes! Other pairs below 100 are (13, 31), (37, 73), and (79, 97).',
    'Interesting Information (p. 5): Even composite numbers greater than 2 can be written as a sum of two primes (e.g., 8 = 3 + 5). Be careful with odd composites like 27—check before assuming!',
  ],
  classroomActivity: {
    title: 'Stand Up (Composite) / Sit Down (Prime) Game',
    textbookRef: 'Textbook Teaching Point (p. 5) & Activity -1 (p. 6)',
    materials: ['Teacher number list (e.g., 13, 21, 29, 51, 91, 101)', 'Open classroom floor space'],
    steps: [
      'All students stand an arm’s length apart next to their desks.',
      'The teacher calls out a number aloud (start with 13, then 21, 51, 101).',
      'Students sit down if the number is PRIME, and stay standing (or raise hands) if the number is COMPOSITE.',
      'Check tricky odd composite numbers like 21 (3×7) and 51 (3×17) on the board together!',
    ],
    observation:
      'Students discover that odd numbers are not automatically prime—51 and 91 (= 7×13) are composite!',
    discussionPrompt:
      'Why did Eratosthenes only need to cross out multiples of 2, 3, 5, and 7 to find all primes up to 100?',
  },
  homeActivity: {
    title: 'Project -1: Sunday Newspaper Number Hunt',
    materials: ['Old newspaper or magazine page', 'Pencil and notebook'],
    steps: [
      'Read through the front or sports page of a newspaper and pick 5 different numbers (for example: 1, 19, 24, 35, 100).',
      'Sort your chosen numbers as: even or odd, and prime, composite, or neither prime nor composite.',
      'Write all factors and the first three multiples of each number in your notebook.',
    ],
    recordingTip:
      'Note: In Textbook p. 6 Step 6 of the Sieve activity, the book prints "left shaded" by typo—remember it is the UNSHADED numbers (25 of them from 1–100) that are prime!',
  },
  commonErrors: [
    {
      mistakeTitle: 'Thinking 1 is a prime number',
      wrongThinking: 'Counting 1 as prime because it is odd and starts the counting numbers.',
      howToAvoid: 'A prime MUST have two DIFFERENT factors (1 and itself). 1 only has one factor: 1.',
      exampleFix: '1 is Neither Prime Nor Composite. The smallest prime is 2.',
    },
    {
      mistakeTitle: 'Thinking every odd number is prime',
      wrongThinking: 'Guessing 51, 57, or 91 are prime just because they end in odd digits.',
      howToAvoid: 'Always test division by 3, 7, 11: 51 = 3 × 17 and 91 = 7 × 13!',
      exampleFix: '51 and 91 are odd composite numbers.',
    },
  ],
  studyNotes: [
    {
      heading: 'Prime vs Composite Quick Test',
      points: [
        '1 → Neither Prime Nor Composite (1 factor).',
        'Prime (P) → Only 2 different factors (2, 3, 5, 7, 11, ...).',
        'Composite (C) → 3 or more factors (4, 6, 8, 9, 10, ...).',
      ],
    },
    {
      heading: '1–100 Sieve Facts',
      points: [
        'There are 25 prime numbers between 1 and 100.',
        '2 is the ONLY even prime; 0 and 1 are NOT prime.',
        'Twin primes differ by 2 (e.g., 3 & 5, 11 & 13, 17 & 19).',
      ],
    },
  ],
  summaryPoints: [
    'Prime numbers have exactly 2 different factors (1 and themselves); composite numbers have more than 2 factors.',
    'The number 1 has only one factor, so it is neither prime nor composite.',
    'The Sieve of Eratosthenes filters out composite multiples of 2, 3, 5, and 7 to leave all 25 primes up to 100.',
  ],
  practiceSets: [
    {
      id: 'sec14-ex1-1',
      title: 'Exercise 1.1 & Practice -4',
      pageRef: 'Textbook p. 6 (Ex. 1.1 Q1–Q7)',
      instruction: 'Use the textbook exercises below; separate lists with commas.',
      questions: [
        {
          id: 'ex11-q1-30',
          label: 'Ex 1.1 Q1(i)',
          prompt: 'Write all factors of 30:',
          acceptedAnswers: ['1, 2, 3, 5, 6, 10, 15, 30'],
          unorderedNumbers: [1, 2, 3, 5, 6, 10, 15, 30],
          placeholder: 'e.g. 1, 2, 3, ...',
          hint: 'Pairs: 1×30, 2×15, 3×10, 5×6.',
          explanation: '30 has 8 factors: 1, 2, 3, 5, 6, 10, 15, 30.',
          correctDisplay: '1, 2, 3, 5, 6, 10, 15, 30',
        },
        {
          id: 'ex11-q1-105',
          label: 'Ex 1.1 Q1(v)',
          prompt: 'Write all factors of 105:',
          acceptedAnswers: ['1, 3, 5, 7, 15, 21, 35, 105'],
          unorderedNumbers: [1, 3, 5, 7, 15, 21, 35, 105],
          placeholder: 'e.g. 1, 3, 5, ...',
          hint: 'Pairs: 1×105, 3×35, 5×21, 7×15.',
          explanation: '105 = 3 × 5 × 7, giving 8 factors: 1, 3, 5, 7, 15, 21, 35, 105.',
          correctDisplay: '1, 3, 5, 7, 15, 21, 35, 105',
        },
        {
          id: 'ex11-q2-13',
          label: 'Ex 1.1 Q2(ii)',
          prompt: 'Write the first five multiples of 13:',
          acceptedAnswers: ['13, 26, 39, 52, 65'],
          orderedNumbers: [13, 26, 39, 52, 65],
          placeholder: '13, 26, ...',
          hint: 'Multiply 13 by 1, 2, 3, 4, and 5.',
          explanation: '13×1=13, 13×2=26, 13×3=39, 13×4=52, 13×5=65.',
          correctDisplay: '13, 26, 39, 52, 65',
        },
        {
          id: 'ex11-q3',
          label: 'Ex 1.1 Q3',
          prompt: 'List all prime numbers between 30 and 65:',
          acceptedAnswers: ['31, 37, 41, 43, 47, 53, 59, 61'],
          unorderedNumbers: [31, 37, 41, 43, 47, 53, 59, 61],
          placeholder: '31, 37, ...',
          hint: 'Check odd numbers from 31 to 61; watch out that 33, 39, 45, 49, 51, 55, 57, 63 are composite!',
          explanation: 'The 8 primes between 30 and 65 are 31, 37, 41, 43, 47, 53, 59, 61.',
          correctDisplay: '31, 37, 41, 43, 47, 53, 59, 61',
        },
        {
          id: 'ex11-q4',
          label: 'Ex 1.1 Q4',
          prompt: 'How many even prime numbers are between 50 and 100?',
          acceptedAnswers: ['0', 'none'],
          placeholder: 'Enter count (0, 1, ...)',
          hint: 'Remember: 2 is the ONLY even prime number.',
          explanation: 'There are 0 even prime numbers between 50 and 100 because every even number > 2 has 2 as a third factor.',
          correctDisplay: '0 (None)',
        },
        {
          id: 'ex11-q5',
          label: 'Ex 1.1 Q5',
          prompt: 'What is the only even prime number in natural and whole numbers?',
          acceptedAnswers: ['2'],
          placeholder: 'Enter number',
          hint: 'It has only factors 1 and itself.',
          explanation: '2 is the only even prime number.',
          correctDisplay: '2',
        },
        {
          id: 'ex11-q7',
          label: 'Ex 1.1 Q7',
          prompt: 'Which natural number is neither prime nor composite?',
          acceptedAnswers: ['1'],
          placeholder: 'Enter number',
          hint: 'In whole numbers, 0 also has infinitely many divisors, while in natural numbers this number has just 1 factor.',
          explanation: '1 is neither prime nor composite (in whole numbers, 0 is also neither prime nor composite).',
          correctDisplay: '1',
        },
        {
          id: 'ex11-twin',
          label: 'Practice -4',
          prompt: 'Write the twin prime pair between 15 and 25:',
          acceptedAnswers: ['17, 19', '17 and 19'],
          unorderedNumbers: [17, 19],
          placeholder: 'e.g. 11, 13',
          hint: 'Find two primes between 15 and 25 that differ by 2.',
          explanation: '17 and 19 are both prime and 19 − 17 = 2.',
          correctDisplay: '17, 19',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa14-1',
      question: 'Which number in Textbook Example 8 is a prime number?',
      options: ['38', '41', '51', '1'],
      correctIndex: 1,
      explanation: '41 has only two factors (1 and 41). 38 = 2×19, 51 = 3×17, and 1 is neither prime nor composite.',
    },
    {
      id: 'sa14-2',
      question: 'Why is 51 a composite number?',
      options: [
        'Because it is an odd number',
        'Because it ends in 1',
        'Because it has more than two factors (1, 3, 17, 51)',
        'Because 5 + 1 = 6',
      ],
      correctIndex: 2,
      explanation: '51 = 3 × 17, giving it four factors (1, 3, 17, 51), which is more than two.',
    },
    {
      id: 'sa14-3',
      question: 'Which pair is a Twin Prime pair?',
      options: ['2 and 3', '9 and 11', '29 and 31', '15 and 17'],
      correctIndex: 2,
      explanation: 'Both 29 and 31 are prime numbers and their difference is 31 − 29 = 2.',
    },
  ],
};
