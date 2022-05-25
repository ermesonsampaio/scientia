import { QuizzesRepository } from '../../repositories/quizzes.repository';

interface ListQuizzesUseCaseRequest {
  limit: number;
  page: number;
}

export class ListQuizzesUseCase {
  constructor(private quizzesRepository: QuizzesRepository) {}

  async execute({ limit, page }: ListQuizzesUseCaseRequest) {
    return await this.quizzesRepository.find({
      skip: limit * (page - 1),
      take: limit,
    });
  }
}
