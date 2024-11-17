import { Request, Response } from 'express';
import * as todoService from '@/app/todo/todo-service';
import { TodoFilters, TodoRequest } from '@/app/todo/schemas/todo-schema';

export async function createTodoItem(request: Request, response: Response) {
  const data: TodoRequest = request.body;
  const todoItem = await todoService.createTodoItem(data);

  return response.json(todoItem);
}

export async function getAllTodoItems(request: Request, response: Response) {
  const filters: TodoFilters = request.query;
  const todoItems = await todoService.getAllTodoItems(filters);

  return response.json(todoItems);
}
