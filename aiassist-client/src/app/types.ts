export enum ETagTypes {
  entries = "Entries",
}

export enum ETagIDs {
  entriesList = "ENTRIES_LIST",
}

export enum EEntryTypes {
  answer = "answer",
  question = "question",
}

export type TEntryType = EEntryTypes.answer | EEntryTypes.question

export interface IOutputEntry {
  uuid: string
  value: string
  date: string
  type: TEntryType
}

export interface IPromptEntry {
  uuid: string
  value: string
  date: string
  type: TEntryType
}
