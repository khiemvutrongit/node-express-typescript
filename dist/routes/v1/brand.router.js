"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middleware_1 = require("../../middleware");
const js_base64_1 = require("js-base64");
const publicKey = js_base64_1.Base64.decode(process.env["PUBLIC_KEY"]);
const router = express_1.Router();
router.post("/", middleware_1.JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
}), controllers_1.CreateBrandController);
router.get("/", controllers_1.GetBrandsController);
router.get("/private", middleware_1.JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
}), controllers_1.GetBrandsController);
router.get("/:id", controllers_1.GetBrandController);
router.get("/private/:id", middleware_1.JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:r",
}), controllers_1.GetBrandController);
router.put("/:id", middleware_1.JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
}), controllers_1.UpdateBrandController);
router.delete("/:id", middleware_1.JwtMiddleware({
    publicKey: publicKey,
    permission: "mp:c",
}), controllers_1.DeleteBrandController);
router.get("/check", (req, res) => {
    return res.json({
        status: 200,
        message: "Success",
    });
});
exports.default = router;
