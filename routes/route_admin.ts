import express, { Request, Response } from 'express';
import * as controllerProduct from '../controllers/products';
import * as controllerUser from '../controllers/user';
import * as controllerInvoice from '../controllers/invoice'
const router = express.Router();
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${new Date().getTime()}${ext}`
        cb(null, name);
    },
});
const upload = multer({ storage });

//product 
router.post("/product/add", upload.single('image'), controllerProduct.addProduct);
router.put("/product/updateimg", upload.single('image'), controllerProduct.updateIMGProduct);
router.patch("/product/update", controllerProduct.updateProduct);
router.delete("/product/delete", controllerProduct.deleteProduct);
router.get("/productid", controllerProduct.findProductByID);
router.get("/products", controllerProduct.getAllProduct);

//user 
router.get("/user", controllerUser.getUserByID);
router.get("/users", controllerUser.getAll);
router.post("/user/add", controllerUser.createUser);
router.put("/user/update", controllerUser.updateUser);
router.delete("/user/delete", controllerUser.deleteUser);

// invoice
router.get("/invoices",controllerInvoice.findAllInvoice)
router.get("/invoice",controllerInvoice.findInvoiceByID)
router.delete("/invoice",controllerInvoice.cancleInvoice)

export default router;