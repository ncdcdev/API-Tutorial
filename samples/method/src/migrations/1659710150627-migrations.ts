import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1659710150627 implements MigrationInterface {
  name = 'migrations1659710150627'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`content\``)
  }
}
