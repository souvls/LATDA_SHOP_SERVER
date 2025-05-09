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
exports.cancleInvoice = exports.findAllInvoice = exports.findInvoiceByID = void 0;
const invoice_1 = require("../services/invoice");
const findInvoiceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const invoice = yield (0, invoice_1._findInvoiceByID)(Number(id));
    res.status(200).json(invoice);
});
exports.findInvoiceByID = findInvoiceByID;
const findAllInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date_start, date_end, size, page } = req.body;
    const invoices = yield (0, invoice_1._findAllInvoice)(date_start, date_end, size, page);
    res.status(200).json(invoices);
});
exports.findAllInvoice = findAllInvoice;
const cancleInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const invoice = yield (0, invoice_1._findInvoiceByID)(id);
    if (invoice) {
        if (invoice.status !== "cancel") {
            yield (0, invoice_1._cancleInvoice)(id);
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ" });
        }
        else {
            res.status(200).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }
    }
    else {
        res.status(200).json({ "status": "error", "message": "ບໍ່ສຳເລັດ id ບໍ່ຖືກ" });
    }
});
exports.cancleInvoice = cancleInvoice;
