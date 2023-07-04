import mongoose, { Schema, Document } from "mongoose";
import { TEntryType } from "../types";
import { promptEntriesCollectionName } from "./db.utils";

export interface IPromptDBEntry extends Document {
  uuid: string;
  value: string;
  date: string;
  type: TEntryType;
}

export const EntriesSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const EntryModel = mongoose.model<IPromptDBEntry>(
  promptEntriesCollectionName,
  EntriesSchema
);
