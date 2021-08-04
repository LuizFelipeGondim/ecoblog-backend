"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
usersRouter.post('/', async (request, response) => {
    try {
        const { first_name, last_name, email, password, city, uf, whatsapp } = request.body;
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
            avatar
        });
        delete user.password;
        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = usersRouter;
