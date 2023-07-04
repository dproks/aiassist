import { NextFunction, Request, Response, Router } from "express";
import { handleAddEntry, handleGetEntries, handleGetHelper } from "./handlers";

const router = Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(req.url, "@", Date.now());
  next();
});

router.route("/entries").get(handleGetEntries);

router.route("/entry").post(handleAddEntry);

router.route("/helper").post(handleGetHelper);

export default router;
