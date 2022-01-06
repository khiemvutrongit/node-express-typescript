import { CreateProductController } from "../../controllers";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/products", CreateProductController);

router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success"
  })
});

export default router;