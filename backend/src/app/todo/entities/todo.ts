import type { Opt } from '@mikro-orm/core';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '@/common/entities/base-entity';
import { TodoRepository } from '@/app/todo/todo-repository';

@Entity({ tableName: 'todos', repository: () => TodoRepository })
export class Todo extends BaseEntity {
  [EntityRepositoryType]?: TodoRepository;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  dateTime!: Date;

  @Property()
  isDone: Opt<boolean> = false;
}
