"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateTags1612148618171 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tags',
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
                    name: 'publication_id',
                    type: 'uuid',
                    isNullable: true
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('tags');
    }
}
exports.default = CreateTags1612148618171;
