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
        const { cart_name, m_discount, member_id, pay_type } = req.body;
        if (!cart_name && m_discount >= 0) {
            res.status(200).json({ "status": "error", message: "cart_name is required" });
        }
        const result = yield (0, checkout_1._retail)(req.userid, cart_name, m_discount, pay_type, member_id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.retailCart = retailCart;
