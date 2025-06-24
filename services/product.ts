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
  brand: string | null;
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
  qty_alert: number | 0;
  supplier: string | null;
  img_name: string | null;
  status: string;
}
interface ProductUpdateAttributes {
  page: string | null;
  No: string | null;
  code: string | null;
  size: string | null;
  title: string;
  use_for: string | null;
  brand: string | null;
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
  qty_alert: number | 0;
  supplier: string | null;
  status: string;
}

export const _addProduct = async (product: ProductAttributes) => {
  try {
    const existingProduct = await Product.findByPk(product.barcode);
    if (existingProduct) {
      throw new Error("Product with this barcode already exists.");
    }
    return await Product.create(product);
  } catch (error) {
    throw error;
  }
};
export const _updateProduct = async (
  barcode: string,
  updateFields: ProductUpdateAttributes
) => {
  const update = await Product.update(updateFields, { where: { barcode } });
  return update;
};
export const _updateIMGProduct = async (barcode: string, filename: any) => {
  const update = await Product.update(
    { img_name: filename },
    { where: { barcode } }
  );
  return update;
};
export const _deleteProduct = async (barcode: string) => {
  try {
    const result = await Product.destroy({
      where: {
        barcode: barcode,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export const _findAllProduct = async (_size: number, _page: number) => {
  try {
    const page = !_page || _page <= 0 ? 1 : _page;
    const size = !_size || _size <= 0 ? 100 : _size;

    const products = await Product.findAndCountAll({
      limit: size, // Số lượng hóa đơn mỗi trang
      offset: (page - 1) * size, // Tính offset cho phân trang (tính từ trang 1)
      // order: [['date_create', 'DESC']], // Sắp xếp theo ngày giảm dần
      // include: [{ model: , as: "details" }]
    });
    // console.log(products)
    return {
      products: products.rows, // Dữ liệu hóa đơn
      total: products.count, // Tổng số hóa đơn thỏa mãn điều kiện
      totalPages: Math.ceil(products.count / size), // Số trang
      currentPage: page, // Trang hiện tại
    };
  } catch (error) {
    throw error;
  }
};
export const _insertProduct = async (product: ProductAttributes) => {
  try {
    return await Product.create(product);
  } catch (error) {
    throw error;
  }
};
export const _findProductByID = async (barcode: string) => {
  try {
    return await Product.findByPk(barcode);
  } catch (error) {
    throw error;
  }
};
export const _findProductByCode = async (code: string) => {
  try {
    return await Product.findAll({
      where: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("code")), {
        [Op.like]: code + "%",
      }),
    });
  } catch (error) {
    throw error;
  }
};
export const _findProductByTitle = async (title: string) => {
  try {
    return await Product.findAll({
      where: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("title")), {
        [Op.like]: "%" + title + "%",
      }),
    });
  } catch (error) {
    throw error;
  }
};
export const _findProductByPage = async (page: string) => {
  try {
    return await Product.findAll({
      where: { page: page },
    });
  } catch (error) {
    throw error;
  }
};
export const _findProductByNo = async (No: string) => {
  try {
    return await Product.findAll({
      where: { No: No },
    });
  } catch (error) {
    throw error;
  }
};
export const _checkoutProduct = async (barcode: string, qty: number) => {
  try {
    const product: any = await _findProductByID(barcode);
    await Product.update(
      {
        qty_out: product.qty_out + qty,
        qty_balance:
          product.qty_start + product.qty_in - (product.qty_out + qty),
      },
      { where: { barcode: barcode } }
    );
  } catch (error) {
    throw error;
  }
};
