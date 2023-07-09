import { IPromptEntry, TEntryType } from "@/app/types"
import { v4 as uuid } from "uuid"

export const generateEntry = (
  value: string,
  type: TEntryType,
): IPromptEntry => ({
  value,
  type,
  date: JSON.stringify(new Date()),
  uuid: uuid(),
})
