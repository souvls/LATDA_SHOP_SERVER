import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_URL || "", // Password
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

export default sequelize;
