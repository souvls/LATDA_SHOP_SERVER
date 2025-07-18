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
exports.cancleInvoiceCashier = exports.findAllInvoiceCashier = exports.changestatus = exports.cancleInvoice = exports.findAllInvoice = exports.findInvoiceByID = void 0;
const invoice_1 = require("../services/invoice");
const findInvoiceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const invoice = yield (0, invoice_1._findInvoiceByID)(Number(id));
    if (invoice) {
        res.status(200).json({
            invoices: [invoice],
            total: 1,
            totalPages: 1,
            currentPage: 1,
        });
    }
    else {
        res.status(400).json({ "status": "error", message: "ບໍ່ມີບິນລະຫັດນີ້" });
    }
});
exports.findInvoiceByID = findInvoiceByID;
const findAllInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date_start, date_end, size, page, pay_type } = req.query;
    const invoices = yield (0, invoice_1._findAllInvoice)(date_start, date_end, Number(size), Number(page), pay_type);
    res.status(200).json(invoices);
});
exports.findAllInvoice = findAllInvoice;
const cancleInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const invoice = yield (0, invoice_1._findInvoiceByID)(Number(id));
    if (invoice) {
        if (invoice.status !== "cancel") {
            const cancelinvoice = yield (0, invoice_1._cancleInvoice)(Number(id));
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ", invoice: cancelinvoice });
        }
        else {
            res.status(400).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }
    }
    else {
        res.status(400).json({ "status": "error", "message": "id ບໍ່ຖືກ" });
    }
});
exports.cancleInvoice = cancleInvoice;
const changestatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.query;
    if (!id || !status) {
        res.status(400).json({ "status": "error", "message": "vilidate id, status" });
        return;
    }
    try {
        const newInvoice = yield (0, invoice_1._changeStatus)(Number(id), status);
        if (newInvoice.status !== "no") {
            res.status(200).json(newInvoice);
        }
        else {
            res.status(400).json(newInvoice);
        }
    }
    catch (error) {
    }
});
exports.changestatus = changestatus;
const findAllInvoiceCashier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date_start, date_end, size, page } = req.query;
    const invoices = yield (0, invoice_1._findAllInvoiceCashier)(req.userid, date_start, date_end, Number(size), Number(page));
    res.status(200).json(invoices);
});
exports.findAllInvoiceCashier = findAllInvoiceCashier;
const cancleInvoiceCashier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const invoice = yield (0, invoice_1._findInvoiceByID)(Number(id));
    if (invoice.cashier_id === req.userid) {
        if (invoice.status !== "cancel") {
            const cancelinvoice = yield (0, invoice_1._cancleInvoice)(Number(id));
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ", invoice: cancelinvoice });
        }
        else {
            res.status(400).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }
    }
    else {
        res.status(400).json({ "status": "error", "message": "id ບໍ່ຖືກ" });
    }
});
exports.cancleInvoiceCashier = cancleInvoiceCashier;
