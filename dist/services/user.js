"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._createUser = exports._finUserByID = void 0;
const user_1 = __importDefault(require("../models/user"));
const _finUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByPk(id);
});
exports._finUserByID = _finUserByID;
const _createUser = (id, username, password, name, phone, address, avatar, role) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.create({ id, username, password, name, phone, address, avatar, role });
});
exports._createUser = _createUser;
// username: string;
//     password: string;
//     name: string;
//     phone: string;
//     address: string;
//     avatar: string,
//     role: number
