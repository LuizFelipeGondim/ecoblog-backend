"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateUserService_1 = __importDefault(require("../services/AuthenticateUserService"));
const SessionsRouter = express_1.Router();
SessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService_1.default();
        const { user, token } = await authenticateUser.execute({
            email,
            password
        });
        delete user.password;
        return response.json({ user, token });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = SessionsRouter;
