import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: () => void): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // คาดหวังรูปแบบ "Bearer <token>"

    if (!token) {
        res.status(401).json({
            status: 'error',
            message: 'no token',
        });
        return;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
        (req as any).username = decoded.username;
        (req as any).role = decoded.role;
        next();
    } catch (error) {
        res.status(403).json({
            status: 'error',
            message: 'wrong token',
        });
    }
};

export const authenticateAdmin = (req: Request, res: Response, next: () => void) => {
    if ((req as any).role !== 1) {
        res.status(401).json({
            status: 'error',
            message: 'no token',
        });
        return
    }
    next();

}
export const authenticateCashier = (req: Request, res: Response, next: () => void) => {
    if ((req as any).role !== 2) {
        res.status(401).json({
            status: 'error',
            message: 'you not cashier',
        });
        return;
    }
    next();

}