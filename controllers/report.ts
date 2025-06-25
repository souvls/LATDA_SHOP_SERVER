import { Request, Response } from "express";
import { _saleCompleted } from "../services/report";

export const SaleReport = async (req: Request, res: Response) => {
    const { date_start, date_end } = req.query

    const saleCompleted: any = await _saleCompleted(date_start as string, date_end as string);
    res.status(200).json({
        saleCompleted: { total: saleCompleted?.total },
    });
}