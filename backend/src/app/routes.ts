import { Router } from 'express';
import todoRoutes from '@/app/todo/todo-routes';

const appRouter = Router();

appRouter.use(todoRoutes);

export default appRouter;
