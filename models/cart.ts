import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db";
import CartDetail from "./cartdetsil";
import User from "./user";

interface CartAttributes {
    id: number | null;
    cashier_id: string,
    cart_type: number,
    cart_name: number,
    total_unit_lak: number | 0,
    total_unit_thb: number | 0,
    total_lak: number | 0,
    total_thb: number | 0,
    rate: number | 0,
    m_discount: number | 0,
    status: string | '',
}

class Cart extends Model<CartAttributes> { }

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cashier_id: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: "id",
            },
        },
        cart_type: {
            type: DataTypes.INTEGER,
        },
        cart_name: {
            type: DataTypes.INTEGER,
        },
        total_lak: {
            type: DataTypes.DOUBLE
        },
        total_thb: {
            type: DataTypes.DOUBLE
        },
        total_unit_lak: {
            type: DataTypes.DOUBLE
        },
        total_unit_thb: {
            type: DataTypes.DOUBLE
        },
        rate: {
            type: DataTypes.DOUBLE,
        },
        m_discount: {
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName: "cart",
        timestamps: false,
    }
);

// User.hasMany(Cart, { foreignKey: "cashier_id", as: "cashier_id" });
// Cart.belongsTo(User, { foreignKey: "id" });
export default Cart;
