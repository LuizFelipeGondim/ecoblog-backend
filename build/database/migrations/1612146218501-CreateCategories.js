"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateCategories1612146218501 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'categories',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'category_name',
                    type: 'varchar'
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('categories');
    }
}
exports.default = CreateCategories1612146218501;
