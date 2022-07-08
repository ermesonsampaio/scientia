export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  category: Category;
  references: Reference[];
}

export interface Question {
  content: string;
  options: Option[];
}

export interface Option {
  content: string;
  isCorrect: boolean;
}

export interface Category {
  id: string;
  label: string;
}

export interface Reference {
  label: string;
  url: string;
}
