export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'binary' | 'scale';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  construct?: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeEstimate: number;
}

export interface Response {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface Score {
  category: string;
  subcategory?: string;
  value: number;
  maxValue: number;
  interpretation: string;
}

export interface AssessmentResult {
  scores: Score[];
  overallFit: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  careerPaths: string[];
  learningResources: string[];
}

export interface WISCARDimension {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}