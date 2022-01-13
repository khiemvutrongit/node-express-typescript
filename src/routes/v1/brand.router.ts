import { 
  Router,
  Request, 
  Response 
} from "express";
import {
  CreateBrandController,
  GetBrandController,
  GetBrandsController,
  UpdateBrandController,
  DeleteBrandController
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
  CreateBrandController
);

router.get("/", GetBrandsController);

router.get(
  "/private",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
  }),
  GetBrandsController
);

router.get("/:id", GetBrandController);

router.get(
  "/private/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
  }),
  GetBrandController
);

router.put(
  "/:id",
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
  }),
  UpdateBrandController
);

router.delete(
  "/:id", 
  JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
  }),
  DeleteBrandController
);

router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success",
  });
});

export default router;
