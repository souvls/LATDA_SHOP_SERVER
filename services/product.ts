import { Op, Sequelize } from "sequelize";
import Product from "../models/product";

interface ProductAttributes {
    barcode: string;
    page: string | null;
    No: string | null;
    code: string | null;
    size: string | null;
    title: string;
    use_for: string | null;
    unit: string;
    category: string;
    cost_thb: number | 0;
    cost_lak: number | 0;
    wholesale_thb: number | 0;
    wholesale_lak: number | 0;
    retail_thb: number | 0;
    retail_lak: number | 0;
    discount: number | 0;
    num_of_discount: number | 0;
    qty_start: number | 0;
    qty_in: number | 0;
    qty_out: number | 0;
    qty_balance: number | 0;
    status: string;
}

export const _insertProduct = async (product: ProductAttributes) => {
    try {
        return await Product.create(product);
    } catch (error) {
        throw error;
    }
}
export const _findProductByID = async (barcode: string) => {
    try {
        return await Product.findByPk(barcode);;
    } catch (error) {
        throw error;
    }
}
export const _findProductByCode = async (code: string) => {
    try {
        return await Product.findAll({
            where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('code')), {
                [Op.like]: code + '%'
            })
        });
    } catch (error) {
        throw error;
    }
}
export const _findProductByTitle = async (title: string) => {
    try {
        return await Product.findAll({
            where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
                [Op.like]: '%' + title + '%'
            })
        });
    } catch (error) {
        throw error;
    }
}
export const _findProductByPage = async (page: string) => {
    try {
        return await Product.findAll({
            where: { page: page }
        });
    } catch (error) {
        throw error;
    }
}
export const _findProductByNo = async (No: string) => {
    try {
        return await Product.findAll({
            where: { No: No }
        });
    } catch (error) {
        throw error;
    }
}