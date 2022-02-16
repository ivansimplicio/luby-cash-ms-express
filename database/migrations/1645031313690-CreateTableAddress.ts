import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAddress1645031313690 implements MigrationInterface {
  tableName = 'address';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'address',
            type: 'varchar(100)',
          },
          {
            name: 'city',
            type: 'varchar(30)',
          },
          {
            name: 'state',
            type: 'varchar(30)',
          },
          {
            name: 'zipcode',
            type: 'varchar(10)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
