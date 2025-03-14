import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";

interface UserAttributes {
    id: string;
    username: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    avatar: string;
    role: number;
}

class User extends Model<UserAttributes> { }

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: { type: DataTypes.STRING, allowNull: false, },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        avatar: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false,
    }
);

export default User;
