"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false, },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    address: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    avatar: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    role: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: db_1.default,
    tableName: "users",
    timestamps: false,
});
exports.default = User;
