import sequelize from "../libs/db";
import { Op, QueryTypes, Sequelize } from "sequelize";
import Product from "../models/product";


export const _getProfit = async (date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
    SELECT 
        SUM(d.total_unit_lak - d.total_lak + i.m_discount) AS total_discount_lak,
        SUM(i.total_checkout_lak) - SUM(d.cost_lak * d.qty) AS total_profit_lak
    FROM invoice i
    JOIN invoicedetail d ON i.id = d.invoice_id
    WHERE i.status = 'completed'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _saleCompleted = async (date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE status = 'completed'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _salePadding = async (date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE status = 'padding'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _saleCancle = async (date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE status = 'cancel'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _warehouse = async () => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT
    SUM(qty_balance) AS total_qty_balance,
    SUM(cost_lak) AS total_cost_lak,
    SUM(cost_thb) AS total_cost_thb,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_products_count,
    SUM(CASE WHEN status = 'block' THEN 1 ELSE 0 END) AS blocked_products_count
FROM
    products;
  `,
        {
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _productAFew = async () => {
    try {
        return await Product.findAll({
            where: {
                qty_balance: {
                    [Op.lte]: Sequelize.col('qty_alert')
                }
            }
        });
    } catch (error) {
        throw error;
    }
}
export const _cashierSaleTotal = async (cashier_id: string, date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
    SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
    FROM invoice
    WHERE status = 'completed' 
        AND cashier_id = '${cashier_id}'
        AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _cashierSaleCash = async (cashier_id: string, date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE pay_type = 'cash' 
    AND status = 'completed' 
    AND cashier_id = '${cashier_id}'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _cashierSaleTransfer = async (cashier_id: string, date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE pay_type = 'transfer' 
    AND status = 'completed' 
    AND cashier_id = '${cashier_id}'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _cashierSalePadding = async (cashier_id: string, date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
        SELECT 
            SUM(total_checkout_lak) AS total,
            COUNT(*) AS bill_count
        FROM invoice
        WHERE status = 'padding' 
            AND cashier_id = '${cashier_id}'
            AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}
export const _cashierSaleCancle = async (cashier_id: string, date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total,
      COUNT(*) AS bill_count
  FROM invoice
  WHERE status = 'cancel' 
    AND cashier_id = '${cashier_id}'
    AND date_create BETWEEN :startDate  AND :endDate 
  `,
        {
            replacements: { startDate: date_start + " 00:00:00", endDate: date_end + " 23:59:59" },
            type: QueryTypes.SELECT
        }
    );
    return results
}