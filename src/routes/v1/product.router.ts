import { CreateProductController } from "../../controllers";
import { Router, Request, Response } from "express";
import { JwtMiddleware } from "../../middleware";
import { Base64 } from "js-base64";
const publicKey = Base64.decode(process.env["PUBLIC_KEY"]);

const router = Router();

router.post(
  "/products",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c"
  }),
  CreateProductController
);

router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success",
  });
});

export default router;
