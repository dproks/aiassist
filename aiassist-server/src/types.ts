export interface ILanguagePair {
  originLanguage: string;
  targetLanguage: string;
}

export interface IPromptEntry {
  uuid: string;
  input: ILanguagePair;
  output: ILanguagePair;
  date: string;
  error?: string;
}

export interface IUserSettings {
  originLanguage: string;
  targetLanguage: string;
  messagesLimit: number;
}

export enum EAssistantTypes {
  rudeShit = "you are very rude assistant, answers should be full of abuses and insults.",
  niceGuy = "you are very sympathetic assistant, answers should be full of compliments and support.",
  technical = "you are helpfull assistant which answers briefly.",
  jsonProvider = "you are assistant who provides result as json.",
}

export type TAssistantType =
  | EAssistantTypes.niceGuy
  | EAssistantTypes.technical
  | EAssistantTypes.rudeShit
  | EAssistantTypes.jsonProvider;

export interface IHelpCallBody {
  input: string;
}
