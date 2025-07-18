import express, { Request, Response } from 'express';
import * as controllerProduct from '../controllers/products';
import * as controllerUser from '../controllers/user';
import * as controllerInvoice from '../controllers/invoice'
// import { Dashboard } from '../controllers/dashboard';
import * as controllerReport from '../controllers/report'
const router = express.Router();
import multer from 'multer';
import path from 'path';
import { updateExcahnge } from '../controllers/exchange';



// กำหนด Multer storage. เราจะไม่เก็บไฟล์ไว้ที่เครื่อง server ชั่วคราว แต่จะส่ง stream ตรงไปยัง S3
// Multer จะช่วย parse multipart/form-data
const storage = multer.memoryStorage(); // ใช้ memoryStorage เพื่อเก็บไฟล์ใน RAM ชั่วคราว
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const name = `${new Date().getTime()}${ext}`
//         cb(null, name);
//     },
// });
// const upload = multer({ storage });

//report
router.get("/report-sale", controllerReport.GetReportSale);
router.get("/report-product", controllerReport.GetReportProduct);


//product 
router.post("/product/add", upload.single('image'), controllerProduct.addProduct);
router.post("/product/increase", controllerProduct.increaseProduct);
router.put("/product/updateimg", upload.single('image'), controllerProduct.updateIMGProduct);
router.patch("/product/update", controllerProduct.updateProduct);
router.delete("/product/delete", controllerProduct.deleteProduct);
router.put("/product/reset-qty", controllerProduct.resetQty);


router.get("/products", controllerProduct.getAllProduct);
router.get("/productid", controllerProduct.findProductByID);
router.get("/findproduct", controllerProduct.findProduct);

//user 
router.get("/user", controllerUser.getUserByID);
router.get("/users", controllerUser.getAll);
router.post("/user/add", controllerUser.createUser);
router.put("/user/update", controllerUser.updateUser);
router.delete("/user/delete", controllerUser.deleteUser);

// invoice
router.get("/invoices", controllerInvoice.findAllInvoice);
router.get("/invoice", controllerInvoice.findInvoiceByID);
router.delete("/invoice", controllerInvoice.cancleInvoice);
router.put("/invoice/changestatus", controllerInvoice.changestatus)

//change exchange rate
router.put("/exchange", updateExcahnge)
export default router;