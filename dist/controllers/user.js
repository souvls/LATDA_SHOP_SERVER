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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAll = exports.createUser = exports.getUserByID = void 0;
const user_1 = require("../services/user");
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const user = yield (0, user_1._finUserByID)(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(400).json({ message: " ບໍ່ພົບ user" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error find user id" });
    }
});
exports.getUserByID = getUserByID;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username, password, name, phone, address, role } = req.body;
        const user = yield (0, user_1._finUserByID)(id);
        if (!user) {
            const newUser = yield (0, user_1._createUser)(id, username, password, name, phone, address, '', role);
            res.status(201).json(newUser);
        }
        else {
            res.status(400).json({ message: "ມີຜູ້ໃຊ້ແລ້ວ" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
exports.createUser = createUser;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1._findAAllUser)();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error get all user" });
    }
});
exports.getAll = getAll;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username, password, name, phone, address, role } = req.body;
        const user = yield (0, user_1._finUserByID)(id);
        if (user) {
            yield (0, user_1._updateUser)(id, username, password, name, phone, address, role);
            res.status(200).json({ message: " ສຳເລັດ" });
        }
        else {
            res.status(400).json({ message: " ບໍ່ພົບ user" });
        }
    }
    catch (error) {
        // console.log(error)
        res.status(500).json({ message: error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (id) {
            const user = yield (0, user_1._finUserByID)(id);
            if (user) {
                yield (0, user_1._deleteUser)(id);
                res.status(200).json({ message: " ສຳເລັດ" });
            }
            else {
                res.status(400).json({ message: " ບໍ່ພົບ user" });
            }
        }
        else {
            res.status(400).json({ message: " Invalid ID" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteUser = deleteUser;
