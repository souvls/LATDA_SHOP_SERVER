import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";
import Invoice from "./invoice";

interface Attributes {
    invoice_id: number,
    barcode: string;
    size: string | "",
    title: string,
    use_for: string | "",
    unit: string,
    cost_thb: number | 0;
    cost_lak: number | 0;
    wholesale_thb: number | 0;
    wholesale_lak: number | 0;
    retail_thb: number | 0;
    retail_lak: number | 0;
    discount: number | 0;
    qty: number | 0;
    total_unit_lak: number | 0;
    total_lak: number | 0;
}

class InvoiceDetail extends Model<Attributes> { }

InvoiceDetail.init(
    {
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Invoice,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        barcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: { type: DataTypes.STRING, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },
        use_for: { type: DataTypes.STRING, allowNull: true },
        unit: { type: DataTypes.STRING, allowNull: true },
        cost_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        cost_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        wholesale_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        wholesale_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        retail_thb: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        retail_lak: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        discount: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        qty: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        total_unit_lak: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        total_lak: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

    },
    {
        sequelize,
        tableName: "invoicedetail",
        timestamps: false,
    }
);
// Thiết lập quan hệ
Invoice.hasMany(InvoiceDetail, { foreignKey: "invoice_id", as: "details" });
InvoiceDetail.belongsTo(Invoice, { foreignKey: "invoice_id" });


export default InvoiceDetail;
