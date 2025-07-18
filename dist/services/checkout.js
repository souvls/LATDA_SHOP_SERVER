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
exports._retail = void 0;
const cart_1 = require("./cart");
const invoice_1 = require("./invoice");
const _retail = (cashier_id, cart_name, m_discount, pay_type, member_id, money_received) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield (0, cart_1._findCart)(cashier_id, cart_name);
        if (!cart) {
            return { status: "error", message: "ບໍ່ພົບກະຕ່າ" };
        }
        if (pay_type != "debt") {
            if ((cart.total_lak - m_discount) > money_received) {
                console.log("total", cart.total_lak);
                return { "status": "error", message: "ເງິນຮັບມານ້ອຍກວ່າລາຄາສິນຄ້າ" };
            }
        }
        if (m_discount > cart.total_lak) {
            return { "status": "error", message: "ຈຳນວນຫຼຸດ ຫຼາຍກວ່າ ລາຄາສິນຄ້າ" };
        }
        const invoice = yield (0, invoice_1._createInvoice)(cart, member_id, m_discount, pay_type, money_received);
        if (invoice) {
            return invoice;
        }
        else {
            return false;
        }
    }
    catch (error) {
    }
});
exports._retail = _retail;
