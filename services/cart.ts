
import { QueryTypes } from "sequelize";
import sequelize from "../libs/db";
import Cart from "../models/cart";
import CartDetail from "../models/cartdetsil";
import Exchange from "../models/exchang";
import { _getExchange } from "./exchange";
import { _findProductByID } from "./product";
import Product from "../models/product";

const _createCart = async (cashier_id: string, cart_name: number) => {
    try {
        const exchang: any = await _getExchange();
        const cart = await Cart.create({
            cashier_id, cart_type: 0, cart_name,
            total_unit_lak: 0,
            total_unit_thb: 0,
            total_lak: 0,
            total_thb: 0,
            rate: exchang,
            m_discount: 0,
            status: ""
        });
        return cart;
    } catch (error) {
        throw error
    }
}
export const _findCart = async (cashier_id: string, cart_name: number) => {
    try {
        const cart = await Cart.findOne({
            where: { cashier_id: cashier_id, cart_name: cart_name },
            include: [{ model: CartDetail, as: "details" }],
        });
        return cart;
    } catch (error) {
        throw error;
    }
}
const _findCartItem = async (cart_id: number, barcode: string) => {
    try {
        return await CartDetail.findOne({
            where: { cart_id: cart_id, barcode: barcode }
        });
    } catch (error) {
        throw error;
    }
}
const _createCartItem = async (cart_id: number, product: any, qty: number) => {
    try {
        const exchang_rate: any = await _getExchange();
        const item: any = await _findCartItem(cart_id, product.barcode);
        if (!item) {
            const retail_lak = product.retail_lak > 0 ? product.retail_lak : product.retail_thb * exchang_rate;
            // console.log(product.retail_lak);
            // console.log(exchang_rate);
            const discount = (qty + item?.qty || 0) >= product.num_of_discount ? product.discount : 0;
            const total_unit_lak = retail_lak * qty;
            const total_lak = total_unit_lak - (total_unit_lak * discount / 100);

            return await CartDetail.create({
                cart_id: cart_id,
                barcode: product.barcode,
                cost_thb: product.cost_thb,
                cost_lak: product.cost_lak,
                wholesale_lak: product.wholesale_lak,
                wholesale_thb: product.wholesale_thb,
                retail_thb: product.retail_thb,
                retail_lak: retail_lak,
                discount: discount,
                qty: qty,
                total_unit_lak: total_unit_lak,
                total_lak: total_lak
            })
        } else {
            const discount = (qty + item.qty) >= product.num_of_discount ? product.discount : 0;
            const total_unit_lak = item.retail_lak * (qty + item.qty);
            const total_lak = total_unit_lak - (total_unit_lak * discount / 100);
            return await CartDetail.update(
                {
                    qty: qty + item.qty,
                    discount: discount,
                    total_unit_lak: total_unit_lak,
                    total_lak: total_lak
                },
                { where: { cart_id: cart_id, barcode: item.barcode } }
            )
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const _addToCart = async (cashier_id: string, barcode: string, qty: number, cart_name: number) => {
    try {
        const product: any = await _findProductByID(barcode);

        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" }
        }
        if (product.qty_balance <= 0) {
            return { status: "error", message: "ສິນຄ້າເບິດ" }
        }
        if (product.status === "0") {
            return { status: "error", message: "ສິນຄ້າຢຸດຂາຍ" }
        }
        const cart: any = await _findCart(cashier_id, cart_name);

        if (!cart) {
            const newCart: any = await _createCart(cashier_id, cart_name);
            await _createCartItem(newCart.id, product, qty);
        }
        else {
            await _createCartItem(cart.id, product, qty);
            // await _updateCart(cart.id);
        }
        return await _findCart(cashier_id, cart_name);
    } catch (error) {
        throw error;
    }

};
export const _increaseItem = async (cashier_id: string, barcode: string, qty: number, cart_name: number) => {
    try {
        const product: any = await _findProductByID(barcode);
        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" }
        }

        const [cartItem]: any = await sequelize.query(
            `select * from cart as c
            join cartdetail as cdt on c.id = cdt.cart_id
            where c.cashier_id = ${cashier_id} AND c.cart_name = ${cart_name} AND cdt.barcode = ${barcode}
            limit 1
            `,
            { type: QueryTypes.SELECT });
        if (!cartItem) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າໃນກະຕ່າ" }
        }
        if (cartItem.qty + qty > product.qty_balance) {
            return { status: "error", message: "ສິນຄ້າບໍ່ພໍ" }
        }

        const new_qty = cartItem.qty + qty;
        const new_total_unit_lak = cartItem.retail_lak * new_qty;
        const new_discount = new_qty >= product.num_of_discount ? product.discount : 0;
        const new_total_lak = new_total_unit_lak - (new_total_unit_lak * new_discount / 100);

        await sequelize.query(
            `update cartdetail
            set qty = ${new_qty},
            total_unit_lak = ${new_total_unit_lak},
            discount = ${new_discount},
            total_lak = ${new_total_lak}
            where id = ${cartItem.id} and barcode = '${barcode}'`
        )
        return await _findCart(cashier_id, cart_name);
    } catch (error) {
        throw error;
    }
}

export const _decreaseItem = async (cashier_id: string, barcode: string, qty: number, cart_name: number) => {
    try {
        const product: any = await _findProductByID(barcode);
        if (!product) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າ" }
        }

        const [cartItem]: any = await sequelize.query(
            `select * from cart as c
            join cartdetail as cdt on c.id = cdt.cart_id
            where c.cashier_id = ${cashier_id} AND c.cart_name = ${cart_name} AND cdt.barcode = ${barcode}
            limit 1
            `,
            { type: QueryTypes.SELECT });
        if (!cartItem) {
            return { status: "error", message: "ບໍ່ພົບສິນຄ້າໃນກະຕ່າ" }
        }
        if (cartItem.qty - qty <= 0) {
            return { status: "error", message: "ຈຳນວນສິນຄ້າຂັ້ນຕ່ຳແລ້ວ" }
        }

        const new_qty = cartItem.qty - qty;
        const new_total_unit_lak = cartItem.retail_lak * new_qty;
        const new_discount = new_qty >= product.num_of_discount ? product.discount : 0;
        const new_total_lak = new_total_unit_lak - (new_total_unit_lak * new_discount / 100);

        await sequelize.query(
            `update cartdetail
            set qty = ${new_qty},
            total_unit_lak = ${new_total_unit_lak},
            discount = ${new_discount},
            total_lak = ${new_total_lak}
            where id = ${cartItem.id} and barcode = '${barcode}'`
        )
        return await _findCart(cashier_id, cart_name);
    } catch (error) {
        throw error;
    }
}
export const _clearCart = async (cashier_id: string, id: number) => {
    try {
        const deleteCount: any = await Cart.destroy({
            where: { id: id, cashier_id: cashier_id },
        });
        if (deleteCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error
    }
}