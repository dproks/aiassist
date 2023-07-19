import { IPromptEntry } from "@/src/types";
import { EntryModel } from "../models/entry.model";

export class EntryRepository {
  static async addDBEntry(entry: IPromptEntry) {
    try {
      const newEntry = new EntryModel(entry);

      await newEntry.save();
    } catch (error) {
      console.error(error);
    }
  }

  static async getDBEntries(limit: number = Infinity): Promise<IPromptEntry[]> {
    try {
      const collectionLength = await EntryModel.count();
      const skipCount =
        collectionLength - limit > 0 ? collectionLength - limit : 0;

      const entries = await EntryModel.find({}).skip(skipCount);

      return entries;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
