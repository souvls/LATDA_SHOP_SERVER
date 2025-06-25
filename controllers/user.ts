import { Request, Response } from "express";
import { _createUser, _deleteUser, _findAAllUser, _findAllCashier, _findAllWarehouser, _finUserByID, _updateUser } from "../services/user";

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        const user = await _finUserByID(id as string);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: " ບໍ່ພົບ user" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error find user id" });
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, username, password, name, phone, address, role } = req.body;
        const user = await _finUserByID(id);
        if (!user) {
            const newUser = await _createUser(id, username, password, name, phone, address, '', role);
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: "ມີຜູ້ໃຊ້ແລ້ວ" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user" });
    }
};
export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await _findAAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error get all user" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id, username, password, name, phone, address, role } = req.body;
        const user = await _finUserByID(id);
        if (user) {
            await _updateUser(id, username, password, name, phone, address, role)
            res.status(200).json({ message: " ສຳເລັດ" });
        } else {
            res.status(400).json({ message: " ບໍ່ພົບ user" });
        }

    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error });
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (id) {
            const user = await _finUserByID(id as string);
            if (user) {
                await _deleteUser(id as string);
                res.status(200).json({ message: " ສຳເລັດ" });
            } else {
                res.status(400).json({ message: " ບໍ່ພົບ user" });
            }
        } else {
            res.status(400).json({ message: " Invalid ID" });
        }


    } catch (error) {
        res.status(500).json({ message: error });
    }
}
