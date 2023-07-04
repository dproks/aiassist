import { clg } from "../utils";
import { IPromptEntry } from "../types";
import { dbUri } from "./db.utils";
import { EntryModel } from "./models";
import mongoose from "mongoose";

export async function addDBEntry(entry: IPromptEntry) {
  try {
    await mongoose.connect(dbUri);
    clg("INCOMING ENTRY:");
    clg(JSON.stringify(entry));
    const newEntry = new EntryModel(entry);
    await newEntry.save();
  } catch (error) {
    console.error("Add DB Entry Error:", error);
    process.exit(1);
  }
}
