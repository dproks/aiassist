import { SystemChatMessage } from "langchain/schema";
import { AI } from "../ai";
import { UserSettings } from "./user-settings";

export class Helper {
  static getHelp = async (input: string) => {
    const { originLanguage, targetLanguage } =
      await UserSettings.getUserSettingsLanguages();

    const systemMessage = this.getHelperSystemMessage(
      input,
      originLanguage,
      targetLanguage
    );

    const response = await AI.getSimpleAnswer(input, systemMessage);

    return response.text;
  };

  static getHelperSystemMessage = (
    input: string,
    originLanguage: string,
    targetLanguage: string
  ) => `
      provide json of this form:
      {
        origin: {
          input: ${input},
          synonyms: string[]; // array of strings with synonyms of '${input}', in ${originLanguage}. up to 5 items
          definition: string; // definition of '${input}' in ${originLanguage} language, up to 30 words
        };
        translation: {
          input: string; // translation of '${input}' in ${targetLanguage}
          synonyms: string[]; // array of strings with synonyms of '${input}', in ${targetLanguage}. up to 5 items
          definition: string; // definition of '${input}' in ${targetLanguage} language, up to 30 words
        };
        error?: string; // error message if something completelly wrong, optional
      }
    `;
}
