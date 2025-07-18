import { Request, Response } from "express";
import { _retail } from "../services/checkout";
export const retailCart = async (req: Request, res: Response) => {
    try {
        const { cart_name, m_discount, member_id, pay_type, money_received } = req.body
        console.log(req.body);
        var errors = "";
        var m_received = money_received;
        if (!cart_name) {
            errors += " cart_name is required";
        }
        if (!pay_type) {
            errors += " ປະເພດຈ່າຍ ບໍ່ຖືກຕ້ອງ";
        }
        if(pay_type === "debt"){
            m_received = 0;
        }
        if (money_received === undefined || money_received === null || money_received < 0) {
            errors += " ເງິນຮັບມາບໍ່ຖືກຕ້ອງ"
        }
        if (errors.length > 0) {
            res.status(400).json({ "status": "error", message: errors });
            return;
        }
        const result: any = await _retail((req as any).userid, cart_name, m_discount, pay_type, member_id, m_received);
        if (result.status !== "error") {
            res.status(200).json(result);
            return;
        } else {
            res.status(400).json(result);
            return;
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
}