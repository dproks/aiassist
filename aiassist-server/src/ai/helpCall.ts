import { ChatOpenAI } from "langchain/chat_models/openai";
import { clg } from "../utils";
import { simpleAICall } from "./ai.utils";

const chat = new ChatOpenAI({ temperature: 0 });

const getHelperChatRequests = (
  input: string,
  languageFrom: string,
  languageTo: string
) => `
    provide json of this form:
    {
      origin: {
        input: ${input},
        synonyms: string[]; // array of strings with synonyms of ${input}, in ${languageFrom}. up to 5 items
        definition: string; // definition of ${input} in ${languageFrom} language, up to 30 words
      };
      translation: {
        input: string; // translation of ${input} language, in ${languageTo}
        synonyms: string[]; // array of strings with synonyms of ${input}, in ${languageTo}. up to 5 items
        definition: string; // definition of ${input} in ${languageTo} language, up to 30 words
      };
      error?: string; // error message if something completelly wrong, optional
    }
  `;

// return response.text
export async function getHelperAnswer({
  input,
  languageFrom,
  languageTo,
}: {
  input: string;
  languageFrom: string;
  languageTo: string;
}) {
  clg(input);
  const response = await simpleAICall({
    input: input,
    chat,
    additionalSystemRequests: getHelperChatRequests(
      input,
      languageFrom,
      languageTo
    ),
  });
  return response;
}
