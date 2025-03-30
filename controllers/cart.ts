import { Request, Response } from "express";
import { _addToCart, _clearCart, _decreaseItem, _findCart, _increaseItem } from "../services/cart";

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

export const increaseItem = async (req: Request, res: Response) => {
    try {
        const { barcode, qty, cart_name } = req.body
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" })
            return;;
        }
        const cart = await _increaseItem((req as any).userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const decreaseItem = async (req: Request, res: Response) => {
    try {
        const { barcode, qty, cart_name } = req.body
        if (!barcode && !qty && !cart_name) {
            res.status(401).json({ "status": "error", message: "request not data" })
            return;;
        }
        const cart = await _decreaseItem((req as any).userid, barcode.trim(), qty, cart_name);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const clearCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        if (!id) {
            res.status(200).json({ "status": "error", message: `id is required` })
        }
        const clearCart = await _clearCart((req as any).userid, Number(id));
        if (clearCart) {
            res.status(200).json({ "status": "ok", message: `clear cart is ${clearCart}` })
        } else {
            res.status(200).json({ "status": "error", message: `do not have your cart id` })
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
export const findCartName = async (req: Request, res: Response) => {
    try {
        const { cart_name } = req.query
        if (!cart_name) {
            res.status(200).json({ "status": "error", message: "cart_name is required" })
        }
        const cart = await _findCart((req as any).userid, Number(cart_name));
        if (cart) {
            res.status(200).json(cart)
        }else{
            res.status(200).json({ "status": "error", message: cart })
        }
        // const clearCart = await _clearCart((req as any).userid, Number(id));
        //res.status(200).json({ "status": "ok", message: `clear cart is ${clearCart}` })
    } catch (error) {
        res.status(500).json({ error: error });
    }
}