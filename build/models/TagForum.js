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
let TagForum = class TagForum {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TagForum.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TagForum.prototype, "tag_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TagForum.prototype, "forum_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Forum_1.default, forum => forum.tags),
    typeorm_1.JoinColumn({ name: 'forum_id' }),
    __metadata("design:type", Forum_1.default)
], TagForum.prototype, "forum", void 0);
TagForum = __decorate([
    typeorm_1.Entity('tags_forum')
], TagForum);
exports.default = TagForum;
