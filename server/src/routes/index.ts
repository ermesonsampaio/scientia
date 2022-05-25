import { Router } from 'express';
import { quizzesRoutes } from './quizzes';
import { categoriesRoutes } from './categories';

export const routes = Router();

routes.use('/quizzes', quizzesRoutes);
routes.use('/categories', categoriesRoutes);
