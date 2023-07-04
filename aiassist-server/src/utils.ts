import { IPromptEntry, EEntryTypes } from "./types";
import { v4 as uuid } from "uuid";

export function clg(...args: any[]) {
  console.log(`DBG: ${args}`);
}

export const generateEntry = (entry: Partial<IPromptEntry>): IPromptEntry => ({
  value: entry.value,
  uuid: entry.uuid || uuid(),
  type: entry.type || EEntryTypes.answer,
  date: entry.date || JSON.stringify(new Date()),
});

export function mapEntries(entries: IPromptEntry[]): IPromptEntry[] {
  if (!entries) return entries;
  const result = entries.map((entry) => ({
    uuid: entry.uuid,
    type: entry.type,
    date: entry.date,
    value: entry.value,
  }));

  return result;
}
