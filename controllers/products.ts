import { Request, Response } from "express";
import { _addProduct, _deleteProduct, _findAllProduct, _findProductByAlertQty, _findProductByCode, _findProductByID, _findProductByIDMath, _findProductByNo, _findProductByPage, _findProductByTitle, _increaseProduct, _insertProduct, _resetQty, _updateIMGProduct, _updateProduct } from "../services/product";
import { _removeIMG } from "../services/image";
import { v4 as uuidv4 } from 'uuid';
import { deleteImageFromS3, uploadImageToS3 } from "../services/aws_s3";


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
        // status
    } = req.body;

    try {
        // if (!barcode) { return res.status(500).json({ error: "vilid barcodeF" }); }
        const product = await _findProductByID(barcode);
        if (!product) {
            const file: any = req.file;
            const fileExtension = file.originalname.split('.').pop();
            const uniqueFileName = `${uuidv4()}.${fileExtension}`;
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
                img_name: uniqueFileName || null,
                status: 'active'
            });
            if (file) {
                const upload = await uploadImageToS3(file, uniqueFileName);
                if (upload) {
                    res.status(201).json({ "status": "success", "message": "ເພີ່ມສຳເລັດ", data: newProduct });
                } else {
                    res.status(500).send('Failed to upload image.');
                }
            }

        } else {
            res.status(200).json({ "status": "error", "message": "ມີສິນຄ້າແລ້ວ" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error });
    }
};
export const increaseProduct = async (req: Request, res: Response) => {
    try {
        const { barcode, qty } = req.body
        if (!barcode || !qty) {
            res.status(400).json({ status: "error", message: "Invalid barcode" });
        } else {
            const product = await _findProductByID(barcode);
            if (product) {
                const update = await _increaseProduct(barcode, qty);
                if (update) {
                    res.status(200).json({ status: "success" });
                }
            } else {
                res.status(400).json({ status: "error", message: "barcode not exits" });
            }

        }

    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to delete product", error });
    }
}
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
                    await deleteImageFromS3(product.img_name);
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
    if (typeof barcode === "string" && barcode) {
        const product: any = await _findProductByID(barcode);
        if (product) {
            if (req.file?.filename !== null) {
                const file: any = req.file;
                try {
                    if (product.img_name) {
                        await uploadImageToS3(file, product.img_name);
                    } else {
                        const fileExtension = file.originalname.split('.').pop();
                        const uniqueFileName = `${uuidv4()}.${fileExtension}`;
                        await uploadImageToS3(file, uniqueFileName);
                        await _updateIMGProduct(product.barcode, uniqueFileName);
                    }
                    res.status(200).json({ status: "success", message: "ອັບເດດສຳເລັດ" });
                } catch (error) {
                    res.status(400).json({ status: "no", message: error });
                }
            } else {
                res.status(400).json({ status: "error", message: "invilad img" });

            }
        } else {
            res.status(400).json({ status: "error", message: "ບໍ່ພົນສິນຄ້າ" });
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
            res.status(200).json(null);
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
export const findProduct = async (req: Request, res: Response) => {
    const { barcode, title, code, page, No, qty } = req.query;
    try {
        const products = [];

        if (barcode) {
            const pd = await _findProductByIDMath(barcode as string);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (title) {
            const pd = await _findProductByTitle(title as string);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (code) {
            const pd = await _findProductByCode(code as string);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (page) {
            const pd = await _findProductByPage(page as string)
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (No) {
            const pd = await _findProductByNo(No as string);
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        if (qty) {
            const pd = await _findProductByAlertQty(Number(qty));
            if (pd && pd.length > 0) {
                products.push(...pd);
            }
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const resetQty = async (req: Request, res: Response) => {
    try {
        const update = await _resetQty()
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: error });

    }
}


