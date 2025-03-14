import User from "../models/user";
import Role from "../models/role";

export const _finUserByID = async (id: string) => {
    return await User.findByPk(id);
}
export const _createUser = async (id: string, username: string, password: string, name: string, phone: string, address: string, avatar: string, role: number) => {
    return await User.create({ id, username, password, name, phone, address, avatar, role });
};
// username: string;
//     password: string;
//     name: string;
//     phone: string;
//     address: string;
//     avatar: string,
//     role: number