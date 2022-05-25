import { Question } from './questions.repository';

export interface Option {
  id: string;
  content: string;
  isCorrect: boolean;
  question?: Question;
  questionId?: string;
}

export interface OptionCreateData {
  content: string;
  questionId: string;
  isCorrect: boolean;
}

export interface OptionsRepository {
  create(data: OptionCreateData): Promise<void>;
}
