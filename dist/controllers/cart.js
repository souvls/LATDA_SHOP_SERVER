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
exports.findCartName = exports.removeProductFromCart = exports.clearCart = exports.decreaseItem = exports.increaseItem = exports.addToCart = void 0;
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
const increaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { barcode, qty, cart_name } = req.body;
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" });
            return;
            ;
        }
        const cart = yield (0, cart_1._increaseItem)(req.userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.increaseItem = increaseItem;
const decreaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { barcode, qty, cart_name } = req.body;
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" });
            return;
            ;
        }
        const cart = yield (0, cart_1._decreaseItem)(req.userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.decreaseItem = decreaseItem;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(200).json({ "status": "error", message: `id is required` });
        }
        const clearCart = yield (0, cart_1._clearCart)(req.userid, Number(id));
        if (clearCart) {
            res.status(200).json({ "status": "ok", message: `clear cart is ${clearCart}` });
        }
        else {
            res.status(200).json({ "status": "error", message: `do not have your cart id` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.clearCart = clearCart;
const removeProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { barcode, cart_name } = req.query;
        if (!barcode && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" });
            return;
            ;
        }
        if (cart_name) {
            const cart = yield (0, cart_1._removeProductFromCart)(req.userid, barcode, Number(cart_name));
            res.status(200).json(cart);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.removeProductFromCart = removeProductFromCart;
const findCartName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cart_name } = req.query;
        if (!cart_name) {
            res.status(200).json({ "status": "error", message: "cart_name is required" });
        }
        const cart = yield (0, cart_1._findCart)(req.userid, Number(cart_name));
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(200).json({ "status": "error", message: cart });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findCartName = findCartName;
