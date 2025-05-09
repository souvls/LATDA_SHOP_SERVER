import { Request, Response } from "express";
import { _cancleInvoice, _findAllInvoice, _findInvoiceByID } from "../services/invoice"


export const findInvoiceByID = async (req: Request, res: Response) => {
    const { id } = req.query
    const invoice = await _findInvoiceByID(Number(id));
    res.status(200).json(invoice);
}
export const findAllInvoice = async (req: Request, res: Response) => {
    const { date_start, date_end, size, page } = req.body
    const invoices = await _findAllInvoice(date_start, date_end, size, page);
    res.status(200).json(invoices);
}
export const cancleInvoice = async (req: Request, res: Response) => {
    const { id } = req.body
    const invoice: any = await _findInvoiceByID(id);
    if (invoice) {
        if (invoice.status !== "cancel") {
            await _cancleInvoice(id);
            res.status(200).json({ "status": "ok", "message": "ຍົກເລີກສຳເລັດ" });
        } else {

            res.status(200).json({ "status": "error", "message": "ໃບບິນຖືກຍົກເລີກແລ້ວ" });
        }

    } else {
        res.status(200).json({ "status": "error", "message": "ບໍ່ສຳເລັດ id ບໍ່ຖືກ" });
    }

}