import { CategoriesRepository } from '../../repositories/categories.repository';

interface CreateCategoryUseCaseRequest {
  label: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(request: CreateCategoryUseCaseRequest) {
    await this.categoriesRepository.create(request);
  }
}
