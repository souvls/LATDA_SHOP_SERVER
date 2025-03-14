"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
const user_1 = __importDefault(require("./user"));
class Cart extends sequelize_1.Model {
}
Cart.init({
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
    cart_type: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cart_name: {
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
    rate: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    m_discount: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: db_1.default,
    tableName: "cart",
    timestamps: false,
});
// User.hasMany(Cart, { foreignKey: "cashier_id", as: "cashier_id" });
// Cart.belongsTo(User, { foreignKey: "id" });
exports.default = Cart;
