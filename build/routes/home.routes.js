"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Publication_1 = __importDefault(require("../models/Publication"));
const HomeRouter = express_1.Router();
HomeRouter.get('/', async (request, response) => {
    try {
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const latest_publications = await publicationsRepository.find({
            take: 10,
            relations: ['categories'],
            select: ["main_image", "id", "title", "subtitle", "created_at", "slug"],
            order: {
                created_at: "DESC",
            }
        });
        const first_publications = await publicationsRepository.find({
            take: 10,
            relations: ['categories'],
            select: ["main_image", "id", "title", "subtitle", "created_at", "slug"],
            order: {
                created_at: "ASC",
            }
        });
        const most_viewed = await publicationsRepository.find({
            take: 4,
            relations: ['categories'],
            select: ["main_image", "id", "title", "subtitle", "created_at", "slug"],
            order: {
                created_at: "ASC",
            }
        });
        return response.json({
            latest_publications,
            first_publications,
            most_viewed
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = HomeRouter;
