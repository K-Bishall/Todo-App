import { MikroORM } from '@mikro-orm/core';
import config from '@/configs/mikro-orm-config';
import { EntityManager } from '@mikro-orm/mysql';

export interface DB {
  orm: MikroORM;
  em: EntityManager;
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
  };
  return cache;
}

export type {
  RequiredEntityData,
  LockMode,
} from '@mikro-orm/core';
export { UniqueConstraintViolationException } from '@mikro-orm/core';
