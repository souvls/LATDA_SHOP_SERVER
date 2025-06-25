import sequelize from "../libs/db";
import { QueryTypes } from "sequelize";



export const _saleCompleted = async (date_start: string, date_end: string) => {
    const [results, metadata] = await sequelize.query(
        `
  SELECT 
      SUM(total_checkout_lak) AS total
  FROM invoice
  WHERE status = 'completed'
    AND date_create BETWEEN :startDate AND :endDate
  `,
        {
            replacements: { startDate: date_start, endDate: date_end },
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