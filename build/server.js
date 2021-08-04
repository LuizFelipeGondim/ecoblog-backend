"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const bodyParser = require('body-parser');
const upload_1 = __importDefault(require("./config/upload"));
require("./database");
const app = express_1.default();
app.use(cors_1.default());
/* Aqui */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.listen(process.env.PORT || 3333, () => {
    console.log('O servidor está funcionando!');
});
