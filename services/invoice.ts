import { Op, where } from "sequelize";
import Cart from "../models/cart";
import Invoice from "../models/invoice"
import InvoiceDetail from "../models/invoicedetail";
import { _checkoutProduct } from "./product";

export const _findInvoiceByID = async (id: number) => {
    try {
        return await Invoice.findByPk(
            id,
            { include: [{ model: InvoiceDetail, as: "details" }], }
        );
    } catch (error) {
        throw error;
    }

}
export const _cancleInvoice = async (id: number) => {
    try {
        const row = await Invoice.update(
            { status: "cancel" },
            { where: { id: id } }
        )
        // console.log(row.length)
        if (row.length == 1) {
            return true
        } else {
            return false
        }

    } catch (error) {

    }
}
export const _findAllInvoice = async (_date_start: string, _date_end: string, _size: number, _page: number) => {
    try {
        const page = (!_page || _page <= 0) ? 1 : _page;
        const size = (!_size || _size <= 0) ? 100 : _size;
        const date_start = _date_start ? _date_start : '2024-01-01'
        const date_end = _date_end ? _date_end : new Date();
        // Chuyển đổi date_start và date_end thành kiểu Date nếu cần

        const invoices = await Invoice.findAndCountAll({
            where: {
                date_create: { [Op.gte]: new Date(date_start), [Op.lte]: new Date(`${date_end}T23:59:59`) }
            },
            limit: size, // Số lượng hóa đơn mỗi trang
            offset: (page - 1) * size, // Tính offset cho phân trang (tính từ trang 1)
            order: [['date_create', 'DESC']], // Sắp xếp theo ngày giảm dần
            include: [{ model: InvoiceDetail, as: "details" }]
        });

        return {
            invoices: invoices.rows, // Dữ liệu hóa đơn
            total: invoices.count, // Tổng số hóa đơn thỏa mãn điều kiện
            totalPages: Math.ceil(invoices.count / size), // Số trang
            currentPage: page, // Trang hiện tại
        };
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw new Error('Unable to fetch invoices');
    }
}
export const _createInvoice = async (cart: any, member_id: string, m_discount: number, pay_type: string) => {
    try {
        //giam so luong
        const currentDate = new Date();
        // Điều chỉnh múi giờ Lào (UTC+7)
        const laoOffset = 7 * 60; // Múi giờ Lào là UTC+7 (7 giờ chênh lệch với UTC)
        const localDate = new Date(currentDate.getTime() + (laoOffset - currentDate.getTimezoneOffset()) * 60000);

        // Chuyển đổi sang định dạng YYYY-MM-DD HH:MM:SS
        const formattedDateTime = localDate.toISOString().slice(0, 19).replace('T', ' ');

        const newInvoice: any = await Invoice.create({
            cashier_id: cart.cashier_id,
            member_id: member_id,
            cart_type: cart.cart_type,
            total_unit_lak: cart.total_unit_lak,
            total_unit_thb: cart.total_unit_thb,
            total_lak: cart.total_lak,
            total_thb: cart.total_lak,
            total_checkout_lak: cart.total_lak - m_discount,
            total_checkout_thb: 0,
            rate: cart.rate,
            m_discount: m_discount,
            pay_type: pay_type,
            date_create: formattedDateTime,
            status: ''
        })
        //
        if (newInvoice) {
            for (const i of cart.details) {
                await _checkoutProduct(i.barcode, i.qty);
                await InvoiceDetail.create({
                    invoice_id: newInvoice.id,
                    barcode: i.barcode,
                    size: i.size,
                    title: i.title,
                    use_for: i.use_for,
                    unit: i.unit,
                    cost_thb: i.cost_thb,
                    cost_lak: i.cost_lak,
                    wholesale_thb: i.wholesale_thb,
                    wholesale_lak: i.wholesale_lak,
                    retail_thb: i.retail_thb,
                    retail_lak: i.retail_lak,
                    discount: i.discount,
                    qty: i.qty,
                    total_unit_lak: i.total_unit_lak,
                    total_lak: i.total_lak
                });
            }
            await Cart.destroy({
                where: { id: cart.id },
            });
            const invoice = await _findInvoiceByID(newInvoice.id);
            return invoice;
        }
    } catch (error) {
        throw error;
    }
}