import { Request, Response } from "express";
import { _addProduct, _deleteProduct, _findAllProduct, _findProductByCode, _findProductByID, _findProductByNo, _findProductByPage, _findProductByTitle, _insertProduct, _updateIMGProduct, _updateProduct } from "../services/product";
import path from "path";
import fs from 'fs';
import { _removeIMG } from "../services/image";

export const addProduct = async (req: Request, res: Response) => {
    const {
        barcode,
        page,
        No,
        code,
        size,
        title,
        use_for,
        brand,
        unit,
        category,
        cost_thb,
        cost_lak,
        wholesale_thb,
        wholesale_lak,
        retail_thb,
        retail_lak,
        discount,
        num_of_discount,
        qty_start,
        qty_in,
        qty_out,
        qty_balance,
        qty_alert,
        supplier,
        status
    } = req.body;

    try {
        // if (!barcode) { return res.status(500).json({ error: "vilid barcodeF" }); }
        const product = await _findProductByID(barcode);
        if (!product) {
            const newProduct = await _addProduct({
                barcode,
                page,
                No,
                code,
                size,
                title,
                use_for,
                brand,
                unit,
                category,
                cost_thb,
                cost_lak,
                wholesale_thb,
                wholesale_lak,
                retail_thb,
                retail_lak,
                discount,
                num_of_discount,
                qty_start,
                qty_in,
                qty_out,
                qty_balance,
                qty_alert,
                supplier,
                img_name: req.file?.filename || null,
                status
            });
            res.status(201).json({ "status": "success", "message": "ເພີ່ມສຳເລັດ", data: newProduct });
        } else {
            res.status(200).json({ "status": "error", "message": "ມີສິນຄ້າແລ້ວ" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { barcode } = req.query;
    if (typeof barcode === "string" && barcode) {
        try {
            const product: any = await _findProductByID(barcode);
            if (product) {
                //delete product
                const result = await _deleteProduct(barcode);

                //delete img
                if (product.img_name) {
                    _removeIMG(product.img_name);
                }
                res.status(200).json({ status: "success", message: "ລົບສຳເລັດ", data: result });
            } else {
                res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
            }

        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to delete product", error });
        }
    } else {
        res.status(400).json({ status: "error", message: "Invalid or missing barcode" });
    }
}
export const updateIMGProduct = async (req: Request, res: Response) => {
    const { barcode } = req.query
    const img_name = req.file?.filename || null;
    if (typeof barcode === "string" && barcode) {
        const product: any = await _findProductByID(barcode);
        if (product) {
            const update = await _updateIMGProduct(barcode, img_name);
            if (req.file?.filename !== null) {
                if (product.img_name) {
                    _removeIMG(product.img_name)
                }
            };
            res.status(200).json({ status: "success", message: "ອັບເດດສຳເລັດ", data: update });
        } else {
            res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
        }
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    const { barcode } = req.query
    if (typeof barcode === "string" && barcode) {
        const product: any = await _findProductByID(barcode);
        if (product) {
            console.log(req.body)
            const update = await _updateProduct(barcode, req.body);
            res.status(200).json({ status: "success", message: "ອັບເດດສຳເລັດ", data: update });
        } else {
            res.status(200).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ", data: [] });
        }
    }


}
export const getAllProduct = async (req: Request, res: Response) => {
    const { size, page } = req.query;
    const products = await _findAllProduct(Number(size), Number(page))
    if (products) {
        res.status(200).json(products);
    }
}
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

