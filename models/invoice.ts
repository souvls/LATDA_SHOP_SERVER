import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";
import User from "./user";

interface Attributes {
    id: number | null;
    cashier_id: string,
    member_id: string | null,
    cart_type: number,
    total_unit_lak: number | 0,
    total_unit_thb: number | 0,
    total_lak: number | 0,
    total_thb: number | 0,
    total_checkout_lak: number | 0,
    total_checkout_thb: number | 0
    rate: number | 0,
    m_discount: number | 0,
    pay_type: string,
    date_create: string,
    date_payment: string | "",
    money_received: number,
    money_cash: number,
    status: string | '',
}
class Invoice extends Model<Attributes> { }

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cashier_id: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: "id",
            },
        },
        member_id: {
            type: DataTypes.STRING,
        },
        cart_type: {
            type: DataTypes.INTEGER,
        },
        total_lak: {
            type: DataTypes.DOUBLE
        },
        total_thb: {
            type: DataTypes.DOUBLE
        },
        total_unit_lak: {
            type: DataTypes.DOUBLE
        },
        total_unit_thb: {
            type: DataTypes.DOUBLE
        },
        total_checkout_lak: {
            type: DataTypes.DOUBLE
        },
        total_checkout_thb: {
            type: DataTypes.DOUBLE
        },
        rate: {
            type: DataTypes.DOUBLE,
        },
        m_discount: {
            type: DataTypes.DOUBLE
        },
        pay_type: {
            type: DataTypes.STRING
        },
        date_payment: {
            type: DataTypes.DATE
        },
        date_create: {
            type: DataTypes.DATE
        },
        money_received: {
            type: DataTypes.DOUBLE
        },
        money_cash: {
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName: "invoice",
        timestamps: false,
    }
);
export default Invoice;