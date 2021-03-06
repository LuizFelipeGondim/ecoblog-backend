"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Category_1 = __importDefault(require("./Category"));
const User_1 = __importDefault(require("./User"));
let Publication = class Publication {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Publication.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User_1.default)
], Publication.prototype, "author", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Publication.prototype, "main_image", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Category_1.default, category => category.publications, {
        eager: true
    }),
    typeorm_1.JoinTable({ name: 'publications_categories' }),
    __metadata("design:type", Array)
], Publication.prototype, "categories", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Publication.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Publication.prototype, "updated_at", void 0);
Publication = __decorate([
    typeorm_1.Entity('publications')
], Publication);
exports.default = Publication;
