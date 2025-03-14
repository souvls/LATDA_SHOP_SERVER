import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";

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
class Product extends Model<ProductAttributes> { }

Product.init(
    {
        barcode: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        page: { type: DataTypes.STRING, allowNull: true },
        No: { type: DataTypes.STRING, allowNull: true },
        code: { type: DataTypes.STRING, allowNull: true },
        size: { type: DataTypes.STRING, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },
        use_for: { type: DataTypes.STRING, allowNull: true },
        unit: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        cost_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        cost_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        wholesale_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        wholesale_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        retail_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        retail_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        discount:{ type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        num_of_discount:{ type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        qty_start: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        qty_in: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        qty_out: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        qty_balance: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        status: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: false,
    }
);

export default Product;
