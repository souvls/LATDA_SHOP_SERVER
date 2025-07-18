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
exports.resetQty = exports.findProduct = exports.findProductByNo = exports.findProductByPage = exports.findProductByTitle = exports.findProductByCode = exports.findProductByID = exports.getAllProduct = exports.updateProduct = exports.updateIMGProduct = exports.deleteProduct = exports.increaseProduct = exports.addProduct = void 0;
const product_1 = require("../services/product");
const image_1 = require("../services/image");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { barcode, page, No, code, size, title, use_for, brand, unit, category, cost_thb, cost_lak, wholesale_thb, wholesale_lak, retail_thb, retail_lak, discount, num_of_discount, qty_start, qty_in, qty_out, qty_balance, qty_alert, supplier,
    // status
     } = req.body;
    try {
        // if (!barcode) { return res.status(500).json({ error: "vilid barcodeF" }); }
        const product = yield (0, product_1._findProductByID)(barcode);
        if (!product) {
            const newProduct = yield (0, product_1._addProduct)({
                barcode,
                page,
                No,
                code,
                size,
                title,
                use_for,
                brand,
                unit,
                category,
                cost_thb,
                cost_lak,
                wholesale_thb,
                wholesale_lak,
                retail_thb,
                retail_lak,
                discount,
                num_of_discount,
                qty_start,
                qty_in,
                qty_out,
                qty_balance,
                qty_alert,
                supplier,
                img_name: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || null,
                status: 'active'
            });
            res.status(201).json({ "status": "success", "message": "ເພີ່ມສຳເລັດ", data: newProduct });
        }
        else {
            res.status(200).json({ "status": "error", "message": "ມີສິນຄ້າແລ້ວ" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
exports.addProduct = addProduct;
const increaseProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { barcode, qty } = req.body;
        if (!barcode || !qty) {
            res.status(400).json({ status: "error", message: "Invalid barcode" });
        }
        else {
            const product = yield (0, product_1._findProductByID)(barcode);
            if (product) {
                const update = yield (0, product_1._increaseProduct)(barcode, qty);
                if (update) {
                    res.status(200).json({ status: "success" });
                }
            }
            else {
                res.status(400).json({ status: "error", message: "barcode not exits" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", message: "Failed to delete product", error });
    }
});
exports.increaseProduct = increaseProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.query;
    if (typeof barcode === "string" && barcode) {
        try {
            const product = yield (0, product_1._findProductByID)(barcode);
            if (product) {
                //delete product
                const result = yield (0, product_1._deleteProduct)(barcode);
                //delete img
                if (product.img_name) {
                    (0, image_1._removeIMG)(product.img_name);
                }
                res.status(200).json({ status: "success", message: "ລົບສຳເລັດ", data: result });
            }
            else {
                res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
            }
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Failed to delete product", error });
        }
    }
    else {
        res.status(400).json({ status: "error", message: "Invalid or missing barcode" });
    }
});
exports.deleteProduct = deleteProduct;
const updateIMGProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { barcode } = req.query;
    const img_name = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || null;
    if (typeof barcode === "string" && barcode) {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (product) {
            const update = yield (0, product_1._updateIMGProduct)(barcode, img_name);
            if (((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename) !== null) {
                if (product.img_name) {
                    (0, image_1._removeIMG)(product.img_name);
                }
            }
            ;
            res.status(200).json({ status: "success", message: "ອັບເດດສຳເລັດ", data: update });
        }
        else {
            res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
        }
    }
});
exports.updateIMGProduct = updateIMGProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.query;
    if (typeof barcode === "string" && barcode) {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (product) {
            console.log(req.body);
            const update = yield (0, product_1._updateProduct)(barcode, req.body);
            res.status(200).json({ status: "success", message: "ອັບເດດສຳເລັດ", data: update });
        }
        else {
            res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
        }
    }
});
exports.updateProduct = updateProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page } = req.query;
    const products = yield (0, product_1._findAllProduct)(Number(size), Number(page));
    if (products) {
        res.status(200).json(products);
    }
});
exports.getAllProduct = getAllProduct;
const findProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.query;
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(200).json(null);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductByID = findProductByID;
const findProductByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const product = yield (0, product_1._findProductByCode)(code);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductByCode = findProductByCode;
const findProductByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    try {
        const product = yield (0, product_1._findProductByTitle)(title);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductByTitle = findProductByTitle;
const findProductByPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const product = yield (0, product_1._findProductByPage)(page);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductByPage = findProductByPage;
const findProductByNo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { No } = req.query;
    try {
        const product = yield (0, product_1._findProductByNo)(No);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductByNo = findProductByNo;
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode, title, code, page, No, qty } = req.query;
    try {
        const products = [];
        if (barcode) {
            const pd = yield (0, product_1._findProductByIDMath)(barcode);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (title) {
            const pd = yield (0, product_1._findProductByTitle)(title);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (code) {
            const pd = yield (0, product_1._findProductByCode)(code);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (page) {
            const pd = yield (0, product_1._findProductByPage)(page);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (No) {
            const pd = yield (0, product_1._findProductByNo)(No);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (qty) {
            const pd = yield (0, product_1._findProductByAlertQty)(Number(qty));
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProduct = findProduct;
const resetQty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield (0, product_1._resetQty)();
        res.status(200).json(update);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.resetQty = resetQty;
