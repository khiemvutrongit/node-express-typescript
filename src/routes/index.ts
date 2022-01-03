import { Router } from "express";
const router = Router();

import OhanaRouter from "./v1/ohana.router";

router.use("/ohana", OhanaRouter);

export default router;