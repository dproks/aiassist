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

export interface IPromptEntry {
  uuid: string
  value: string
  date: string
  type: TEntryType
}

export interface IHelpersCard {
  origin: {
    input: string
    synonyms: string[]
    definition: string
  }
  translation: {
    input: string
    synonyms: string[]
    definition: string
  }
  error: string
}
