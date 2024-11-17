import 'reflect-metadata';
import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from '@/constants/app-settings';
import { BaseRepository } from '@/common/repositories/base-repository';

const isDev = process.env.NODE_ENV === 'development';

const config: Options<MySqlDriver> = {
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  driver: MySqlDriver,
  host: MYSQL_HOST,
  dbName: MYSQL_DB,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  driverOptions: isDev
    ? undefined
    : {
      connection: { ssl: { rejectUnauthorized: false } },
    },
  loadStrategy: 'joined',
  entities: ['dist/**/entities/*'],
  entitiesTs: ['src/**/entities/*'],
  entityRepository: BaseRepository,

  extensions: [Migrator],
  migrations: {
    disableForeignKeys: false,
    transactional: true,
    allOrNothing: true,
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshotName: 'migrations-snapshot',
    fileName: (timestamp: string, name?: string) => {
      // force user to provide the name, otherwise you would end up with `Migration20230421212713_undefined`
      if (!name) {
        throw new Error('Specify migration name via `migration:create --name=...`');
      }

      // Check if the name contains only letters, and underscores
      const isValidName = /^[a-zA-Z_]+$/.test(name);
      if (!isValidName) {
        throw new Error('Migration name can only contain letters, and underscores.');
      }

      return `Migration${timestamp}_${name}`;
    },
  },
};

export default config;
