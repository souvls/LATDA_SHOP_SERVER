"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../libs/db"));
class Exchange extends sequelize_1.Model {
}
Exchange.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rate: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: db_1.default,
    tableName: "exchange",
    timestamps: false,
});
exports.default = Exchange;
