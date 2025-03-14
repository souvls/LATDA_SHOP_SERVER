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
exports._findProductByNo = exports._findProductByPage = exports._findProductByTitle = exports._findProductByCode = exports._findProductByID = exports._insertProduct = void 0;
const sequelize_1 = require("sequelize");
const product_1 = __importDefault(require("../models/product"));
const _insertProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.create(product);
    }
    catch (error) {
        throw error;
    }
});
exports._insertProduct = _insertProduct;
const _findProductByID = (barcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findByPk(barcode);
        ;
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByID = _findProductByID;
const _findProductByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('LOWER', sequelize_1.Sequelize.col('code')), {
                [sequelize_1.Op.like]: code + '%'
            })
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByCode = _findProductByCode;
const _findProductByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('LOWER', sequelize_1.Sequelize.col('title')), {
                [sequelize_1.Op.like]: '%' + title + '%'
            })
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByTitle = _findProductByTitle;
const _findProductByPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: { page: page }
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByPage = _findProductByPage;
const _findProductByNo = (No) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: { No: No }
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByNo = _findProductByNo;
