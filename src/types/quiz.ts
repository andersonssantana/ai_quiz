export interface QuizOption {
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct: string;
}

export interface QuizQuestionProps {
  questionData: QuizQuestion;
  questionNumber: number;
}

export interface ApiResponse {
  questions: QuizQuestion[];
}

export type QuizState = 'idle' | 'loading' | 'success' | 'error';

export interface AppState {
  subject: string;
  questions: QuizQuestion[];
  isLoading: boolean;
  error: string | null;
}