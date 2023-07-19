import { Request, Response } from "express";
import { Conversation } from "../application/conversation";

export class EntryController {
  static getEntry = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string);
    const entries = await Conversation.getHistory(limit);
    res.send(entries);
  };

  static addEntry = async (req: Request, res: Response) => {
    let input = req.body.value;
    const outputEntry = await Conversation.ask(input);
    res.send(outputEntry);
  };
}
