export enum ETagTypes {
  entries = "Entries",
}

export enum ETagIDs {
  entriesList = "ENTRIES_LIST",
}

export interface ILanguagePair {
  originLanguage: string
  targetLanguage: string
}

export interface IPromptEntry {
  uuid: string
  input: ILanguagePair
  output: ILanguagePair
  date: string
  error?: string
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
  error?: string
}

export interface IUserSettings {
  originLanguage: string
  targetLanguage: string
  messagesLimit: number
}
