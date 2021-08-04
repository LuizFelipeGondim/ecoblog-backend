"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateNews1611799700397 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'publications',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'subtitle',
                    type: 'varchar'
                },
                {
                    name: 'content',
                    type: 'varchar'
                },
                {
                    name: 'main_image',
                    type: 'varchar'
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'slug',
                    type: 'varchar',
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
            ]
        }));
        await queryRunner.createForeignKey('publications', new typeorm_1.TableForeignKey({
            name: 'PublicationAuthor',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('publications', 'PublicationAuthor');
        await queryRunner.dropTable('publications');
    }
}
exports.default = CreateNews1611799700397;
