import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";

interface RoleAttributes {
    id: number;
    title: number
}

class Role extends Model<RoleAttributes> { }

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName: "role",
        timestamps: false,
    }
);

export default Role;
