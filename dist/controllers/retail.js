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
exports.findProductRetail = void 0;
const product_1 = require("../services/product");
const findProductRetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.query;
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (product) {
            if (product.status !== "0") {
                if (product.qty_balance > 0) {
                    res.status(200).json(product);
                }
                else {
                    res.status(202).json({ message: "ສິນຄ້າໝົດ" });
                }
            }
            else {
                res.status(202).json({ message: "ຍົກເລີກການຂາຍສິນຄ້ານີ້" });
            }
        }
        else {
            res.status(202).json({ message: "ບໍ່ພົບ ສິນຄ້າ" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findProductRetail = findProductRetail;
