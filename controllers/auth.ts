import { Request, Response } from "express";
import { _finUserByID } from "../services/user";
import { _genToken } from "../services/auth";

export const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        // console.log(req.body)
        if (!username && !password) {
            res.status(401).json({ "status": "error", message: "your request not data" });
            return;
        }
        const user: any = await _finUserByID(username);
        console.log(user)
        if (!user) {
            res.status(401).json({ "status": "error", message: "ບໍ່ພົບຜູ້ໃຊ້" })
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ "status": "error", message: "ລະຫັດຜິດ" })
            return;
        }
        
        const token = await _genToken(user.id,user.username, user.role)
        res.status(200).json({
            token: token,
            username: user.username,
            name: user.name,
            path: user.role
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Login" });
        return;
    }
};
