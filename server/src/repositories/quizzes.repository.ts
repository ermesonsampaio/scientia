import { Question } from './questions.repository';
import { Category } from './categories.repository';
import { Reference } from './references.repository';

export interface Quiz {
  id: string;
  title: string;
  time: number;
  description: string;
  questions?: Question[];
  categoryId: string | null;
  category?: Category | null;
  references?: Reference[];
}

export interface QuizCreateData {
  title: string;
  time: number;
  categoryId?: string;
  description: string;
}

export interface QuizFindData {
  where?: {
    id?: string;
    title?: string;
    time?: number;
    description?: string;
    categoryId?: string | null;
    category?: {
      id: string;
      label: string;
    };
  };
  skip?: number;
  take?: number;
}

export interface QuizzesRepository {
  create(data: QuizCreateData): Promise<Quiz>;
  find(data?: QuizFindData): Promise<Quiz[]>;
}
