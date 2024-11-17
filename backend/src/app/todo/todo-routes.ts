import { Router } from 'express';
import validateRequest from '@/middlewares/validateRequest';
import { requestHandler } from '@/common/request-handler';
import { todoFiltersSchema, todoSchema } from '@/app/todo/schemas/todo-schema';
import {
  createTodoItem,
  deleteTodoItem,
  getAllTodoItems,
  toggleTodoAsDone,
  updateTodoItem,
} from '@/app/todo/todo-controller';

const todoRoutes = Router();

todoRoutes.post('/todos', validateRequest({ body: todoSchema }), requestHandler(createTodoItem));

todoRoutes.put('/todos/:id', validateRequest({ body: todoSchema }), requestHandler(updateTodoItem));

todoRoutes.get(
  '/todos',
  validateRequest({ query: todoFiltersSchema }),
  requestHandler(getAllTodoItems),
);

todoRoutes.delete('/todos/:id', requestHandler(deleteTodoItem));

todoRoutes.put('/todos/:id/toggle-done', requestHandler(toggleTodoAsDone));

export default todoRoutes;
