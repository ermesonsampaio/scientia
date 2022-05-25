import { prisma } from '../../prisma';
import {
  CategoriesRepository,
  Category,
  CategoryCreateData,
} from '../categories.repository';

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: CategoryCreateData): Promise<void> {
    await prisma.category.create({
      data,
    });
  }

  async find(): Promise<Category[]> {
    return await prisma.category.findMany({
      include: {
        quizzes: true,
      },
    });
  }
}
