import express from 'express';
import * as controllerProduct from '../controllers/products';
import * as controllerRetail from '../controllers/retail';
import * as controllerExchange from '../controllers/exchange';
import * as controllerCart from '../controllers/cart'
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


export default router;