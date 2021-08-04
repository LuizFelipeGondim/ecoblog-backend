"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateTagForum1626121077893 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tags_forum',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'tag_name',
                    type: 'varchar'
                },
                {
                    name: 'forum_id',
                    type: 'uuid',
                    isNullable: true
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('tags_forum');
    }
}
exports.default = CreateTagForum1626121077893;
