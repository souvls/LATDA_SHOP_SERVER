"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._removeIMG = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const _removeIMG = (filename) => {
    const imagePath = path_1.default.join(__dirname, '..', 'uploads', filename);
    fs_1.default.unlink(imagePath, (err) => {
        if (err)
            console.error('Không thể xóa ảnh:', err);
    });
};
exports._removeIMG = _removeIMG;
