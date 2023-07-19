import mongoose, { Schema, Document } from "mongoose";
import { IPromptEntry } from "@/src/types";

export const promptEntriesCollectionName = "EntriesCollection";

export interface IPromptDBEntry extends IPromptEntry, Document {}

export const EntriesSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  input: {
    type: {
      originLanguage: { type: String },
      targetLanguage: { type: String },
    },
  },
  output: {
    type: {
      originLanguage: { type: String },
      targetLanguage: { type: String },
    },
  },
  date: {
    type: String,
    required: true,
  },
});

export const EntryModel = mongoose.model<IPromptEntry>(
  promptEntriesCollectionName,
  EntriesSchema
);
