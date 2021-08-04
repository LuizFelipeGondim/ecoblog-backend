"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const api = require('request');
const auth_1 = __importDefault(require("../config/auth"));
const User_1 = __importDefault(require("../models/User"));
const WeatherRouter = express_1.Router();
WeatherRouter.get('/:city', async (request, response) => {
    let route = "";
    const authHeader = request.headers.authorization;
    if (request.params.city !== "-") {
        const { city } = request.params;
        route = `https://api.hgbrasil.com/weather?array_limit=7&fields=only_results,temp,city_name,time,description,currently,humidity,wind_speedy,sunrise,sunset,forecast,date,min,max,weekday,description&city_name=${city}&key=3512d740`;
    }
    else if (authHeader) {
        const [, token] = authHeader.split(' ');
        const decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        request.user = {
            id: sub
        };
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({
            id: request.user.id,
        });
        const city = user.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        route = `https://api.hgbrasil.com/weather?array_limit=7&fields=only_results,temp,city_name,time,description,currently,humidity,wind_speedy,sunrise,sunset,forecast,date,min,max,weekday,description&city_name=${city}&key=3512d740`;
    }
    else if (request.params.city == "-") {
        route = `https://api.hgbrasil.com/weather?array_limit=7&fields=only_results,temp,city_name,time,description,currently,humidity,wind_speedy,sunrise,sunset,forecast,date,min,max,weekday,description&key=3512d740`;
    }
    try {
        api(`${route}`, (err, res, body) => {
            const data = JSON.parse(body);
            return response.json(data);
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = WeatherRouter;
