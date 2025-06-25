import { Request, Response } from "express";

export const Dashboard = async (req: Request, res: Response) => {
    res.status(200).json({});
}