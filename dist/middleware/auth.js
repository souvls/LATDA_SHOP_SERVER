"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateCashier = exports.authenticateAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // คาดหวังรูปแบบ "Bearer <token>"
    if (!token) {
        res.status(401).json({
            status: 'error',
            message: 'no token',
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.userid = decoded.userid;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        res.status(403).json({
            status: 'error',
            message: 'wrong token',
        });
    }
};
exports.authenticateToken = authenticateToken;
const authenticateAdmin = (req, res, next) => {
    if (req.role !== 1) {
        res.status(401).json({
            status: 'error',
            message: 'no token',
        });
        return;
    }
    next();
};
exports.authenticateAdmin = authenticateAdmin;
const authenticateCashier = (req, res, next) => {
    if (req.role !== 2) {
        res.status(401).json({
            status: 'error',
            message: 'you not cashier',
        });
        return;
    }
    next();
};
exports.authenticateCashier = authenticateCashier;
