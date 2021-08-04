"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const rootDir = process.env.NODE_ENV === "development" ?
    "src" :
    "build";
const extensionFile = process.env.NODE_ENV === "development" ?
    "ts" :
    "js";
const config = {
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    sincronize: process.env.TYPEORM_SYNCHRONIZE,
    extra: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    entities: [
        rootDir + `/models/*.${extensionFile}`
    ],
    migrations: [
        rootDir + `/database/migrations/*.${extensionFile}`
    ],
    cli: {
        migrationsDir: rootDir + "/database/migrations"
    }
};
typeorm_1.createConnection(config);
