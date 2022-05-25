import { Quiz } from './quizzes.repository';

export interface Category {
  id: string;
  label: string;
  quizzes?: Quiz[];
}

export interface CategoryCreateData {
  label: string;
}

export interface CategoriesRepository {
  create(data: CategoryCreateData): Promise<void>;
  find(): Promise<Category[]>;
}
