import { Request, Response } from "express";
import { _createUser } from "../services/user";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, username, password, name, phone, address, avatar, role } = req.body;
        const newUser = await _createUser(id, username, password, name, phone, address, avatar, role);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user" });
    }
};
