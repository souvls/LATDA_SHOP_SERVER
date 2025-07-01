import sequelize from "../libs/db";
import { QueryTypes } from "sequelize";



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
  WHERE status = 'cancle'
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

// SELECT
//     SUM(i.total_checkout_lak) AS total_sales,
//     SUM(d.qty) AS total_units
// FROM invoice i
// JOIN invoicedetail d ON d.invoice_id = i.id
// WHERE i.status = 'completed'
//   AND i.date_create BETWEEN '2025-06-23' AND '2025-06-24'