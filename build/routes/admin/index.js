"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicationsAdmin_routes_1 = __importDefault(require("./publicationsAdmin.routes"));
const categoriesAdmin_routes_1 = __importDefault(require("./categoriesAdmin.routes"));
const usersAdmin_routes_1 = __importDefault(require("./usersAdmin.routes"));
const adminRouter = express_1.Router();
adminRouter.use('/publications', publicationsAdmin_routes_1.default);
adminRouter.use('/categories', categoriesAdmin_routes_1.default);
adminRouter.use('/users', usersAdmin_routes_1.default);
exports.default = adminRouter;
