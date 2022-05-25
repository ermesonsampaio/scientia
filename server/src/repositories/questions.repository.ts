import { Quiz } from './quizzes.repository';
import { Option } from './options.repository';

export interface Question {
  id: string;
  quiz?: Quiz;
  quizId?: string;
  content: string;
  options?: Option[];
}

export interface QuestionCreateData {
  quizId: string;
  content: string;
}

export interface QuestionsRepository {
  create(data: QuestionCreateData): Promise<Question>;
}
