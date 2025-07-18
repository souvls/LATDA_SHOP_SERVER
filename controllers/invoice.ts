import { Request, Response } from "express";
import { _cancleInvoice, _changeStatus, _findAllInvoice, _findAllInvoiceCashier, _findInvoiceByID } from "../services/invoice"


export const findInvoiceByID = async (req: Request, res: Response) => {
    const { id } = req.query
    const invoice = await _findInvoiceByID(Number(id));
    if (invoice) {
        res.status(200).json({
            invoices: [invoice],
            total: 1,
            totalPages: 1,
            currentPage: 1,
        });
    } else {
        res.status(400).json({ "status": "error", message: "ບໍ່ມີບິນລະຫັດນີ້" });
    }

}
export const findAllInvoice = async (req: Request, res: Response) => {
    const { date_start, date_end, size, page,pay_type } = req.query
    const invoices = await _findAllInvoice(date_start as string, date_end as string, Number(size), Number(page),pay_type as string);
    res.status(200).json(invoices);
}

export const cancleInvoice = async (req: Request, res: Response) => {
    const { id } = req.query
    const invoice: any = await _findInvoiceByID(Number(id));
    if (invoice) {
        if (invoice.status !== "cancel") {
            const cancelinvoice = await _cancleInvoice(Number(id));
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ", invoice: cancelinvoice });
        } else {
            res.status(400).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }

    } else {
        res.status(400).json({ "status": "error", "message": "id ບໍ່ຖືກ" });
    }
}
export const changestatus = async (req: Request, res: Response) => {
    const { id, status } = req.query;
    if (!id || !status) {
        res.status(400).json({ "status": "error", "message": "vilidate id, status" });
        return;
    }
    try {
        const newInvoice: any = await _changeStatus(Number(id), status as string);
        if (newInvoice.status !== "no") {
            res.status(200).json(newInvoice);
        } else {
            res.status(400).json(newInvoice);

        }
    } catch (error) {

    }
}
export const findAllInvoiceCashier = async (req: Request, res: Response) => {
    const { date_start, date_end, size, page } = req.query
    const invoices = await _findAllInvoiceCashier((req as any).userid, date_start as string, date_end as string, Number(size), Number(page));
    res.status(200).json(invoices);
}
export const cancleInvoiceCashier = async (req: Request, res: Response) => {
    const { id } = req.query
    const invoice: any = await _findInvoiceByID(Number(id));
    if (invoice.cashier_id === (req as any).userid) {
        if (invoice.status !== "cancel") {
            const cancelinvoice = await _cancleInvoice(Number(id));
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ", invoice: cancelinvoice });
        } else {
            res.status(400).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }
    } else {
        res.status(400).json({ "status": "error", "message": "id ບໍ່ຖືກ" });
    }
}
