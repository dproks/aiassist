import { Request, Response } from "express";
import { getChainedAnswer } from "../ai/chainedCall";
import { addDBEntry } from "../db/addEntry";
import { getDBEntries } from "../db/getEntries";
import { clg, generateEntry, mapEntries } from "../utils";

export async function handleGetEntries(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string);
  const entries = await getDBEntries(limit);
  const mapped = mapEntries(entries);
  res.send(mapped);
}

export async function handleAddEntry(req: Request, res: Response) {
  let inputEntry = req.body;
  await addDBEntry(inputEntry);
  const response = await getChainedAnswer(inputEntry.value);
  const outputEntry = generateEntry({ value: response.response });
  await addDBEntry(outputEntry);
  delete outputEntry._id;

  res.send(outputEntry);
}
