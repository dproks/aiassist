import { IPromptEntry } from "../types";
import { dbUri } from "./db.utils";
import { EntryModel } from "./models";
import mongoose from "mongoose";

export async function getDBEntries(limit: number): Promise<IPromptEntry[]> {
  try {
    await mongoose.connect(dbUri);

    const collectionLength = await EntryModel.count();
    const skipCount =
      collectionLength - limit > 0 ? collectionLength - limit : 0;

    const entries = EntryModel.find({}).skip(skipCount);
    return entries;
  } catch (error) {
    console.error("Add DB Entry Error:", error);
    process.exit(1);
  }
}
