export interface Quiz {
  id: string;
  title: string;
  time: number;
  description: string;
  questions: Question[];
  category: Category;
  references?: Reference[];
}

export interface Question {
  id: string;
  quizId: string;
  content: string;
  options: Option[];
}

export interface Option {
  id: string;
  questionId: string;
  content: string;
  isCorrect: boolean;
}

export interface Category {
  id: string;
  label: string;
  quizzes: Quiz[];
}

export interface Reference {
  id: string;
  label: string;
  url: string;
  quizzes?: Quiz[];
}

export type HistoricItem = {
  id: string;
  title: string;
  time: number;
  category: string;
  author: string;
  questions: HistoricQuestion[];
};

export interface HistoricQuestion {
  id: string;
  quizId: string;
  content: string;
  selectedOption: Option;
}
