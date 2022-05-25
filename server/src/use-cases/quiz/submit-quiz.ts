import { OptionsRepository } from '../../repositories/options.repository';
import { QuestionsRepository } from '../../repositories/questions.repository';
import { QuizzesRepository } from '../../repositories/quizzes.repository';

interface SubmitQuizUseCaseRequest {
  title: string;
  time: number;
  description: string;
  questions: {
    content: string;
    options: {
      content: string;
    }[];
  }[];
  categoryId: string;
}

export class SubmitQuizUseCase {
  constructor(
    private quizzesRepository: QuizzesRepository,
    private questionsRepository: QuestionsRepository,
    private optionsRepository: OptionsRepository
  ) {}

  async execute(request: SubmitQuizUseCaseRequest) {
    const { questions, ...quiz } = request;

    const { id: quizId } = await this.quizzesRepository.create(quiz);

    questions.forEach(async ({ options, ...question }) => {
      const { id: questionId } = await this.questionsRepository.create({
        ...question,
        quizId,
      });

      options.forEach(async (option) => {
        await this.optionsRepository.create({
          ...option,
          questionId,
        });
      });
    });
  }
}
