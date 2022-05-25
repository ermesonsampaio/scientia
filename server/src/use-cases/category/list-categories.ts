import { CategoriesRepository } from '../../repositories/categories.repository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute() {
    return await this.categoriesRepository.find();
  }
}
