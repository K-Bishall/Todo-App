import {
  EntityRepository,
  Field,
  FilterQuery,
  FindOneOptions,
} from '@mikro-orm/mysql';
import { BaseEntity } from '@/common/entities/base-entity';
import { NotFoundError } from '@/common/exceptions';
import { raw } from '@mikro-orm/core';

export type CountResult<T> = T & {
  count: number;
};

export type AggregationResult<T> = T & {
  [key: string]: string;
};

interface ExistsOptions<T extends object> {
  where: FilterQuery<T>;
  options?: Pick<FindOneOptions<T>, 'lockMode'>;
}

interface GroupByAndCountOptions<T> {
  where: FilterQuery<T>;
  groupBy: Field<T>[];
}

interface CountDistinctOptions<T> {
  fields: Field<T>[];
  where?: FilterQuery<T>;
}

interface AggregateOptions<T> {
  aggregation: {
    [key: string]: string;
  };
  where: FilterQuery<T>;
  groupBy?: Field<T>[];
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

  async groupByAndCount({ where, groupBy }: GroupByAndCountOptions<T>): Promise<CountResult<T>[]> {
    const result = await this.qb()
      .select([...groupBy, raw('count(*)')])
      .where(where)
      .groupBy(groupBy as string[])
      .execute<CountResult<T>[]>();

    return result.map((it) => ({ ...it, count: +it.count }));
  }

  async countDistinct({ fields, where }: CountDistinctOptions<T>): Promise<number> {
    let query = this.qb();

    if (where) {
      query = query.where(where);
    }

    return query.count(fields as string[], true);
  }

  async aggregate({
                    aggregation,
                    where,
                    groupBy,
                  }: AggregateOptions<T>): Promise<AggregationResult<T>[]> {
    const aggregationFragments = Object.entries(aggregation).map(([key, aggregation]) =>
      raw(`${aggregation} as ${key}`),
    );

    let query = this.qb()
      .select([...(groupBy ?? []), ...aggregationFragments])
      .where(where);

    if (groupBy) {
      query = query.groupBy(groupBy as string[]);
    }

    return query.execute<AggregationResult<T>[]>();
  }
}
