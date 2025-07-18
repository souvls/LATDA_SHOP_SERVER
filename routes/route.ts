import express, { Request, Response } from 'express';
import router_admin from "./route_admin";
import router_cashier from './router_cashier';
import { Login } from '../controllers/auth';
import * as auth from '../middleware/auth'
import { getExcahnge } from '../controllers/exchange';
const router = express.Router();



router.post("/login", Login);


router.use("/admin", auth.authenticateToken,auth.authenticateAdmin, router_admin);
router.use("/cashier", auth.authenticateToken, auth.authenticateCashier, router_cashier);

//gobal
router.get("/exchange", getExcahnge);

export default router;