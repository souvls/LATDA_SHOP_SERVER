import { Op } from "sequelize";
import User from "../models/user";

export const _finUserByID = async (id: string) => {
    return await User.findByPk(id);
}
export const _createUser = async (id: string, username: string, password: string, name: string, phone: string, address: string, avatar: string, role: number) => {
    return await User.create({ id, username, password, name, phone, address, avatar, role });
};
export const _findAllWarehouser = async () => {
    try {
        const users = await User.findAll({
            where: {
                role: 1
            }
        })
        return users;
    } catch (error) {
        throw error
    }
}
export const _findAllCashier = async () => {
    try {
        const users = await User.findAll({
            where: {
                role: 2
            }
        })
        return users;
    } catch (error) {
        throw error
    }
}
export const _findAAllUser = async () => {
    try {
        const users = await User.findAll({
            where: {
                role: { [Op.ne]: 0 } // role khác 0
            },
            order: [['role', 'ASC']]
        })
        return users;
    } catch (error) {
        throw error
    }
}
export const _updateUser = async (id: string, username: string, password: string, name: string, phone: string, address: string, role: number) => {
    try {
        const update = await User.update(
            {
                username: username,
                password: password,
                name: name,
                phone: phone,
                address: address,
                role: role
            },
            {
                where: { id: id }
            }
        )
        return update
    } catch (error) {
        throw error
    }
}
export const _deleteUser = async (id: string) => {
    try {
        await User.destroy({
            where: {
                id: id
            }
        });
        return true;
    } catch (error) {
        throw error
    }
}
// username: string;
//     password: string;
//     name: string;
//     phone: string;
//     address: string;
//     avatar: string,
//     role: number