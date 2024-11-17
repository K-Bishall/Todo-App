import { Request, Response } from 'express';
import * as todoService from '@/app/todo/todo-service';
import { TodoRequest } from '@/app/todo/schemas/todo-schema';

export async function createTodoItem(request: Request, response: Response) {
  const data: TodoRequest = request.body;
  const todoItem = await todoService.createTodoItem(data);

  return response.json(todoItem);
}
