import { StandardSectionData } from '../types/textbook';

export const SECTION_1_3_DATA: StandardSectionData = {
  id: 'section-1-3',
  sectionNumber: '1.3',
  title: 'Identification of Multiples of Numbers up to 4-Digit',
  pageRef: 'Textbook p. 4',
  learningObjectives: [
    'Generate multiples of any given number by multiplying by 1, 2, 3, 4, 5, ...',
    'Test whether a given 2-, 3-, or 4-digit number (up to 9,999) is a multiple of a smaller number.',
    'Connect multiples and factors: a multiple is the dividend when the base number is its factor.',
    'Explain why a 4-digit number is or is not a multiple using zero-remainder division.',
  ],
  motivatingIntro: {
    heading: 'Checking Bus Ticket Serial Numbers',
    story:
      'At a Lahore school carnival, lucky draw coupons are printed only on multiples of 13—like 13, 26, 39, and even 4-digit numbers such as 1,326! When a student checks coupon 45 or coupon 1,326, how can we quickly decide whether it is a true multiple of 13?',
    guidingQuestion:
      'Without listing every single multiple up to 9,999, how can we test if a 4-digit number is a multiple of a given number?',
  },
  conceptExplanations: [
    {
      heading: 'Generating Multiples Using Counting Numbers',
      paragraphs: [
        'As the textbook Remember box on page 4 teaches: "To find the multiples of any given number, simply multiply the given number by 1, 2, 3, 4, 5, ..."',
        'Because counting numbers go on forever, every number has unlimited multiples. The smallest non-zero multiple of any number is the number itself (when multiplied by 1), and every multiple after that is larger.',
      ],
      formulaHighlight: 'Multiples of n:  n × 1,  n × 2,  n × 3,  n × 4,  n × 5,  ...',
    },
    {
      heading: 'Identifying Multiples up to 4-Digit Numbers',
      paragraphs: [
        'Suppose we want to check whether a larger number (up to 4 digits, from 1000 to 9999) is a multiple of 13 or 45. Listing all multiples from ×1 up to ×200 would take far too long!',
        'Instead, remember that a multiple is the dividend for which the given number is a factor. So we divide the 4-digit candidate by the given number. If the remainder is 0, the candidate IS a multiple! If the remainder is not 0, it is NOT a multiple.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Multiple of a Number',
      definition: 'The product obtained by multiplying a given number by 1, 2, 3, 4, ...',
      example: 'Multiples of 13 are 13, 26, 39, 52, 65, ...',
    },
    {
      term: '4-Digit Candidate',
      definition: 'Any whole number from 1,000 to 9,999 tested to see if it divides cleanly by a base number.',
      example: '1,326 ÷ 13 = 102 (rem 0), so 1,326 is a multiple of 13.',
    },
    {
      term: 'Unlimited Multiples',
      definition: 'Multiples never stop because you can keep multiplying by larger counting numbers forever.',
      example: 'Multiples of 76 go 76, 152, 228, ..., 760, ..., 7,600, ...',
    },
  ],
  diagramInfo: {
    title: 'Multiples of 13 Hop Line & Testing 45 vs. 65',
    caption:
      'Textbook Example 7 (p. 4): Multiples land cleanly on the skip-counting dots; 45 falls between 39 and 52 (not a multiple), while 65 lands on ×5.',
    type: 'section-1-3',
  },
  workedExamples: [
    {
      id: 'ex-7',
      numberLabel: 'Example 7',
      pageRef: 'Textbook p. 4',
      title: 'Identify which of the following numbers are the multiples of 13:',
      methodName: 'Division Remainder & Multiplication Check',
      parts: [
        {
          label: '(i)',
          prompt: 'Test 39 as a multiple of 13',
          steps: [
            'Divide 39 by 13: 39 ÷ 13 = 3.',
            'Verify: 13 × 3 = 39 (remainder = 0).',
          ],
          conclusion: '39 IS a multiple of 13.',
        },
        {
          label: '(ii)',
          prompt: 'Test 45 as a multiple of 13',
          steps: [
            'Divide 45 by 13: 13 × 3 = 39.',
            'Subtract: 45 − 39 = 6 (remainder = 6 ≠ 0).',
          ],
          conclusion: '45 is NOT a multiple of 13.',
        },
        {
          label: '(iii)',
          prompt: 'Test 65 as a multiple of 13',
          steps: [
            'Divide 65 by 13: 65 ÷ 13 = 5.',
            'Verify: 13 × 5 = 65 (remainder = 0).',
          ],
          conclusion: '65 IS a multiple of 13.',
        },
        {
          label: '(iv)',
          prompt: 'Test 99 as a multiple of 13',
          steps: [
            'Divide 99 by 13: 13 × 7 = 91.',
            'Subtract: 99 − 91 = 8 (remainder = 8 ≠ 0).',
          ],
          conclusion: '99 is NOT a multiple of 13.',
        },
      ],
    },
    {
      id: 'ex-13-4digit',
      numberLabel: '4-Digit Extension',
      pageRef: 'Aligned with Section 1.3 (p. 4)',
      title: 'Is 1,352 a multiple of 13?',
      methodName: '4-Digit Long Division Check',
      parts: [
        {
          label: '(i)',
          prompt: 'Divide 1,352 by 13 step by step',
          steps: [
            'First two digits 13 ÷ 13 = 1 (remainder 0).',
            'Bring down 5: 5 ÷ 13 = 0, write 0 in the quotient.',
            'Bring down 2 to make 52: 52 ÷ 13 = 4, remainder = 0.',
          ],
          conclusion: 'Yes! Because 13 × 104 = 1,352 with zero remainder, 1,352 IS a multiple of 13.',
        },
      ],
    },
  ],
  realLifeApplications: [
    {
      title: 'Electricity Meter & Shop Cash Bundles',
      description:
        'A shopkeeper bundles Rs. 500 notes or Rs. 1,000 notes. Any total cash amount like Rs. 4,500 or Rs. 8,000 is a 4-digit multiple of 500!',
      mathLink: '4,500 ÷ 500 = 9 notes (4,500 is a multiple of 500)',
    },
    {
      title: 'Calendar & Weekly School Timetables',
      description:
        'If a science lab happens every 7 days, day 7, 14, 21, ..., and even day 1,050 in a school archive are multiples of 7.',
      mathLink: '1,050 ÷ 7 = 150 weeks exactly',
    },
  ],
  interestingFacts: [
    'Multiples of any odd number alternate between odd and even: 13 (odd), 26 (even), 39 (odd), 52 (even).',
    'Multiples of any even number are ALWAYS even—you can never get an odd multiple of 12, 36, or 76!',
    'Any 4-digit number formed by repeating a 2-digit number (like 1313 or 4545) is automatically a multiple of that 2-digit number (13 × 101 = 1,313)!',
  ],
  classroomActivity: {
    title: 'Activity -1: Matchstick Multiples of 3',
    textbookRef: 'Textbook Activity -1 (p. 4)',
    materials: ['1 matchbox per pair (safe unused/spent matchsticks)', 'Chalkboard or notebook'],
    steps: [
      'Bring a matchbox to class and form groups of 2 or 3 students.',
      'Lay down 1 group of 3 matchsticks to build the first multiple (3 × 1 = 3).',
      'Add another triangle/bundle of 3 matchsticks for 3 × 2 = 6, then 3 × 3 = 9, 3 × 4 = 12, and 3 × 5 = 15.',
      'Now place 14 matchsticks on the desk and test if they form complete bundles of 3.',
    ],
    observation:
      'Every multiple of 3 makes complete bundles of 3 with zero sticks left over, whereas 14 leaves 2 sticks leftover.',
    discussionPrompt:
      'Can you predict without counting if 300 matchsticks would make complete bundles of 3?',
  },
  homeActivity: {
    title: '4-Digit Number Plate & Meter Check',
    materials: ['A 4-digit number from a clock, odometer, receipt, or car plate', 'Notebook and pencil'],
    steps: [
      'Write down any two 4-digit numbers you spot at home (for example, Rs. 2,400 on a grocery bill or 1,245 on an electricity unit display).',
      'Test whether each 4-digit number is a multiple of 5, 10, and 15 by dividing.',
      'Write down the two nearest multiples if there is a remainder.',
    ],
    recordingTip:
      'Circle the 4-digit numbers that give remainder 0—these are true multiples!',
  },
  commonErrors: [
    {
      mistakeTitle: 'Confusing factors and multiples',
      wrongThinking: 'Saying "3 is a multiple of 36" instead of "36 is a multiple of 3".',
      howToAvoid: 'Remember: multiples of a number are ALWAYS greater than or equal to the number (except 0).',
      exampleFix: '36 is a multiple of 3 (and 3 is a factor of 36).',
    },
    {
      mistakeTitle: 'Forgetting to write 0 in the quotient',
      wrongThinking: 'Dividing 1,352 ÷ 13 and writing 14 instead of 104 by skipping the middle 0.',
      howToAvoid: 'When bringing down 5 (< 13), place a 0 above the 5 before bringing down the next digit 2.',
      exampleFix: '1,352 ÷ 13 = 104 (check: 13 × 104 = 1,352).',
    },
  ],
  studyNotes: [
    {
      heading: 'How to List Multiples',
      points: [
        'Multiply the given number by 1, 2, 3, 4, 5, ...',
        'Every number is the 1st multiple of itself (n × 1 = n).',
        'Multiples keep growing and never end.',
      ],
    },
    {
      heading: 'How to Test a 4-Digit Multiple',
      points: [
        'Divide: Candidate ÷ Base Number.',
        'If Remainder = 0 → Yes, it IS a multiple.',
        'If Remainder ≠ 0 → No, it is NOT a multiple.',
      ],
    },
  ],
  summaryPoints: [
    'Multiples of any number are found by multiplying it by 1, 2, 3, 4, 5, ...',
    'Every multiple of a number is greater than or equal to the number itself.',
    'To test if a 2-, 3-, or 4-digit number is a multiple of n, divide it by n and check for zero remainder.',
  ],
  practiceSets: [
    {
      id: 'sec13-practice3-multiples',
      title: 'Practice -3 (Multiples Part) & 4-Digit Multiple Checks',
      pageRef: 'Textbook p. 4',
      instruction:
        'Write the first 5 multiples separated by commas, or answer Yes / No for the 4-digit multiple checks.',
      questions: [
        {
          id: 'p13-q1',
          label: 'Practice -3 (i)',
          prompt: 'Write the first 5 multiples of 36:',
          acceptedAnswers: ['36, 72, 108, 144, 180'],
          orderedNumbers: [36, 72, 108, 144, 180],
          placeholder: 'e.g. 36, 72, ...',
          hint: 'Multiply 36 by 1, 2, 3, 4, and 5.',
          explanation: '36×1=36, 36×2=72, 36×3=108, 36×4=144, 36×5=180.',
          correctDisplay: '36, 72, 108, 144, 180',
        },
        {
          id: 'p13-q2',
          label: 'Practice -3 (ii)',
          prompt: 'Write the first 5 multiples of 45:',
          acceptedAnswers: ['45, 90, 135, 180, 225'],
          orderedNumbers: [45, 90, 135, 180, 225],
          placeholder: 'e.g. 45, 90, ...',
          hint: 'Multiply 45 by 1, 2, 3, 4, and 5 (notice every multiple ends in 5 or 0!).',
          explanation: '45×1=45, 45×2=90, 45×3=135, 45×4=180, 45×5=225.',
          correctDisplay: '45, 90, 135, 180, 225',
        },
        {
          id: 'p13-q3',
          label: 'Practice -3 (iii)',
          prompt: 'Write the first 5 multiples of 76:',
          acceptedAnswers: ['76, 152, 228, 304, 380'],
          orderedNumbers: [76, 152, 228, 304, 380],
          placeholder: 'e.g. 76, 152, ...',
          hint: 'Add 76 step by step: 76, 76+76=152, 152+76=228, ...',
          explanation: '76×1=76, 76×2=152, 76×3=228, 76×4=304, 76×5=380.',
          correctDisplay: '76, 152, 228, 304, 380',
        },
        {
          id: 'p13-q4',
          label: '4-Digit Check (a)',
          prompt: 'Is 1,326 a multiple of 13? (Yes or No)',
          acceptedAnswers: ['yes'],
          placeholder: 'Yes or No',
          hint: 'Note that 1,300 = 13 × 100 and 26 = 13 × 2.',
          explanation: '1,326 ÷ 13 = 102 with remainder 0, so 1,326 IS a multiple of 13.',
          correctDisplay: 'Yes',
        },
        {
          id: 'p13-q5',
          label: '4-Digit Check (b)',
          prompt: 'Is 2,405 a multiple of 10? (Yes or No)',
          acceptedAnswers: ['no'],
          placeholder: 'Yes or No',
          hint: 'Every multiple of 10 must end in 0.',
          explanation: '2,405 ÷ 10 = 240 remainder 5, so 2,405 is NOT a multiple of 10.',
          correctDisplay: 'No',
        },
        {
          id: 'p13-q6',
          label: '4-Digit Check (c)',
          prompt: 'What is the 40th multiple of 76? (Calculate 76 × 40)',
          acceptedAnswers: ['3040', '3,040'],
          placeholder: 'Enter 4-digit number',
          hint: 'First find 76 × 4 = 304, then multiply by 10.',
          explanation: '76 × 40 = 3,040, which is a 4-digit multiple of 76.',
          correctDisplay: '3,040',
        },
      ],
    },
  ],
  selfAssessment: [
    {
      id: 'sa13-1',
      question: 'From Textbook Example 7, which pair of numbers are BOTH multiples of 13?',
      options: ['39 and 45', '45 and 99', '39 and 65', '65 and 99'],
      correctIndex: 2,
      explanation: '13 × 3 = 39 and 13 × 5 = 65 (both remainder 0), whereas 45 and 99 leave remainders 6 and 8.',
    },
    {
      id: 'sa13-2',
      question: 'Which 4-digit number is a multiple of 45?',
      options: ['1,800', '1,805', '1,810', '1,820'],
      correctIndex: 0,
      explanation: '1,800 ÷ 45 = 40 with remainder 0, so 1,800 is the 40th multiple of 45.',
    },
    {
      id: 'sa13-3',
      question: 'How many multiples does the number 19 have?',
      options: ['Only 19 multiples', 'Up to 100 multiples', 'Unlimited multiples', 'Only 2 multiples'],
      correctIndex: 2,
      explanation: 'As stated in the textbook Fun Facts, every non-zero number has unlimited multiples.',
    },
  ],
};
