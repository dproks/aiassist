import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import { generateEntry } from "../utils";
import { EntryRepository } from "../db/repositories/entry.repository";
import { AI } from "../ai";
import { UserSettingsRepository } from "../db/repositories/user-settings.repository";
import { EAssistantTypes, IPromptEntry } from "../types";

export class Conversation {
  static ask = async (input: string) => {
    const dbEntries = await this.getHistory();
    const languages = await UserSettingsRepository.getUserLanguages();

    const aiAnswer = await AI.getChainedAnswer({
      input,
      messages:
        dbEntries.length > 0 ? this.mapEntriesToMessages(dbEntries) : [],
      systemMessage: EAssistantTypes.niceGuy, // TODO add to settings
      language: languages.targetLanguage,
    });

    const entry = generateEntry({
      inputOriginLanguage: input,
      inputTargetLanguage: aiAnswer.inputTargetLanguage,
      outputOriginLanguage: aiAnswer.outputOriginLanguage,
      outputTargetLanguage: aiAnswer.outputTargetLanguage,
      error: aiAnswer.error,
    });

    await EntryRepository.addDBEntry(entry);

    return entry;
  };

  static getHistory = async (limit?: number) => {
    const dbEntries = await EntryRepository.getDBEntries(limit);

    return dbEntries;
  };

  static mapEntriesToMessages = (dbEntries: IPromptEntry[]) => {
    const pastMessages: Array<
      HumanChatMessage | AIChatMessage | SystemChatMessage
    > = [];

    dbEntries.forEach((entry: IPromptEntry) => {
      if (!entry.input) return;

      if (entry.input.originLanguage)
        pastMessages.push(new HumanChatMessage(entry.input.originLanguage));
      if (entry.output.originLanguage)
        pastMessages.push(new AIChatMessage(entry.output.originLanguage));
    });

    return pastMessages;
  };
}
