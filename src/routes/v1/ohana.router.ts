import { Router, Request, Response } from "express";

const router = Router();

router.post("/refresh-view-all");
router.get("/check", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "Success"
  })
});

export default router;