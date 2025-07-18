import { _findCart } from "./cart";
import { _createInvoice } from "./invoice";
import { _checkoutProduct } from "./product";
export const _retail = async (cashier_id: string, cart_name: number, m_discount: number, pay_type: string, member_id: string, money_received: number) => {
    try {
        const cart: any = await _findCart(cashier_id, cart_name);
        if (!cart) {
            return { status: "error", message: "ບໍ່ພົບກະຕ່າ" }
        }
        if (pay_type != "debt") {
            if ((cart.total_lak - m_discount) > money_received) {
                console.log("total",cart.total_lak)
                return { "status": "error", message: "ເງິນຮັບມານ້ອຍກວ່າລາຄາສິນຄ້າ" };
            }
        }
        if (m_discount > cart.total_lak) {
            return { "status": "error", message: "ຈຳນວນຫຼຸດ ຫຼາຍກວ່າ ລາຄາສິນຄ້າ" };
        }
        const invoice = await _createInvoice(cart, member_id, m_discount, pay_type, money_received);
        if (invoice) {
            return invoice;
        } else {
            return false;
        }
    } catch (error) {

    }
}