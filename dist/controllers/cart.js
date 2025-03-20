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
exports.addToCart = void 0;
const cart_1 = require("../services/cart");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { barcode, qty, cart_name } = req.body;
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" });
            return;
        }
        // console.log(req)
        const cart = yield (0, cart_1._addToCart)(req.userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.addToCart = addToCart;
