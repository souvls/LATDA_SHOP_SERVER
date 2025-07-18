"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
const invoice_1 = __importDefault(require("./invoice"));
class InvoiceDetail extends sequelize_1.Model {
}
InvoiceDetail.init({
    invoice_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: invoice_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
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
    qty: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    total_unit_lak: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    total_lak: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
}, {
    sequelize: db_1.default,
    tableName: "invoicedetail",
    timestamps: false,
});
// Thiết lập quan hệ
invoice_1.default.hasMany(InvoiceDetail, { foreignKey: "invoice_id", as: "details" });
InvoiceDetail.belongsTo(invoice_1.default, { foreignKey: "invoice_id" });
exports.default = InvoiceDetail;
