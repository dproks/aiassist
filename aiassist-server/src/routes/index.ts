import { NextFunction, Request, Response, Router } from "express";
import { EntryController } from "../controllers/entry.controller";
import { UserSettingsController } from "../controllers/user-settings.controller";
import { HelperController } from "../controllers/helper.controller";

const router = Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(req.url, "@", Date.now());
  next();
});

router.route("/entry").get(EntryController.getEntry);

router.route("/entry").post(EntryController.addEntry);

router.route("/helper").post(HelperController.getHelp);

router.route("/settings").get(UserSettingsController.getUserSettings);

router.route("/settings").post(UserSettingsController.setUserSettings);

export default router;
