"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationPublicationCategory1617738005914 = void 0;
class RelationPublicationCategory1617738005914 {
    constructor() {
        this.name = 'RelationPublicationCategory1617738005914';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "publications_categories" ("publicationsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_23933546760eccc50c4d1a3ee6a" PRIMARY KEY ("publicationsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_764fa35476bf9eb7326e364167" ON "publications_categories" ("publicationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33c6624bf9a7e442c760e07b96" ON "publications_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "publications_categories" ADD CONSTRAINT "FK_764fa35476bf9eb7326e364167e" FOREIGN KEY ("publicationsId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications_categories" ADD CONSTRAINT "FK_33c6624bf9a7e442c760e07b962" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "publications_categories" DROP CONSTRAINT "FK_33c6624bf9a7e442c760e07b962"`);
        await queryRunner.query(`ALTER TABLE "publications_categories" DROP CONSTRAINT "FK_764fa35476bf9eb7326e364167e"`);
        await queryRunner.query(`DROP INDEX "IDX_33c6624bf9a7e442c760e07b96"`);
        await queryRunner.query(`DROP INDEX "IDX_764fa35476bf9eb7326e364167"`);
        await queryRunner.query(`DROP TABLE "publications_categories"`);
    }
}
exports.RelationPublicationCategory1617738005914 = RelationPublicationCategory1617738005914;
