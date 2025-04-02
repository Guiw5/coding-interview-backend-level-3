import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemTable1709876543210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "price" integer NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
    }
} 