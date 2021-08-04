"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddAvatarFieldToUsers1611100666399 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
exports.default = AddAvatarFieldToUsers1611100666399;
