import express, { Request, Response } from 'express';
import router_admin from "./route_admin";
import router_cashier from './router_cashier';
import { Login } from '../controllers/auth';
import * as auth from '../middleware/auth'
const router = express.Router();



router.post("/login", Login);


router.use("/admin", router_admin);
router.use("/cashier", auth.authenticateToken, auth.authenticateCashier, router_cashier);
// router.use("/cashier", router_cashier);

export default router;