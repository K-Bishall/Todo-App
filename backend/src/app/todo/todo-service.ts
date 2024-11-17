import { TodoRequest } from '@/app/todo/schemas/todo-schema';
import { Todo } from '@/app/todo/entities/todo';
import { getDB } from '@/db';

export async function createTodoItem(data: TodoRequest): Promise<Todo> {
  const { em, todoRepo } = await getDB();

  const todoItem = todoRepo.create(data);
  await em.flush();

  return todoItem;
}
