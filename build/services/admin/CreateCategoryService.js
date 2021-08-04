"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Publication_1 = __importDefault(require("../../models/Publication"));
const Category_1 = __importDefault(require("../../models/Category"));
const typeorm_1 = require("typeorm");
class CreateCategoryService {
    async execute({ categories, publication_id }) {
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        categories.forEach(async (category_name) => {
            category_name.toLowerCase();
            category_name = category_name[0].toUpperCase() + category_name.substr(1);
            const categoryAlreadyCreated = await categoriesRepository.findOne({
                where: { category_name }
            });
            if (!categoryAlreadyCreated) {
                const createdCategory = categoriesRepository.create({
                    category_name,
                });
                await categoriesRepository.save(createdCategory);
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .relation(Publication_1.default, "categories")
                    .of(publication_id)
                    .add(createdCategory);
            }
            else {
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .relation(Publication_1.default, "categories")
                    .of(publication_id)
                    .add(categoryAlreadyCreated);
            }
        });
        return categories;
    }
}
exports.default = CreateCategoryService;
