export interface ChapterTocItem {
  id: string;
  code: string;
  title: string;
  pageRange: string;
  status: 'active' | 'upcoming';
}

export interface KeyTermItem {
  term: string;
  definition: string;
  example: string;
}

export interface WorkedExamplePart {
  label: string;
  prompt: string;
  divisionLayout?: {
    divisor: number;
    dividend: number;
    quotient: number;
    remainder: number;
    steps: string[];
  };
  steps: string[];
  conclusion: string;
  note?: string;
}

export interface WorkedExample {
  id: string;
  number: number;
  pageRef: string;
  title: string;
  methodName: string;
  parts?: WorkedExamplePart[];
  factorPairs?: {
    target: number;
    pairs: [number, number][];
    factors: number[];
  }[];
  multipleColumns?: {
    base: number;
    rows: { multiplier: number; product: number }[];
    listText: string;
  }[];
}

export interface CommonErrorItem {
  mistakeTitle: string;
  wrongThinking: string;
  howToAvoid: string;
  exampleFix: string;
}

export interface PracticeQuestion {
  id: string;
  label: string;
  prompt: string;
  expectedValues: number[];
  ordered?: boolean;
  hint: string;
}

export interface SelfAssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type PracticalActivityCategory =
  | 'group'
  | 'individual'
  | 'pair'
  | 'home'
  | 'real-life'
  | 'creative';

export type PracticalActivityIllustrationType =
  | 'matchsticks'
  | 'paper-strip'
  | 'number-cards'
  | 'home-counters'
  | 'real-life-packs'
  | 'creative-garden';

export interface PracticalActivityItem {
  id: string;
  number: number;
  category: PracticalActivityCategory;
  categoryLabel: string;
  settingInfo: string;
  title: string;
  learningPurpose: string;
  materialsRequired: string[];
  instructions: string[];
  expectedObservation: string;
  mathematicalConclusion: string;
  reflectionQuestions: string[];
  illustrationType: PracticalActivityIllustrationType;
}

export type PracticeBankCategory =
  | 'mcq'
  | 'fill-blank'
  | 'true-false'
  | 'short-answer'
  | 'problem-solving'
  | 'real-life'
  | 'challenge';

export interface PracticeBankQuestion {
  id: string;
  category: PracticeBankCategory;
  categoryLabel: string;
  prompt: string;
  contextNote?: string;
  options?: string[];
  correctIndex?: number;
  correctBoolean?: boolean;
  acceptedTextAnswers?: string[];
  expectedNumbers?: number[];
  orderedNumbers?: boolean;
  placeholder?: string;
  hint: string;
  explanation: string;
  correctDisplay: string;
}

export interface LessonSectionData {
  id: string;
  sectionNumber: string;
  title: string;
  pageRef: string;
  motivatingIntro: {
    heading: string;
    story: string;
    guidingQuestion: string;
  };
  learningObjectives: string[];
  subsections: {
    code: string;
    title: string;
    pageRef: string;
    conceptExplanation: string[];
    formalDefinition: string;
    secondaryDefinition?: string;
    formulaHighlight?: string;
    divisionDemo?: {
      dividend: number;
      divisors: number[];
    };
    rememberNotes: string[];
  }[];
  keyTerms: KeyTermItem[];
  workedExamples: WorkedExample[];
  realLifeApplications: {
    title: string;
    description: string;
    mathLink: string;
  }[];
  funFacts: string[];
  classroomActivity: {
    title: string;
    textbookRef: string;
    materials: string[];
    steps: string[];
    discussionPrompt: string;
  };
  homeActivity: {
    title: string;
    materials: string[];
    steps: string[];
    recordingTip: string;
  };
  practicalActivities: PracticalActivityItem[];
  commonErrors: CommonErrorItem[];
  studyNotes: {
    heading: string;
    points: string[];
  }[];
  summaryPoints: string[];
  practiceSets: {
    id: string;
    title: string;
    pageRef: string;
    instruction: string;
    questions: PracticeQuestion[];
  }[];
  selfAssessment: SelfAssessmentQuestion[];
}

export interface StandardSectionExample {
  id: string;
  numberLabel: string;
  pageRef: string;
  title: string;
  methodName: string;
  parts: {
    label: string;
    prompt: string;
    steps: string[];
    conclusion: string;
    note?: string;
  }[];
}

export interface StandardSectionData {
  id: string;
  sectionNumber: string;
  title: string;
  pageRef: string;
  learningObjectives: string[];
  motivatingIntro: {
    heading: string;
    story: string;
    guidingQuestion: string;
  };
  conceptExplanations: {
    heading: string;
    paragraphs: string[];
    formulaHighlight?: string;
  }[];
  keyTerms: KeyTermItem[];
  workedExamples: StandardSectionExample[];
  diagramInfo: {
    title: string;
    caption: string;
    type:
      | 'section-1-2'
      | 'section-1-3'
      | 'section-1-4'
      | 'section-1-5'
      | 'section-1-6-1'
      | 'section-1-6-2'
      | 'section-1-7'
      | 'section-1-8';
  };
  classroomActivity: {
    title: string;
    textbookRef: string;
    materials: string[];
    steps: string[];
    observation: string;
    discussionPrompt: string;
  };
  homeActivity: {
    title: string;
    materials: string[];
    steps: string[];
    recordingTip: string;
  };
  interestingFacts: string[];
  realLifeApplications: {
    title: string;
    description: string;
    mathLink: string;
  }[];
  commonErrors: CommonErrorItem[];
  studyNotes: {
    heading: string;
    points: string[];
  }[];
  practiceSets: {
    id: string;
    title: string;
    pageRef: string;
    instruction: string;
    questions: {
      id: string;
      label: string;
      prompt: string;
      acceptedAnswers: string[];
      unorderedNumbers?: number[];
      orderedNumbers?: number[];
      placeholder: string;
      hint: string;
      explanation: string;
      correctDisplay: string;
    }[];
  }[];
  selfAssessment: SelfAssessmentQuestion[];
  summaryPoints: string[];
}

export type AssessmentQuestionCategory =
  | 'mcq'
  | 'fill-blank'
  | 'true-false'
  | 'short-answer'
  | 'problem-solving'
  | 'real-life'
  | 'higher-order';

export type AssessmentDifficulty = 'easy' | 'medium' | 'challenge';

export type AssessmentSectionTag =
  | '1.1'
  | '1.2'
  | '1.3'
  | '1.4'
  | '1.5'
  | '1.6.1'
  | '1.6.2'
  | '1.7'
  | '1.8';

export interface AssessmentQuestion {
  id: string;
  category: AssessmentQuestionCategory;
  categoryLabel: string;
  sectionTag: AssessmentSectionTag;
  difficulty: AssessmentDifficulty;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctBoolean?: boolean;
  acceptedTextAnswers?: string[];
  expectedNumbers?: number[];
  orderedNumbers?: boolean;
  placeholder?: string;
  hint: string;
  explanation: string;
  correctDisplay: string;
  textbookRef?: string;
}

