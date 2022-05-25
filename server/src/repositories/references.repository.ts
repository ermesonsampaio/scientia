import { Quiz } from './quizzes.repository';

export interface Reference {
  id: string;
  label: string;
  url: string;
  quizzes?: Quiz[];
}

export interface ReferenceCreateData {
  label: string;
  url: string;
}

export interface ReferencesRepository {
  create(data: ReferenceCreateData): Promise<Reference>;
}
