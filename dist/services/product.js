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
exports._findProductByAlertQty = exports._checkoutProduct = exports._findProductByNo = exports._findProductByPage = exports._findProductByTitle = exports._findProductByCode = exports._findProductByIDMath = exports._findProductByID = exports._insertProduct = exports._findAllProduct = exports._deleteProduct = exports._updateIMGProduct = exports._updateProduct = exports._addProduct = void 0;
const sequelize_1 = require("sequelize");
const product_1 = __importDefault(require("../models/product"));
const _addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProduct = yield product_1.default.findByPk(product.barcode);
        if (existingProduct) {
            throw new Error("Product with this barcode already exists.");
        }
        return yield product_1.default.create(product);
    }
    catch (error) {
        throw error;
    }
});
exports._addProduct = _addProduct;
const _updateProduct = (barcode, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield product_1.default.update(updateFields, { where: { barcode } });
    return update;
});
exports._updateProduct = _updateProduct;
const _updateIMGProduct = (barcode, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield product_1.default.update({ img_name: filename }, { where: { barcode } });
    return update;
});
exports._updateIMGProduct = _updateIMGProduct;
const _deleteProduct = (barcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.default.destroy({
            where: {
                barcode: barcode,
            },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports._deleteProduct = _deleteProduct;
const _findAllProduct = (_size, _page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = !_page || _page <= 0 ? 1 : _page;
        const size = !_size || _size <= 0 ? 100 : _size;
        const products = yield product_1.default.findAndCountAll({
            limit: size, // Số lượng hóa đơn mỗi trang
            offset: (page - 1) * size, // Tính offset cho phân trang (tính từ trang 1)
            // order: [['date_create', 'DESC']], // Sắp xếp theo ngày giảm dần
            // include: [{ model: , as: "details" }]
        });
        // console.log(products)
        return {
            products: products.rows, // Dữ liệu hóa đơn
            total: products.count, // Tổng số hóa đơn thỏa mãn điều kiện
            totalPages: Math.ceil(products.count / size), // Số trang
            currentPage: page, // Trang hiện tại
        };
    }
    catch (error) {
        throw error;
    }
});
exports._findAllProduct = _findAllProduct;
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
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByID = _findProductByID;
const _findProductByIDMath = (barcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: {
                barcode: {
                    [sequelize_1.Op.like]: `%${barcode}%`
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByIDMath = _findProductByIDMath;
const _findProductByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("code")), {
                [sequelize_1.Op.like]: code + "%",
            }),
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
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("title")), {
                [sequelize_1.Op.like]: "%" + title + "%",
            }),
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
            where: { page: page },
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
            where: { No: No },
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByNo = _findProductByNo;
const _checkoutProduct = (barcode, qty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, exports._findProductByID)(barcode);
        yield product_1.default.update({
            qty_out: product.qty_out + qty,
            qty_balance: product.qty_start + product.qty_in - (product.qty_out + qty),
        }, { where: { barcode: barcode } });
    }
    catch (error) {
        throw error;
    }
});
exports._checkoutProduct = _checkoutProduct;
const _findProductByAlertQty = (qty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_1.default.findAll({
            where: { qty_alert: qty },
        });
    }
    catch (error) {
        throw error;
    }
});
exports._findProductByAlertQty = _findProductByAlertQty;
