import { Request, Response } from "express";
import { _saleCancle, _saleCompleted, _salePadding, _warehouse } from "../services/report";

export const SaleReport = async (req: Request, res: Response) => {
    const { date_start, date_end } = req.query

    const saleCompleted: any = await _saleCompleted(date_start as string, date_end as string);
    const salePadding: any = await _salePadding(date_start as string, date_end as string);
    const saleCancle: any = await _saleCancle(date_start as string, date_end as string);


    res.status(200).json({
        saleCompleted, salePadding, saleCancle
    });
}
export const GetWarehouse = async (req: Request, res: Response) =>{
    const warehouse = await _warehouse();
     res.status(200).json(warehouse);

}