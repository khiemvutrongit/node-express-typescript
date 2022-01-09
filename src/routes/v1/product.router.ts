import { CreateProductController, GetProductController, GetProductsController, UpdateProductController } from "../../controllers";
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

router.get(
  "/products",
  GetProductsController
);

router.get(
  "/private/products",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r"
  }),
  GetProductsController
);

router.get(
  "/products/:id",
  GetProductController
);

router.get(
  "/private/products/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r"
  }),
  GetProductController
);

router.put(
  "/products/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c"
  }),
  UpdateProductController
);

router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success",
  });
});

export default router;
