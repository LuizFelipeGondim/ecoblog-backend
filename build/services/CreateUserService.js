"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ first_name, last_name, email, password, city, uf, whatsapp, is_staff, avatar }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const checkUserExists = await usersRepository.findOne({
            where: { email }
        });
        if (checkUserExists) {
            throw new Error('Email address already used.');
        }
        const hashedPassword = await bcryptjs_1.hash(password, 8);
        const user = usersRepository.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            city,
            uf,
            whatsapp,
            is_staff,
            avatar
        });
        await usersRepository.save(user);
        return user;
    }
}
exports.default = CreateUserService;
