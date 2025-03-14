"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
const cart_1 = __importDefault(require("./cart"));
const product_1 = __importDefault(require("./product"));
class CartDetail extends sequelize_1.Model {
}
CartDetail.init({
    cart_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: cart_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: product_1.default,
            key: "barcode",
        },
    },
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
    tableName: "cartdetail",
    timestamps: false,
});
// Thiết lập quan hệ
cart_1.default.hasMany(CartDetail, { foreignKey: "cart_id", as: "details" });
CartDetail.belongsTo(cart_1.default, { foreignKey: "cart_id" });
// CartDetail.belongsTo(Cart, { foreignKey: "cart_id" });
exports.default = CartDetail;
