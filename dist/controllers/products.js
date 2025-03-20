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
exports.findProductByNo = exports.findProductByPage = exports.findProductByTitle = exports.findProductByCode = exports.findProductByID = exports.AddProduct = void 0;
const product_1 = require("../services/product");
const product_2 = __importDefault(require("../models/product"));
const product_json_1 = __importDefault(require("../libs/data/product.json"));
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id, username, password, name, phone, address, avatar, role } = req.body;
    for (const i of product_json_1.default) {
        yield product_2.default.create({
            barcode: i.barcode,
            page: i.page,
            No: i.No,
            code: i.code,
            size: i.size,
            title: i.title,
            use_for: i.use_for,
            unit: i.unit,
            category: i.category,
            cost_thb: Number(i.cost_thb),
            cost_lak: Number(i.cost_lak),
            wholesale_thb: Number(i.wholesale_thb),
            wholesale_lak: Number(i.wholesale_lak),
            retail_thb: Number(i.retail_thb),
            retail_lak: Number(i.retail_lak),
            discount: Number(i.discount),
            num_of_discount: Number(i.num_of_discount),
            qty_start: Number(i.qty_start),
            qty_in: Number(i.qty_in),
            qty_out: Number(i.qty_out),
            qty_balance: Number(i.qty_balance),
            status: ""
        });
    }
    res.status(201).json();
});
exports.AddProduct = AddProduct;
const findProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.query;
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
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
