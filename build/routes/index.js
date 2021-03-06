"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const weather_routes_1 = __importDefault(require("./weather.routes"));
const home_routes_1 = __importDefault(require("./home.routes"));
const publications_routes_1 = __importDefault(require("./publications.routes"));
const forum_routes_1 = __importDefault(require("./forum.routes"));
const admin_1 = __importDefault(require("./admin"));
const routes = express_1.Router();
routes.use('/eco-admin', admin_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/weather', weather_routes_1.default);
routes.use('/', home_routes_1.default);
routes.use('/publications', publications_routes_1.default);
routes.use('/forum', forum_routes_1.default);
exports.default = routes;
