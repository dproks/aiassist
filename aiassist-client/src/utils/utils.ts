import { IOutputEntry, TEntryType } from "@/app/types"
import { v4 as uuid } from "uuid"

export const generateEntry = (
	value: string,
	type: TEntryType,
): IOutputEntry => ({
	value,
	type,
	date: JSON.stringify(new Date()),
	id: uuid(),
})
