import { Router } from "express";
const router = Router();

import ProductRouter from "./v1/product.router";

router.use("/v1", ProductRouter);

export default router;