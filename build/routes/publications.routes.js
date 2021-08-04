"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Publication_1 = __importDefault(require("../models/Publication"));
const Tag_1 = __importDefault(require("../models/Tag"));
const User_1 = __importDefault(require("../models/User"));
const PublicationsRouter = express_1.Router();
PublicationsRouter.get('/:slug', async (request, response) => {
    try {
        const { slug } = request.params;
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const tagsRepository = typeorm_1.getRepository(Tag_1.default);
        const publications = await publicationsRepository.findOne({
            where: {
                slug
            }
        });
        const tags = await tagsRepository.find({
            where: {
                publication_id: publications.id
            }
        });
        const user = await usersRepository.findOne({
            where: {
                id: publications.user_id
            }
        });
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return response.json({
            publications,
            user,
            tags,
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = PublicationsRouter;
