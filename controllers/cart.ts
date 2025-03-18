import { Request, Response } from "express";
import { _addToCart } from "../services/cart";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { barcode, qty, cart_name } = req.body
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" })
            return;
        }
        // console.log(req)
        const cart = await _addToCart((req as any).userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};