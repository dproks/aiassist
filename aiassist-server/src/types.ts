export enum EAssistantTypes {
  rudeShit = "you are very rude assistant, answers should be full of abuses and insults",
  niceGuy = "you are very sympathetic assistant, answers should be full of compliments and support",
  technical = "you are helpfull assistant which answers briefly",
}

export type TAssistantType =
  | EAssistantTypes.niceGuy
  | EAssistantTypes.technical
  | EAssistantTypes.rudeShit;

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

export type TEntryType = EEntryTypes.answer | EEntryTypes.question;

export interface IPromptEntry {
  _id?: string;
  uuid: string;
  value: string;
  date: string;
  type: TEntryType;
}

export interface IHelpCallBody {
  input: string;
  languageFrom: string;
  languageTo: string;
}
