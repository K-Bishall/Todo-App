import { Migration } from '@mikro-orm/migrations';

export class Migration20241117082922_create_todo extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`todos\` (\`id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`title\` varchar(255) not null, \`description\` varchar(255) not null, \`date_time\` datetime not null, \`is_done\` tinyint(1) not null default false, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`todos\`;`);
  }
}
