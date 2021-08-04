"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Publication_1 = __importDefault(require("../../models/Publication"));
const Category_1 = __importDefault(require("../../models/Category"));
const typeorm_1 = require("typeorm");
class UpdateCategoryService {
    async execute({ categories, publication_id }) {
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const publication = await publicationsRepository.findOne({
            where: {
                id: publication_id
            }
        });
        let filteredCategories = categories;
        categories.forEach((category_name) => {
            let equalCategory = '';
            publication.categories.forEach(category => {
                if (category.category_name == category_name) {
                    equalCategory = category.category_name;
                }
            });
            filteredCategories = filteredCategories.filter(cat => cat !== equalCategory);
        });
        //Adiciona o que tem no array que não tem na publicação
        filteredCategories.forEach(async (category_name) => {
            category_name.toLowerCase();
            category_name = category_name[0].toUpperCase() + category_name.substr(1);
            const categoryAlreadyCreated = await categoriesRepository.findOne({
                where: { category_name }
            });
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(Publication_1.default, "categories")
                .of(publication_id)
                .add(categoryAlreadyCreated);
        });
        let removeCategories = publication.categories.map(category => category.category_name);
        publication.categories.forEach((category) => {
            let equalCategory = '';
            categories.forEach(category_name => {
                if (category_name == category.category_name) {
                    equalCategory = category.category_name;
                }
            });
            removeCategories = removeCategories.filter(cat => cat !== equalCategory);
        });
        //Remove o que tem na publicação mas não tem no array de edição
        removeCategories.forEach(async (category_name) => {
            const categoryAlreadyCreated = await categoriesRepository.findOne({
                where: { category_name }
            });
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(Publication_1.default, "categories")
                .of(publication_id)
                .remove(categoryAlreadyCreated);
        });
        return categories;
    }
}
exports.default = UpdateCategoryService;
