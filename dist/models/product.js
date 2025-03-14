"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
class Product extends sequelize_1.Model {
}
Product.init({
    barcode: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    page: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    No: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    code: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    size: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    use_for: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    unit: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    cost_thb: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    cost_lak: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    wholesale_thb: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    wholesale_lak: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    retail_thb: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    retail_lak: { type: sequelize_1.DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    discount: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    num_of_discount: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    qty_start: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    qty_in: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    qty_out: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    qty_balance: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    status: { type: sequelize_1.DataTypes.STRING, allowNull: true },
}, {
    sequelize: db_1.default,
    tableName: "products",
    timestamps: false,
});
exports.default = Product;
