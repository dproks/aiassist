import { Request, Response } from "express";
import { IUserSettings } from "../types";
import { UserSettings } from "../application/user-settings";

export class UserSettingsController {
  static setUserSettings = async (req: Request, res: Response) => {
    const settings: IUserSettings = req.body;
    await UserSettings.setUserSettings(settings);
    res.send(settings);
  };

  static getUserSettings = async (req: Request, res: Response) => {
    const settings = await UserSettings.getUserSettings();
    res.send(settings);
  };
}
