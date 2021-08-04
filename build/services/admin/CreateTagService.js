"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = __importDefault(require("../../models/Tag"));
const typeorm_1 = require("typeorm");
class CreateTagService {
    async execute({ tags, publication_id }) {
        const tagsRepository = typeorm_1.getRepository(Tag_1.default);
        tags.forEach(async (tag_name) => {
            const createdTag = tagsRepository.create({
                tag_name,
                publication_id
            });
            await tagsRepository.save(createdTag);
        });
        return tags;
    }
}
exports.default = CreateTagService;
