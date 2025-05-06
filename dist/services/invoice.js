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
exports._createInvoice = exports._findInvoiceByID = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const invoice_1 = __importDefault(require("../models/invoice"));
const invoicedetail_1 = __importDefault(require("../models/invoicedetail"));
const product_1 = require("./product");
const _findInvoiceByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield invoice_1.default.findByPk(id, { include: [{ model: invoicedetail_1.default, as: "details" }], });
    }
    catch (error) {
        throw error;
    }
});
exports._findInvoiceByID = _findInvoiceByID;
const _createInvoice = (cart, member_id, m_discount, pay_type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //giam so luong
        const currentDate = new Date();
        // Điều chỉnh múi giờ Lào (UTC+7)
        const laoOffset = 7 * 60; // Múi giờ Lào là UTC+7 (7 giờ chênh lệch với UTC)
        const localDate = new Date(currentDate.getTime() + (laoOffset - currentDate.getTimezoneOffset()) * 60000);
        // Chuyển đổi sang định dạng YYYY-MM-DD HH:MM:SS
        const formattedDateTime = localDate.toISOString().slice(0, 19).replace('T', ' ');
        const newInvoice = yield invoice_1.default.create({
            cashier_id: cart.cashier_id,
            member_id: member_id,
            cart_type: cart.cart_type,
            total_unit_lak: cart.total_unit_lak,
            total_unit_thb: cart.total_unit_thb,
            total_lak: cart.total_lak,
            total_thb: cart.total_lak,
            total_checkout_lak: cart.total_lak - m_discount,
            total_checkout_thb: 0,
            rate: cart.rate,
            m_discount: m_discount,
            pay_type: pay_type,
            date_create: formattedDateTime,
            status: ''
        });
        //
        if (newInvoice) {
            for (const i of cart.details) {
                yield (0, product_1._checkoutProduct)(i.barcode, i.qty);
                yield invoicedetail_1.default.create({
                    invoice_id: newInvoice.id,
                    barcode: i.barcode,
                    size: i.size,
                    title: i.title,
                    use_for: i.use_for,
                    unit: i.unit,
                    cost_thb: i.cost_thb,
                    cost_lak: i.cost_lak,
                    wholesale_thb: i.wholesale_thb,
                    wholesale_lak: i.wholesale_lak,
                    retail_thb: i.retail_thb,
                    retail_lak: i.retail_lak,
                    discount: i.discount,
                    qty: i.qty,
                    total_unit_lak: i.total_unit_lak,
                    total_lak: i.total_lak
                });
            }
            yield cart_1.default.destroy({
                where: { id: cart.id },
            });
            const invoice = yield (0, exports._findInvoiceByID)(newInvoice.id);
            return invoice;
        }
    }
    catch (error) {
        throw error;
    }
});
exports._createInvoice = _createInvoice;
