import { prisma } from '../../prisma';
import {
  Quiz,
  QuizCreateData,
  QuizFindData,
  QuizzesRepository,
} from '../quizzes.repository';

export class PrismaQuizzesRepository implements QuizzesRepository {
  async create({ categoryId, ...data }: QuizCreateData): Promise<Quiz> {
    return await prisma.quiz.create({
      data: {
        ...data,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async find(data?: QuizFindData): Promise<Quiz[]> {
    return await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
        category: true,
      },
      ...data,
    });
  }
}
