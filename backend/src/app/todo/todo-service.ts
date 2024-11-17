import { TodoFilters, TodoRequest } from '@/app/todo/schemas/todo-schema';
import { Todo } from '@/app/todo/entities/todo';
import { getDB } from '@/db';
import { ListResult } from '@/common/types/data-results';

export async function createTodoItem(data: TodoRequest): Promise<Todo> {
  const { em, todoRepo } = await getDB();

  const todoItem = todoRepo.create(data);
  await em.flush();

  return todoItem;
}

export async function getAllTodoItems({ isDone }: TodoFilters): Promise<ListResult<Todo>> {
  const { todoRepo } = await getDB();

  const filters = isDone ? { isDone: true } : { dateTime: { $gt: new Date() } };

  const todoItemsPromise = todoRepo.findAll({
    where: filters,
    orderBy: { dateTime: isDone ? 'desc' : 'asc' },
  });
  const totalCountPromise = todoRepo.count(filters);

  const [todoItems, totalCount] = await Promise.all([todoItemsPromise, totalCountPromise]);

  return { data: todoItems, meta: { totalCount, currentPageCount: todoItems.length } };
}

export async function deleteTodoItem(id: string): Promise<void> {
  const { todoRepo } = await getDB();

  await todoRepo.nativeDelete({ id });
}
