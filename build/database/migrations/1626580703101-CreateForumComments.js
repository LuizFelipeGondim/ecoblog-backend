"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateForumComments1626580703101 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'forum_comments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
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
                    name: 'forum_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }));
        await queryRunner.createForeignKey('forum_comments', new typeorm_1.TableForeignKey({
            name: 'CommentUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('forum_comments', new typeorm_1.TableForeignKey({
            name: 'ForumId',
            columnNames: ['forum_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'forum',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('forum_comments', 'ForumId');
        await queryRunner.dropForeignKey('forum_comments', 'CommentUser');
        await queryRunner.dropTable('forum_comments');
    }
}
exports.default = CreateForumComments1626580703101;
