import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './libs/db';
import router from "./routes/route";
//use file .env
dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error("❌ Unable to connect to database:", error);
    }
};
connectDB();
// ใช้ Route
app.use("/api", router);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 'stattus': 'ok', 'message': 'welcome to latdashop-api' });
});
// ====> Run server
app.listen(process.env.PORT, () => {
    console.log('start server:' + ' http://localhost:' + process.env.PORT);
});