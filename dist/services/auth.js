"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _genToken = (userid, username, role) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ userid: userid, username: username, role: role }, secret, {
    //expiresIn: '1h', // Token หมดอายุใน 1 ชั่วโมง
    });
};
exports._genToken = _genToken;
