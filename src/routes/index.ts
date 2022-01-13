import { Router } from "express";
const router = Router();

import ProductRouter from "./v1/product.router";
import BrandRouter from "./v1/brand.router";

router.use("/products", ProductRouter);
router.use("/brands", BrandRouter);

export default router;