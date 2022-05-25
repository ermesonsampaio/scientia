import { prisma } from '../../prisma';
import {
  Question,
  QuestionCreateData,
  QuestionsRepository,
} from '../questions.repository';

export class PrismaQuestionsRepository implements QuestionsRepository {
  async create(data: QuestionCreateData): Promise<Question> {
    return await prisma.question.create({
      data,
    });
  }
}
