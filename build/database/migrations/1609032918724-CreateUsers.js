"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateUsers1609032918724 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'uf',
                    type: 'varchar',
                },
                {
                    name: 'whatsapp',
                    type: 'varchar',
                },
                {
                    name: 'is_staff',
                    type: 'boolean',
                    default: false,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.default = CreateUsers1609032918724;
