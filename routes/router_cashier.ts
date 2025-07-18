import express from 'express';
import * as controllerProduct from '../controllers/products';
import * as controllerRetail from '../controllers/retail';
import * as controllerExchange from '../controllers/exchange';
import * as controllerCart from '../controllers/cart'
import * as controllerCheckout from '../controllers/checkout'
import * as controllerInvoice from '../controllers/invoice'
import * as controllerReport from '../controllers/report'

const router = express.Router();

router.get("/exchange", controllerExchange.getExcahnge)
router.get("/productid", controllerProduct.findProductByID);
router.get("/productcode", controllerProduct.findProductByCode);
router.get("/producttitle", controllerProduct.findProductByTitle);
router.get("/productpage", controllerProduct.findProductByPage);
router.get("/productno", controllerProduct.findProductByNo);

router.get("/findretail", controllerRetail.findProductRetail);

//cart
router.post("/addtocart", controllerCart.addToCart)
router.post("/cart/increase", controllerCart.increaseItem);
router.post("/cart/decrease", controllerCart.decreaseItem);
router.delete("/cart/clear", controllerCart.clearCart);
router.get("/cart", controllerCart.findCartName);
router.post("/checkout/retail", controllerCheckout.retailCart);
router.delete("/cart/delete", controllerCart.removeProductFromCart);

//invoice 
router.get("/report-sale", controllerReport.GetCashierReportSale)
router.get("/invoices", controllerInvoice.findAllInvoiceCashier)
router.get("/invoice", controllerInvoice.findInvoiceByID)
router.delete("/invoice/cancel", controllerInvoice.cancleInvoiceCashier)

export default router;