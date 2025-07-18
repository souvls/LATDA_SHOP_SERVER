import { Request, Response } from "express";
import { _getExchange, _updateExchange } from "../services/exchange";
export const getExcahnge = async (req: Request, res: Response) => {
    try {
        const exchange = await _getExchange();
        res.status(200).json({ rate: exchange });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const updateExcahnge = async (req: Request, res: Response) => {
    try {
        const { newRate } = req.body
        if (!newRate || newRate < 0) {
            res.status(400).json({ "status": "error", "message": "wrong rate" });
            return;
        }
        const update = await _updateExchange(newRate)
        res.status(200).json({ newRate: update });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}