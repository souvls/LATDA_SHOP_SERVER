import { _findCart } from "./cart";
import { _createInvoice } from "./invoice";
import { _checkoutProduct } from "./product";
export const _retail = async (cashier_id: string, cart_name: number, m_discount: number, pay_type: string, member_id: string) => {
    try {
        const cart: any = await _findCart(cashier_id, cart_name);
        if (!cart) {
            return { status: "error", message: "ບໍ່ພົບກະຕ່າ" }
        }

        const invoice = await _createInvoice(cart, member_id, m_discount, pay_type);
        if(invoice){
            return invoice;
        }else{
            return false;
        }
    } catch (error) {

    }
}