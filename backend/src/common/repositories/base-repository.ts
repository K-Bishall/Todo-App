import { EntityRepository, FilterQuery, FindOneOptions } from '@mikro-orm/mysql';
import { BaseEntity } from '@/common/entities/base-entity';
import { NotFoundError } from '@/common/exceptions';

interface ExistsOptions<T extends object> {
  where: FilterQuery<T>;
  options?: Pick<FindOneOptions<T>, 'lockMode'>;
}

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
  findByIdOrThrow(id: string): Promise<T> {
    return this.em.findOneOrFail(this.entityName, { id } as FilterQuery<T>, {
      failHandler: (entityName) => {
        throw new NotFoundError(`${entityName} with id ${id} not found`);
      },
    });
  }

  async exists({ where, options }: ExistsOptions<T>): Promise<boolean> {
    const result = await this.findOne(where!, { fields: ['id' as any], ...options });

    return !!result;
  }
}
