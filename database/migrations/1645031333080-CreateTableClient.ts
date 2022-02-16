import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTableClient1645031333080 implements MigrationInterface {
  tableName = 'clients';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'full_name',
            type: 'varchar(100)',
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(150)',
          },
          {
            name: 'phone',
            type: 'varchar(20)',
          },
          {
            name: 'cpf_number',
            type: 'varchar(14)',
            isUnique: true,
          },
          {
            name: 'average_salary',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'address_id',
        type: 'int',
      })
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
