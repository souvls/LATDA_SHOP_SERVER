"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL || "", // Password
{
    dialect: "mysql", // Sử dụng MySQL
    logging: true, // Tắt log SQL trong console
    dialectOptions: {
        connectTimeout: 60000 // เพิ่ม timeout 60 วินาที
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 60000, // 60 วินาที
        idle: 10000 // 10 วินาที
    }
});
// const sequelize = new Sequelize('latda_shop', 'root', '', {
//   host: 'localhost', // Change if using a remote server
//   dialect: 'mysql',
//   logging: false, // Set to true to see SQL queries in console
// });
exports.default = sequelize;
