import { Router } from 'express';
import validateRequest from '@/middlewares/validateRequest';
import { requestHandler } from '@/common/request-handler';
import { todoFiltersSchema, todoSchema } from '@/app/todo/schemas/todo-schema';
import { createTodoItem, deleteTodoItem, getAllTodoItems } from '@/app/todo/todo-controller';

const todoRoutes = Router();

todoRoutes.post('/todos', validateRequest({ body: todoSchema }), requestHandler(createTodoItem));

todoRoutes.get(
  '/todos',
  validateRequest({ query: todoFiltersSchema }),
  requestHandler(getAllTodoItems),
);

todoRoutes.delete('/todos/:id', requestHandler(deleteTodoItem));

export default todoRoutes;
