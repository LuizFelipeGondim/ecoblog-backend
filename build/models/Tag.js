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
const Publication_1 = __importDefault(require("./Publication"));
let Tag = class Tag {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Tag.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tag.prototype, "tag_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tag.prototype, "publication_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Publication_1.default),
    typeorm_1.JoinColumn({ name: 'publication_id' }),
    __metadata("design:type", Publication_1.default)
], Tag.prototype, "post", void 0);
Tag = __decorate([
    typeorm_1.Entity('tags')
], Tag);
exports.default = Tag;
