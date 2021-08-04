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
const Forum_1 = __importDefault(require("./Forum"));
const ForumComment_1 = __importDefault(require("./ForumComment"));
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "uf", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "whatsapp", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "is_staff", void 0);
__decorate([
    typeorm_1.OneToMany(() => Forum_1.default, forum => forum.author),
    __metadata("design:type", Array)
], User.prototype, "forum", void 0);
__decorate([
    typeorm_1.OneToMany(() => ForumComment_1.default, comment => comment.user),
    typeorm_1.JoinColumn({ name: 'comment' }),
    __metadata("design:type", ForumComment_1.default)
], User.prototype, "comment", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.default = User;
