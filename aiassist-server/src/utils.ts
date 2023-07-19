import { IPromptEntry, ILanguagePair } from "./types";
import { v4 as uuid } from "uuid";

const db_username = process.env.MONGO_INITDB_ROOT_USERNAME;
const db_pwd = process.env.MONGO_INITDB_ROOT_PASSWORD;

export const getDBUri = () =>
  `mongodb://${db_username}:${db_pwd}@dkrcomp-mongo/`;

export const generateEntry = ({
  inputOriginLanguage,
  inputTargetLanguage,
  outputOriginLanguage,
  outputTargetLanguage,
  error,
}: {
  inputOriginLanguage: string;
  inputTargetLanguage: string;
  outputOriginLanguage: string;
  outputTargetLanguage: string;
  error: string;
}): IPromptEntry => ({
  uuid: uuid(),
  input: {
    originLanguage: inputOriginLanguage,
    targetLanguage: inputTargetLanguage,
  },
  output: {
    originLanguage: outputOriginLanguage,
    targetLanguage: outputTargetLanguage,
  },
  date: JSON.stringify(new Date()),
  error,
});
