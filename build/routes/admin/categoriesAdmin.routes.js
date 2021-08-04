"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
const verifyAdminStatus_1 = __importDefault(require("../../middlewares/verifyAdminStatus"));
const Category_1 = __importDefault(require("../../models/Category"));
const CategoriesRouter = express_1.Router();
CategoriesRouter.get('/', async (request, response) => {
    try {
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        const categories = await categoriesRepository.find();
        return response.json(categories);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
CategoriesRouter.get('/pagination', async (request, response) => {
    try {
        const page = request.query.page;
        const limit = request.query.limit;
        const name = request.query.name || null;
        const skip = page * limit;
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        const categories = name ?
            await categoriesRepository.find({
                relations: ["publications"],
                skip,
                take: limit,
                where: {
                    category_name: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await categoriesRepository.find({
                    skip,
                    take: limit,
                });
        const categoriesLength = name ?
            await categoriesRepository.count({
                where: {
                    category_name: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await categoriesRepository.count();
        const totalCategories = await categoriesRepository.count();
        return response.json({
            categories,
            totalCategories,
            categoriesLength
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
CategoriesRouter.post('/create', ensureAuthenticated_1.default, verifyAdminStatus_1.default, async (request, response) => {
    try {
        const { category_name } = request.body;
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        const category = categoriesRepository.create({
            category_name,
        });
        await categoriesRepository.save(category);
        return response.json(category);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
CategoriesRouter.delete('/delete/:id', ensureAuthenticated_1.default, verifyAdminStatus_1.default, async (request, response) => {
    const { id } = request.params;
    console.log(id);
    try {
        const categoriesRepository = typeorm_1.getRepository(Category_1.default);
        categoriesRepository.delete({
            id
        });
    }
    catch (err) {
        return response.status(400).json({ err: err.message });
    }
});
exports.default = CategoriesRouter;
