"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
async function verifyAdminStatus(request, response, next) {
    try {
        const id = request.user.id;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({
            where: { id }
        });
        if (!user.is_staff) {
            throw new Error('You are not allowed to access this page.');
        }
        return next();
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
}
exports.default = verifyAdminStatus;
