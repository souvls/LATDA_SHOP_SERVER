import { Request, Response } from "express";
import { _retail } from "../services/checkout";
export const retailCart = async (req: Request, res: Response) => {
    try {
        const { cart_name, m_discount,member_id,pay_type } = req.body
        if (!cart_name && m_discount >= 0) {
            res.status(200).json({ "status": "error", message: "cart_name is required" })
        }
        const result = await _retail((req as any).userid, cart_name,m_discount,pay_type,member_id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error });
    }
}