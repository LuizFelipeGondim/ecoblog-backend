"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
const upload_1 = __importDefault(require("../../config/upload"));
const ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
const User_1 = __importDefault(require("../../models/User"));
const CreateUserService_1 = __importDefault(require("../../services/CreateUserService"));
const UpdateUserAvatarService_1 = __importDefault(require("../../services/UpdateUserAvatarService"));
const UsersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
UsersRouter.post('/', async (request, response) => {
    try {
        const { first_name, last_name, email, password, city, uf, whatsapp, is_staff } = request.body;
        const avatar = 'http://localhost:3333/files/unknown.png';
        const createUser = new CreateUserService_1.default();
        const user = await createUser.execute({
            first_name,
            last_name,
            email,
            password,
            city,
            uf,
            whatsapp,
            is_staff,
            avatar
        });
        delete user.password;
        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
UsersRouter.post('/edit', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const id = request.user.id;
        const { first_name, last_name, city, uf, whatsapp } = request.body;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne(id);
        user.first_name = first_name;
        user.last_name = last_name;
        user.city = city;
        user.uf = uf;
        user.whatsapp = whatsapp;
        await usersRepository.save(user);
        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
UsersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), async (request, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService_1.default();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });
        return response.json(user.avatar);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
UsersRouter.get('/profile', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({
            id: request.user.id,
        });
        delete user.password;
        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
UsersRouter.get('/', ensureAuthenticated_1.default, async (request, response) => {
    try {
        const page = request.query.page;
        const limit = request.query.limit;
        const name = request.query.name || null;
        const skip = page * limit;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const users = name ?
            await usersRepository.find({
                skip,
                take: limit,
                order: {
                    created_at: "DESC",
                },
                where: {
                    first_name: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await usersRepository.find({
                    skip,
                    take: limit,
                    order: {
                        created_at: "DESC",
                    }
                });
        const usersLength = name ?
            await usersRepository.count({
                where: {
                    first_name: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await usersRepository.count();
        const totalUsers = await usersRepository.count();
        return response.json({
            users,
            totalUsers,
            usersLength
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = UsersRouter;
