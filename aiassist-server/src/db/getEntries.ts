import { IPromptEntry } from "../types";
import { clg } from "../utils";
import { dbUri } from "./db.utils";
import { EntryModel } from "./models";
import mongoose from "mongoose";

export async function getDBEntries(limit: number): Promise<IPromptEntry[]> {
  try {
    await mongoose.connect(dbUri);

    const collectionLength = await EntryModel.count();
    const skipCount =
      collectionLength - limit > 0 ? collectionLength - limit : 0;

    const entries = await EntryModel.find({}).skip(skipCount);

    // clg("ENTRIES FOUND:");
    // for (const doc of entries) {
    //   clg(doc);
    // }

    return entries;
  } catch (error) {
    console.error("Add DB Entry Error:", error);
    process.exit(1);
  }
}
