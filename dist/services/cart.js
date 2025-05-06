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
exports._clearCart = exports._removeProductFromCart = exports._decreaseItem = exports._increaseItem = exports._addToCart = exports._findCart = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
const cart_1 = __importDefault(require("../models/cart"));
const cartdetail_1 = __importDefault(require("../models/cartdetail"));
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
            include: [{ model: cartdetail_1.default, as: "details" }],
        });
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports._findCart = _findCart;
const _findCartItem = (cart_id, barcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cartdetail_1.default.findOne({
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
            const discount = (qty + (item === null || item === void 0 ? void 0 : item.qty) || 0) >= product.num_of_discount ? product.discount : 0;
            const total_unit_lak = retail_lak * qty;
            const total_lak = total_unit_lak - (total_unit_lak * discount / 100);
            return yield cartdetail_1.default.create({
                cart_id: cart_id,
                barcode: product.barcode,
                title: product.title,
                size: product.size,
                use_for: product.use_for,
                unit: product.unit,
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
            return yield cartdetail_1.default.update({
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
const _updateCart = (cart_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_1.default.findByPk(cart_id, {
        include: [{ model: cartdetail_1.default, as: "details" }]
    });
    const items = cart.details;
    var total_lak = 0;
    var total_unit_lak = 0;
    for (const i of items) {
        total_lak += i.total_lak;
        total_unit_lak += i.total_unit_lak;
    }
    yield cart_1.default.update({ total_lak: total_lak, total_unit_lak: total_unit_lak }, {
        where: { id: cart_id },
    });
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
        if (product.qty_balance - qty < 0) {
            return { status: "error", message: "ສິນຄ້າບໍ່ພໍ" };
        }
        if (product.status === "0") {
            return { status: "error", message: "ສິນຄ້າຢຸດຂາຍ" };
        }
        const cart = yield (0, exports._findCart)(cashier_id, cart_name);
        if (!cart) {
            const newCart = yield _createCart(cashier_id, cart_name);
            yield _createCartItem(newCart.id, product, qty);
            yield _updateCart(newCart.id);
        }
        else {
            yield _createCartItem(cart.id, product, qty);
            yield _updateCart(cart.id);
        }
        return yield (0, exports._findCart)(cashier_id, cart_name);
    }
    catch (error) {
        throw error;
    }
});
exports._addToCart = _addToCart;
const _increaseItem = (cashier_id, barcode, qty, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" };
        }
        const [cartItem] = yield db_1.default.query(`select * from cart as c
            join cartdetail as cdt on c.id = cdt.cart_id
            where c.cashier_id = '${cashier_id}' AND c.cart_name = ${cart_name} AND cdt.barcode = '${barcode}'
            limit 1
            `, { type: sequelize_1.QueryTypes.SELECT });
        if (!cartItem) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າໃນກະຕ່າ" };
        }
        if (cartItem.qty + qty > product.qty_balance) {
            return { status: "error", message: "ສິນຄ້າບໍ່ພໍ" };
        }
        const new_qty = cartItem.qty + qty;
        const new_total_unit_lak = cartItem.retail_lak * new_qty;
        const new_discount = new_qty >= product.num_of_discount ? product.discount : 0;
        const new_total_lak = new_total_unit_lak - (new_total_unit_lak * new_discount / 100);
        yield db_1.default.query(`update cartdetail
            set qty = ${new_qty},
            total_unit_lak = ${new_total_unit_lak},
            discount = ${new_discount},
            total_lak = ${new_total_lak}
            where id = ${cartItem.id} and barcode = '${barcode}'`);
        yield _updateCart(cartItem.cart_id);
        return yield (0, exports._findCart)(cashier_id, cart_name);
    }
    catch (error) {
        throw error;
    }
});
exports._increaseItem = _increaseItem;
const _decreaseItem = (cashier_id, barcode, qty, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_1._findProductByID)(barcode);
        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" };
        }
        const [cartItem] = yield db_1.default.query(`select * from cart as c
            join cartdetail as cdt on c.id = cdt.cart_id
            where c.cashier_id = '${cashier_id}' AND c.cart_name = ${cart_name} AND cdt.barcode = '${barcode}'
            limit 1
            `, { type: sequelize_1.QueryTypes.SELECT });
        if (!cartItem) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າໃນກະຕ່າ" };
        }
        if (cartItem.qty - qty <= 0) {
            return { status: "error", message: "ຈຳນວນສິນຄ້າຂັ້ນຕ່ຳແລ້ວ" };
        }
        const new_qty = cartItem.qty - qty;
        const new_total_unit_lak = cartItem.retail_lak * new_qty;
        const new_discount = new_qty >= product.num_of_discount ? product.discount : 0;
        const new_total_lak = new_total_unit_lak - (new_total_unit_lak * new_discount / 100);
        yield db_1.default.query(`update cartdetail
            set qty = ${new_qty},
            total_unit_lak = ${new_total_unit_lak},
            discount = ${new_discount},
            total_lak = ${new_total_lak}
            where id = ${cartItem.id} and barcode = '${barcode}'`);
        yield _updateCart(cartItem.cart_id);
        return yield (0, exports._findCart)(cashier_id, cart_name);
    }
    catch (error) {
        throw error;
    }
});
exports._decreaseItem = _decreaseItem;
const _removeProductFromCart = (cashier_id, barcode, cart_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [cartItem] = yield db_1.default.query(`select * from cart as c
            join cartdetail as cdt on c.id = cdt.cart_id
            where c.cashier_id = '${cashier_id}' AND c.cart_name = ${cart_name} AND cdt.barcode = '${barcode}'
            limit 1
            `, { type: sequelize_1.QueryTypes.SELECT });
        if (!cartItem) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າໃນກະຕ່າ" };
        }
        const deletedRows = yield cartdetail_1.default.destroy({
            where: {
                cart_id: cartItem.cart_id,
                barcode: barcode,
            }
        });
        if (deletedRows > 0) {
            yield _updateCart(cartItem.cart_id);
            return yield (0, exports._findCart)(cashier_id, cart_name);
        }
        else {
            return { status: "error", message: "error" };
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports._removeProductFromCart = _removeProductFromCart;
const _clearCart = (cashier_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteCount = yield cart_1.default.destroy({
            where: { id: id, cashier_id: cashier_id },
        });
        if (deleteCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports._clearCart = _clearCart;
