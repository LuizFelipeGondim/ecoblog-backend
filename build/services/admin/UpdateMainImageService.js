"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_1 = __importDefault(require("../../config/upload"));
const Publication_1 = __importDefault(require("../../models/Publication"));
class UpdateMainImageService {
    async execute({ publication_id, imageFilename }) {
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const publication = await publicationsRepository.findOne(publication_id);
        if (!publication) {
            throw new Error("publication don't exists.");
        }
        if (publication.main_image) {
            // Deletar imagem anterior
            const [, filename] = publication.main_image.split('/files/');
            const publicationImageFilePath = path_1.default.join(upload_1.default.directory, filename);
            const publicationImageFileExists = await fs_1.default.promises.stat(publicationImageFilePath);
            if (publicationImageFileExists) {
                await fs_1.default.promises.unlink(publicationImageFilePath);
            }
        }
        publication.main_image = `https://ecoblog-backend.herokuapp.com/files/${imageFilename}`;
        await publicationsRepository.save(publication);
        return publication;
    }
}
exports.default = UpdateMainImageService;
