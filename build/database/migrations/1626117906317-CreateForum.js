"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateForum1626117906317 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'forum',
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
                    name: 'content',
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
                    name: 'resolved',
                    type: 'boolean',
                    default: false
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
        await queryRunner.createForeignKey('forum', new typeorm_1.TableForeignKey({
            name: 'ForumAuthor',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('forum', 'ForumAuthor');
        await queryRunner.dropTable('forum');
    }
}
exports.default = CreateForum1626117906317;
