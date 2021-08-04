"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const crypto_1 = __importDefault(require("crypto"));
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const Forum_1 = __importDefault(require("../models/Forum"));
const CreateTagForumService_1 = __importDefault(require("../services/CreateTagForumService"));
const ForumComment_1 = __importDefault(require("../models/ForumComment"));
const ForumRouter = express_1.Router();
ForumRouter.post('/create', ensureAuthenticated_1.default, async (request, response) => {
    try {
        let { title, content, tags } = request.body;
        const slugHash = crypto_1.default.randomBytes(5).toString('hex');
        const slug = `${slugHash}-${title.toLowerCase().replace(/\s+/g, "-").replace(/\?+/g, "")}`;
        content = content.replace(/class/g, "className")
            .replace(/oembed/g, "embed")
            .replace(/url/g, "src");
        const user_id = request.user.id;
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        const createTag = new CreateTagForumService_1.default();
        const forum = forumRepository.create({
            user_id,
            title,
            content,
            slug
        });
        await forumRepository.save(forum);
        const forum_id = forum.id;
        const createdTags = await createTag.execute({
            tags,
            forum_id
        });
        return response.json({
            "forum": forum,
            "tags": createdTags,
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.get('/', async (request, response) => {
    try {
        const page = request.query.page;
        const limit = request.query.limit;
        const name = request.query.name || null;
        const skip = page * limit;
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        const forums = name ?
            await forumRepository.find({
                skip,
                take: limit,
                relations: ["author"],
                order: {
                    updated_at: "DESC",
                },
                where: {
                    title: typeorm_1.Like(`%${name}%`),
                },
            })
            :
                await forumRepository.find({
                    skip,
                    take: limit,
                    relations: ["author"],
                    order: {
                        updated_at: "DESC",
                    },
                });
        forums.forEach(forum => {
            delete forum.author.password;
            delete forum.author.email;
            delete forum.author.city;
            delete forum.author.uf;
            delete forum.author.created_at;
            delete forum.author.updated_at;
            delete forum.author.whatsapp;
            delete forum.author.is_staff;
        });
        const forumLength = name ?
            await forumRepository.count({
                where: {
                    title: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await forumRepository.count();
        const totalForum = await forumRepository.count();
        return response.json({
            forums,
            totalForum,
            forumLength
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.get('/:slug', async (request, response) => {
    try {
        const { slug } = request.params;
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        const forum = await forumRepository.findOne({
            relations: ['author', 'tags'],
            where: {
                slug
            }
        });
        console.log(slug);
        console.log(forum);
        delete forum.author.password;
        delete forum.author.email;
        delete forum.author.city;
        delete forum.author.uf;
        delete forum.author.created_at;
        delete forum.author.updated_at;
        delete forum.author.whatsapp;
        delete forum.author.is_staff;
        return response.json(forum);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.get('/comments/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const commentRepository = typeorm_1.getRepository(ForumComment_1.default);
        const comments = await commentRepository.find({
            relations: ['user'],
            where: {
                forum_id: id
            }
        });
        comments.forEach(comment => {
            delete comment.user.password;
            delete comment.user.email;
            delete comment.user.city;
            delete comment.user.uf;
            delete comment.user.created_at;
            delete comment.user.updated_at;
            delete comment.user.whatsapp;
            delete comment.user.is_staff;
        });
        return response.json(comments);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.post('/comments/create', ensureAuthenticated_1.default, async (request, response) => {
    try {
        let { forum_id, content } = request.body;
        const user_id = request.user.id;
        const commentRepository = typeorm_1.getRepository(ForumComment_1.default);
        content = content.replace(/class/g, "className")
            .replace(/oembed/g, "embed")
            .replace(/url/g, "src");
        const comment = commentRepository.create({
            forum_id,
            user_id,
            content,
        });
        await commentRepository.save(comment);
        return response.json(comment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.get('/to-close/:slug', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const { slug } = request.params;
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        const forum = await forumRepository.findOne({
            where: {
                slug,
            },
        });
        forum.resolved = true;
        await forumRepository.save(forum);
        return response.json(forum);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.delete('/comments/delete/:id', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const { id } = request.params;
        const commentsRepository = typeorm_1.getRepository(ForumComment_1.default);
        await commentsRepository.delete({ id });
    }
    catch (err) {
        return response.status(400).json({ err: err.message });
    }
});
ForumRouter.get('/profile/doubts', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        const forum = await forumRepository.find({
            select: ["title", "resolved", "created_at", "id"],
            order: {
                updated_at: "DESC",
            },
            where: {
                user_id: request.user.id
            }
        });
        return response.json(forum);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
ForumRouter.delete('/delete/doubts/:id', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const { id } = request.params;
        const forumRepository = typeorm_1.getRepository(Forum_1.default);
        await forumRepository.delete({ id });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = ForumRouter;
