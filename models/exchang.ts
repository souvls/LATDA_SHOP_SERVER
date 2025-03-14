import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";

interface ExchangeAttributes {
    id: number;
    rate: number
}

class Exchange extends Model<ExchangeAttributes> { }

Exchange.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rate: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        tableName: "exchange",
        timestamps: false,
    }
);

export default Exchange;
