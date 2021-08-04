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
        const publicationsTags = await tagsRepository.find({
            where: {
                publication_id
            }
        });
        let filteredTags = tags;
        tags.forEach((tag_name) => {
            let equalCategory = '';
            publicationsTags.forEach(tag => {
                if (tag.tag_name === tag_name) {
                    equalCategory = tag.tag_name;
                }
            });
            filteredTags = filteredTags.filter(tag => tag !== equalCategory);
        });
        filteredTags.forEach(async (tag_name) => {
            const createdTag = tagsRepository.create({
                tag_name,
                publication_id
            });
            await tagsRepository.save(createdTag);
        });
        let removeTags = publicationsTags.map(tag => tag.tag_name);
        publicationsTags.forEach((tag) => {
            let equalCategory = '';
            tags.forEach(tag_name => {
                if (tag_name === tag.tag_name) {
                    equalCategory = tag.tag_name;
                }
            });
            removeTags = removeTags.filter(tag => tag !== equalCategory);
        });
        removeTags.forEach(async (tag_name) => {
            const tagRemoved = await tagsRepository.findOne({
                where: {
                    tag_name
                }
            });
            await tagsRepository.delete({
                id: tagRemoved.id
            });
        });
        return tags;
    }
}
exports.default = CreateTagService;
