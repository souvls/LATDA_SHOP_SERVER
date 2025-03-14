import express, { Request, Response } from 'express';
import * as controllerProduct from '../controllers/products';

const router = express.Router();

router.get("/addproduct", controllerProduct.AddProduct);
router.get("/productid", controllerProduct.findProductByID);
router.get("/getuser", (req: Request, res: Response) => {
    res.status(200).json({ 'stattus': 'ok', 'message': 'get user' });
});
export default router;