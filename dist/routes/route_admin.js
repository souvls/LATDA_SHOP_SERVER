"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerProduct = __importStar(require("../controllers/products"));
const controllerUser = __importStar(require("../controllers/user"));
const controllerInvoice = __importStar(require("../controllers/invoice"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const name = `${new Date().getTime()}${ext}`;
        cb(null, name);
    },
});
const upload = (0, multer_1.default)({ storage });
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
router.get("/invoices", controllerInvoice.findAllInvoice);
exports.default = router;
