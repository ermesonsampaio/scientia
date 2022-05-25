import { prisma } from '../../prisma';
import { OptionCreateData, OptionsRepository } from '../options.repository';

export class PrismaOptionsRepository implements OptionsRepository {
  async create(data: OptionCreateData): Promise<void> {
    await prisma.option.create({
      data,
    });
  }
}
