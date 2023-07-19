import mongoose, { Schema } from "mongoose";
import { IUserSettings } from "@/src/types";

export const settingsCollectionName = "SettingsCollection";

export const UserSettingsSchema = new Schema({
  originLanguage: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: String,
    required: true,
  },
  messagesLimit: {
    type: Number,
    required: true,
  },
});

export const UserSettingsModel = mongoose.model<IUserSettings>(
  settingsCollectionName,
  UserSettingsSchema
);
