import { Router } from 'express';
import { PrismaOptionsRepository } from '../repositories/prisma/prisma-options.repository';
import { PrismaQuestionsRepository } from '../repositories/prisma/prisma-questions.repository';
import { PrismaQuizzesRepository } from '../repositories/prisma/prisma-quizzes.repository';
import { ListQuizzesUseCase } from '../use-cases/quiz/list-quizzes';
import { SubmitQuizUseCase } from '../use-cases/quiz/submit-quiz';

export const quizzesRoutes = Router();

quizzesRoutes.post('/', async (req, res) => {
  try {
    const { title, time, questions, categoryId, description } = req.body;

    const quizzesRepository = new PrismaQuizzesRepository();
    const questionsRepository = new PrismaQuestionsRepository();
    const optionsRepository = new PrismaOptionsRepository();

    const submitQuizUseCase = new SubmitQuizUseCase(
      quizzesRepository,
      questionsRepository,
      optionsRepository
    );

    await submitQuizUseCase.execute({
      title,
      time,
      questions,
      categoryId,
      description,
    });

    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});

quizzesRoutes.get('/', async (req, res) => {
  try {
    const { limit, page } = req.query;

    const quizzesRepository = new PrismaQuizzesRepository();
    const listQuizzesUseCase = new ListQuizzesUseCase(quizzesRepository);

    const quizzes = await listQuizzesUseCase.execute({
      limit: +limit! || 4,
      page: +page! || 1,
    });

    res.status(201).send(quizzes);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});
