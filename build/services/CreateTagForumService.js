"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TagForum_1 = __importDefault(require("../models/TagForum"));
const typeorm_1 = require("typeorm");
class CreateTagForumService {
    async execute({ tags, forum_id }) {
        const tagsRepository = typeorm_1.getRepository(TagForum_1.default);
        tags.forEach(async (tag_name) => {
            const createdTag = tagsRepository.create({
                tag_name,
                forum_id
            });
            await tagsRepository.save(createdTag);
        });
        return tags;
    }
}
exports.default = CreateTagForumService;
