import { MikroORM } from '@mikro-orm/core';
import config from '@/configs/mikro-orm-config';
import { EntityManager } from '@mikro-orm/mysql';
import { TodoRepository } from '@/app/todo/todo-repository';
import { Todo } from '@/app/todo/entities/todo';

export interface DB {
  orm: MikroORM;
  em: EntityManager;
  todoRepo: TodoRepository;
}

let cache: DB;

export async function getDB(): Promise<DB> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(config);

  cache = {
    orm,
    em: orm.em,
    todoRepo: orm.em.getRepository(Todo),
  };
  return cache;
}
