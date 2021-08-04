"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_1 = __importDefault(require("../../config/upload"));
const Publication_1 = __importDefault(require("../../models/Publication"));
const ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
const verifyAdminStatus_1 = __importDefault(require("../../middlewares/verifyAdminStatus"));
const CreateTagService_1 = __importDefault(require("../../services/admin/CreateTagService"));
const CreateCategoryService_1 = __importDefault(require("../../services/admin/CreateCategoryService"));
const User_1 = __importDefault(require("../../models/User"));
const UpdateCategoryService_1 = __importDefault(require("../../services/admin/UpdateCategoryService"));
const UpdateTagService_1 = __importDefault(require("../../services/admin/UpdateTagService"));
const UpdateMainImageService_1 = __importDefault(require("../../services/admin/UpdateMainImageService"));
const PublicationsRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
PublicationsRouter.post('/create', ensureAuthenticated_1.default, verifyAdminStatus_1.default, upload.single('main_image'), async (request, response) => {
    try {
        let { title, subtitle, content } = request.body;
        const slugHash = crypto_1.default.randomBytes(5).toString('hex');
        const slug = `${slugHash}-${title.toLowerCase().replace(/\s+/g, "-")}`;
        content = content.replace(/class/g, "className")
            .replace(/oembed/g, "embed")
            .replace(/url/g, "src");
        const tags = request.body.tags.split(',');
        let categories = request.body.categories.split(',');
        const user_id = request.user.id;
        const main_image = request.file.filename;
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const createTag = new CreateTagService_1.default();
        const createCategory = new CreateCategoryService_1.default();
        const publication = publicationsRepository.create({
            user_id,
            title,
            subtitle,
            content,
            slug,
            main_image: `http://localhost:3333/files/${main_image}`
        });
        await publicationsRepository.save(publication);
        const publication_id = publication.id;
        const createdCategories = await createCategory.execute({
            categories,
            publication_id
        });
        const createdTags = await createTag.execute({
            tags,
            publication_id
        });
        return response.json({
            "publication": publication,
            "tags": createdTags,
            "categories": createdCategories
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
PublicationsRouter.post('/edit/:id', ensureAuthenticated_1.default, verifyAdminStatus_1.default, async (request, response) => {
    try {
        const { id } = request.params;
        const { title, subtitle, tags, categories } = request.body;
        let { content } = request.body;
        const slugHash = crypto_1.default.randomBytes(5).toString('hex');
        const slug = `${slugHash}-${title.toLowerCase().replace(/\s+/g, "-")}`;
        content = content.replace(/class/g, "className")
            .replace(/oembed/g, "embed")
            .replace(/url/g, "src");
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const updatedTag = new UpdateTagService_1.default();
        const updatedCategory = new UpdateCategoryService_1.default();
        const publication = await publicationsRepository.findOne(id);
        publication.title = title;
        publication.subtitle = subtitle;
        publication.content = content;
        publication.slug = slug;
        await publicationsRepository.save(publication);
        const publication_id = publication.id;
        const updatedCategories = await updatedCategory.execute({
            categories,
            publication_id
        });
        const updatedTags = await updatedTag.execute({
            tags,
            publication_id
        });
        return response.json({
            "publication": publication,
            "tags": updatedTags,
            "categories": updatedCategories
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
PublicationsRouter.patch('/main-image/:id', ensureAuthenticated_1.default, verifyAdminStatus_1.default, upload.single('main_image'), async (request, response) => {
    try {
        const { id } = request.params;
        const updateMainImage = new UpdateMainImageService_1.default();
        const publication = await updateMainImage.execute({
            publication_id: id,
            imageFilename: request.file.filename
        });
        return response.json(publication);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
PublicationsRouter.get('/latest-publications', async (request, response) => {
    const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
    const publications = await publicationsRepository.find({
        take: 3,
        order: {
            created_at: "DESC",
        }
    });
    return response.json(publications);
});
PublicationsRouter.get('/', async (request, response) => {
    try {
        const page = request.query.page;
        const limit = request.query.limit;
        const name = request.query.name || null;
        const skip = page * limit;
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const publications = name ?
            await publicationsRepository.find({
                skip,
                take: limit,
                order: {
                    updated_at: "DESC",
                },
                where: {
                    title: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await publicationsRepository.find({
                    skip,
                    take: limit,
                    order: {
                        updated_at: "DESC",
                    }
                });
        const publicationsLength = name ?
            await publicationsRepository.count({
                where: {
                    title: typeorm_1.Like(`%${name}%`)
                }
            })
            :
                await publicationsRepository.count();
        const totalPublications = await publicationsRepository.count();
        const users = await usersRepository.find({
            where: {
                is_staff: true
            }
        });
        return response.json({
            publications,
            totalPublications,
            users,
            publicationsLength
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
PublicationsRouter.delete('/delete/:id', ensureAuthenticated_1.default, verifyAdminStatus_1.default, async (request, response) => {
    const { id } = request.params;
    try {
        const publicationsRepository = typeorm_1.getRepository(Publication_1.default);
        const publication = await publicationsRepository.findOne({
            id
        });
        const [, image] = publication.main_image.split('/files/');
        const imageFilePath = path_1.default.join(upload_1.default.directory, image);
        const imageFileExists = await fs_1.default.promises.stat(imageFilePath);
        if (imageFileExists) {
            await fs_1.default.promises.unlink(imageFilePath);
        }
        publicationsRepository.delete({
            id
        });
    }
    catch (err) {
        return response.status(400).json({ err: err.message });
    }
});
exports.default = PublicationsRouter;
