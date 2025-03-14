import { Request, Response } from "express";
import { _findProductByCode, _findProductByID, _findProductByNo, _findProductByPage, _findProductByTitle, _insertProduct } from "../services/product";
import Product from "../models/product";
import pd from "../libs/data/product.json"
export const AddProduct = async (req: Request, res: Response) => {
    // const { id, username, password, name, phone, address, avatar, role } = req.body;
    for(const i of pd){
        await Product.create({
            barcode: i.barcode,
            page: i.page,
            No: i.No,
            code: i.code,
            size: i.size,
            title: i.title,
            use_for: i.use_for,
            unit: i.unit,
            category: i.category,
            cost_thb: Number(i.cost_thb),
            cost_lak:Number(i.cost_lak),
            wholesale_thb: Number(i.wholesale_thb),
            wholesale_lak: Number(i.wholesale_lak),
            retail_thb: Number(i.retail_thb),
            retail_lak: Number(i.retail_lak),
            discount: Number(i.discount),
            num_of_discount: Number(i.num_of_discount),
            qty_start: Number(i.qty_start),
            qty_in: Number(i.qty_in),
            qty_out:Number(i.qty_out),
            qty_balance: Number(i.qty_balance),
            status: ""
        })
    }
    res.status(201).json();
};

export const findProductByID = async (req: Request, res: Response) => {
    const { barcode } = req.query;
    try {
        const product = await _findProductByID(barcode as string);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const findProductByCode = async (req: Request, res: Response) => {
    const { code } = req.query;
    try {
        const product = await _findProductByCode(code as string);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const findProductByTitle = async (req: Request, res: Response) => {
    const { title } = req.query;
    try {
        const product = await _findProductByTitle(title as string);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const findProductByPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    try {
        const product = await _findProductByPage(page as string);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const findProductByNo = async (req: Request, res: Response) => {
    const { No } = req.query;
    try {
        const product = await _findProductByNo(No as string);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

