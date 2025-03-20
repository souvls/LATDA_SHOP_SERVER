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
exports.Login = void 0;
const user_1 = require("../services/user");
const auth_1 = require("../services/auth");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // console.log(req.body)
        if (!username && !password) {
            res.status(401).json({ "status": "error", message: "your request not data" });
            return;
        }
        const user = yield (0, user_1._finUserByID)(username);
        console.log(user);
        if (!user) {
            res.status(401).json({ "status": "error", message: "ບໍ່ພົບຜູ້ໃຊ້" });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ "status": "error", message: "ລະຫັດຜິດ" });
            return;
        }
        const token = yield (0, auth_1._genToken)(user.id, user.username, user.role);
        res.status(200).json({
            token: token,
            username: user.username,
            name: user.name,
            path: user.role
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Login" });
        return;
    }
});
exports.Login = Login;
