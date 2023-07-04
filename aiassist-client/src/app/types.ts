export enum EEntryTypes {
	answer = "answer",
	question = "question",
}

export type TEntryType = EEntryTypes.answer | EEntryTypes.question

export interface IOutputEntry {
	id: string
	value: string
	date: string
	type: TEntryType
}
