import { Request, Response } from "express";
import { _cashierSaleCancle, _cashierSaleCash, _cashierSalePadding, _cashierSaleTotal, _cashierSaleTransfer, _getProfit, _productAFew, _saleCancle, _saleCompleted, _salePadding, _warehouse } from "../services/report";
import { _findAllInvoiceDebt } from "../services/invoice";

export const GetReportSale = async (req: Request, res: Response) => {
    const { date_start, date_end } = req.query
    const profit = await _getProfit(date_start as string, date_end as string);
    const saleCompleted: any = await _saleCompleted(date_start as string, date_end as string);
    const saleDebt: any = await _salePadding(date_start as string, date_end as string);
    const saleCancle: any = await _saleCancle(date_start as string, date_end as string);
    const invoice_debt = await _findAllInvoiceDebt(date_start as string, date_end as string);

    res.status(200).json({
        detail: { profit, saleCompleted, saleDebt, saleCancle },
        invoice_debt: invoice_debt
    });
}
export const GetReportProduct = async (req: Request, res: Response) => {
    const warehouse = await _warehouse();
    const productalert = await _productAFew();
    res.status(200).json({ warehouse, productalert });

}
export const GetCashierReportSale = async (req: Request, res: Response) => {
    const { date_start, date_end } = req.query
    const totalSale: any = await _cashierSaleTotal((req as any).userid, date_start as string, date_end as string);
    const saleCash: any = await _cashierSaleCash((req as any).userid, date_start as string, date_end as string);
    const saleTransfer: any = await _cashierSaleTransfer((req as any).userid, date_start as string, date_end as string);
    const saleDebt: any = await _cashierSalePadding((req as any).userid, date_start as string, date_end as string);
    const saleCancle: any = await _cashierSaleCancle((req as any).userid, date_start as string, date_end as string);

    res.status(200).json({
       totalSale,saleCash,saleTransfer, saleDebt, saleCancle
    });
}