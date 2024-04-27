import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1714123889384 implements MigrationInterface {
    name = 'Auto1714123889384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "document" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "date_create" TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "id_document" INTEGER,
            "name" TEXT
        )
    `);
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "product" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "code" TEXT NOT NULL,
            "name" TEXT,
            "date_create" TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "id_document" INTEGER,
            FOREIGN KEY("id_document")
            REFERENCES "document"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        )
    `);
    //     await queryRunner.query(`
    //     CREATE TABLE IF NOT EXISTS "product_operations" (
    //         "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    //         "count" INTEGER NOT NULL,
    //         "fact" INTEGER NOT NULL,
    //         "id_product" INTEGER,
    //         "id_document" INTEGER
    //     )
    // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_operations"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
