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
exports.retailCart = void 0;
const checkout_1 = require("../services/checkout");
const retailCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cart_name, m_discount, member_id, pay_type, money_received } = req.body;
        console.log(req.body);
        var errors = "";
        var m_received = money_received;
        if (!cart_name) {
            errors += " cart_name is required";
        }
        if (!pay_type) {
            errors += " ປະເພດຈ່າຍ ບໍ່ຖືກຕ້ອງ";
        }
        if (pay_type === "debt") {
            m_received = 0;
        }
        if (money_received === undefined || money_received === null || money_received < 0) {
            errors += " ເງິນຮັບມາບໍ່ຖືກຕ້ອງ";
        }
        if (errors.length > 0) {
            res.status(400).json({ "status": "error", message: errors });
            return;
        }
        const result = yield (0, checkout_1._retail)(req.userid, cart_name, m_discount, pay_type, member_id, m_received);
        if (result.status !== "error") {
            res.status(200).json(result);
            return;
        }
        else {
            res.status(400).json(result);
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.retailCart = retailCart;
