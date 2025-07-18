"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
const user_1 = __importDefault(require("./user"));
class Invoice extends sequelize_1.Model {
}
Invoice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cashier_id: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    member_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    cart_type: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_lak: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    total_thb: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    total_unit_lak: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    total_unit_thb: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    total_checkout_lak: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    total_checkout_thb: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    rate: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    m_discount: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    pay_type: {
        type: sequelize_1.DataTypes.STRING
    },
    date_payment: {
        type: sequelize_1.DataTypes.DATE
    },
    date_create: {
        type: sequelize_1.DataTypes.DATE
    },
    money_received: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    money_cash: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: db_1.default,
    tableName: "invoice",
    timestamps: false,
});
exports.default = Invoice;
