"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const User_1 = __importDefault(require("../models/User"));
class AuthenticateUserService {
    async execute({ email, password }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }
        const passwordMatched = await bcryptjs_1.compare(password, user.password);
        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }
        const { secret } = auth_1.default.jwt;
        const token = jsonwebtoken_1.sign({}, secret, {
            subject: user.id,
        });
        return {
            user,
            token,
        };
    }
}
exports.default = AuthenticateUserService;
