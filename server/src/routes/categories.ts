import { Router } from 'express';
import { PrismaCategoriesRepository } from '../repositories/prisma/prisma-categories.repository';
import { CreateCategoryUseCase } from '../use-cases/category/create-category';
import { ListCategoriesUseCase } from '../use-cases/category/list-categories';

export const categoriesRoutes = Router();

categoriesRoutes.post('/', async (req, res) => {
  try {
    const { label } = req.body;

    const categoriesRepository = new PrismaCategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository
    );
    await createCategoryUseCase.execute({ label });

    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

categoriesRoutes.get('/', async (req, res) => {
  try {
    const categoriesRepository = new PrismaCategoriesRepository();
    const listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepository
    );

    const categories = await listCategoriesUseCase.execute();

    res.status(201).send(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
});
