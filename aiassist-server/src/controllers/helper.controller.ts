import { Request, Response } from "express";
import { Helper } from "../application/helper";

export class HelperController {
  static getHelp = async (req: Request, res: Response) => {
    const { input } = req.body;
    const aiAnswer = await Helper.getHelp(input);
    res.send(aiAnswer);
  };
}
