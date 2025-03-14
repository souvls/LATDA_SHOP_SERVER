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
exports._addToCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const cartdetsil_1 = __importDefault(require("../models/cartdetsil"));
const exchange_1 = require("./exchange");
const product_1 = require("./product");
const _createCart = (cashier_id, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchang = yield (0, exchange_1._getExchange)();
        const cart = yield cart_1.default.create({
            cashier_id, cart_type: 0, cart_name,
            total_unit_lak: 0,
            total_unit_thb: 0,
            total_lak: 0,
            total_thb: 0,
            rate: exchang,
            m_discount: 0,
            status: ""
        });
        return cart;
    }
    catch (error) {
        throw error;
    }
});
const _findCart = (cashier_id, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_1.default.findOne({
            where: { cashier_id: cashier_id, cart_name: cart_name },
            include: [{ model: cartdetsil_1.default, as: "details" }],
        });
        return cart;
    }
    catch (error) {
        throw error;
    }
});
const _findCartItem = (cart_id, barcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cartdetsil_1.default.findOne({
            where: { cart_id: cart_id, barcode: barcode }
        });
    }
    catch (error) {
        throw error;
    }
});
const _createCartItem = (cart_id, product, qty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchang_rate = yield (0, exchange_1._getExchange)();
        const item = yield _findCartItem(cart_id, product.barcode);
        if (!item) {
            const retail_lak = product.retail_lak > 0 ? product.retail_lak : product.retail_thb * exchang_rate;
            // console.log(product.retail_lak);
            // console.log(exchang_rate);
            const discount = product.num_of_discount >= qty ? product.discount : 0;
            const total_unit_lak = retail_lak * qty;
            const total_lak = total_unit_lak - (total_unit_lak * discount / 100);
            return yield cartdetsil_1.default.create({
                cart_id: cart_id,
                barcode: product.barcode,
                cost_thb: product.cost_thb,
                cost_lak: product.cost_lak,
                wholesale_lak: product.wholesale_lak,
                wholesale_thb: product.wholesale_thb,
                retail_thb: product.retail_thb,
                retail_lak: retail_lak,
                discount: discount,
                qty: qty,
                total_unit_lak: total_unit_lak,
                total_lak: total_lak
            });
        }
        else {
            const discount = (qty + item.qty) >= product.num_of_discount ? product.discount : 0;
            const total_unit_lak = item.retail_lak * (qty + item.qty);
            const total_lak = total_unit_lak - (total_unit_lak * discount / 100);
            return yield cartdetsil_1.default.update({
                qty: qty + item.qty,
                discount: discount,
                total_unit_lak: total_unit_lak,
                total_lak: total_lak
            }, { where: { cart_id: cart_id, barcode: item.barcode } });
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const _addToCart = (cashier_id, barcode, qty, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" };
        }
        if (product.qty_balance <= 0) {
            return { status: "error", message: "ສິນຄ້າເບິດ" };
        }
        if (product.status === "0") {
            return { status: "error", message: "ສິນຄ້າຢຸດຂາຍ" };
        }
        const cart = yield _findCart(cashier_id, cart_name);
        // console.log(cart)
        //create cart
        if (!cart) {
            const newCart = yield _createCart(cashier_id, cart_name);
            yield _createCartItem(newCart.id, product, qty);
        }
        else {
            yield _createCartItem(cart.id, product, qty);
        }
        return yield _findCart(cashier_id, cart_name);
    }
    catch (error) {
        throw error;
    }
});
exports._addToCart = _addToCart;
