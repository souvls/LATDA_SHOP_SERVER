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
exports._deleteUser = exports._updateUser = exports._findAAllUser = exports._findAllCashier = exports._findAllWarehouser = exports._createUser = exports._finUserByID = void 0;
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const _finUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByPk(id);
});
exports._finUserByID = _finUserByID;
const _createUser = (id, username, password, name, phone, address, avatar, role) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.create({ id, username, password, name, phone, address, avatar, role });
});
exports._createUser = _createUser;
const _findAllWarehouser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            where: {
                role: 1
            }
        });
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports._findAllWarehouser = _findAllWarehouser;
const _findAllCashier = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            where: {
                role: 2
            }
        });
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports._findAllCashier = _findAllCashier;
const _findAAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            where: {
                role: { [sequelize_1.Op.ne]: 0 } // role khác 0
            },
            order: [['role', 'ASC']]
        });
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports._findAAllUser = _findAAllUser;
const _updateUser = (id, username, password, name, phone, address, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield user_1.default.update({
            username: username,
            password: password,
            name: name,
            phone: phone,
            address: address,
            role: role
        }, {
            where: { id: id }
        });
        return update;
    }
    catch (error) {
        throw error;
    }
});
exports._updateUser = _updateUser;
const _deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.destroy({
            where: {
                id: id
            }
        });
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports._deleteUser = _deleteUser;
// username: string;
//     password: string;
//     name: string;
//     phone: string;
//     address: string;
//     avatar: string,
//     role: number
