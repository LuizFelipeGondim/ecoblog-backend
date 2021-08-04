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
const ForumComment_1 = __importDefault(require("./ForumComment"));
const TagForum_1 = __importDefault(require("./TagForum"));
const User_1 = __importDefault(require("./User"));
let Forum = class Forum {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Forum.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Forum.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, user => user.forum),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User_1.default)
], Forum.prototype, "author", void 0);
__decorate([
    typeorm_1.OneToMany(() => TagForum_1.default, tags => tags.forum),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Forum.prototype, "tags", void 0);
__decorate([
    typeorm_1.OneToMany(() => ForumComment_1.default, comments => comments.forum),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Forum.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Forum.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Forum.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Forum.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Forum.prototype, "resolved", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Forum.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Forum.prototype, "updated_at", void 0);
Forum = __decorate([
    typeorm_1.Entity('forum')
], Forum);
exports.default = Forum;
