import { Router } from 'express';
import validateRequest from '@/middlewares/validateRequest';
import { requestHandler } from '@/common/request-handler';
import { todoSchema } from '@/app/todo/schemas/todo-schema';
import { createTodoItem } from '@/app/todo/todo-controller';

const todoRoutes = Router();

todoRoutes.post('/todos', validateRequest({ body: todoSchema }), requestHandler(createTodoItem));

export default todoRoutes;
