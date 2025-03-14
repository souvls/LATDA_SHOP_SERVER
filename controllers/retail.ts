import { Request, Response } from "express";
import { _findProductByID } from "../services/product";

export const findProductRetail = async (req: Request, res: Response) => {
    const { barcode } = req.query;
    try {
        const product: any = await _findProductByID(barcode as string);
        if (product) {
            if (product.status !== "0") {
                if (product.qty_balance > 0) {
                    res.status(200).json(product);
                } else {
                    res.status(202).json({ message: "ສິນຄ້າໝົດ" })
                }
            } else {
                res.status(202).json({ message: "ຍົກເລີກການຂາຍສິນຄ້ານີ້" })
            }

        } else {
            res.status(202).json({ message: "ບໍ່ພົບ ສິນຄ້າ" })
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};