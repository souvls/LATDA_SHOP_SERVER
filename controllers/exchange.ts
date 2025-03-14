import { Request, Response } from "express";
import { _getExchange } from "../services/exchange";
export const getExcahnge = async (req: Request, res: Response) => {
    try {
        const exchange = await _getExchange();
        res.status(200).json(exchange);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};