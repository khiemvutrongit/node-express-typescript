import { 
  Router,
  Request, 
  Response 
} from "express";
import {
  CreateProductController,
  DeleteProductController,
  GetProductController,
  GetProductsController,
  UpdateProductController,
} from "../../controllers";
import { JwtMiddleware } from "../../middleware";
import { Base64 } from "js-base64";
const publicKey = Base64.decode(process.env["PUBLIC_KEY"]);

const router = Router();

router.post(
  "/",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
  }),
  CreateProductController
);

router.get("/", GetProductsController);

router.get(
  "/private",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
  }),
  GetProductsController
);

router.get("/:id", GetProductController);

router.get(
  "/private/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
  }),
  GetProductController
);

router.put(
  "/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
  }),
  UpdateProductController
);

router.delete(
  "/:id", 
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
  }),
  DeleteProductController
);

router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success",
  });
});

export default router;
