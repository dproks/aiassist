import { LLMChain } from "langchain/chains";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { BaseLanguageModel } from "langchain/dist/base_language";

export const assistantType = {
  rudeShit:
    "you are very rude assistant, answers should be full of abuses and insults",
  niceGuy:
    "you are very sympathetic assistant, answers should be full of compliments and support",
  technical: "you are helpfull assistant which answers briefly",
};

const translationPromptMock = {
  input_language: "english",
  output_language: "russian",
  text: "censorship is shit",
};

const translationPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "you are assistant that translates {input_language} into {output_language}"
  ),
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

const translateResponse = async function (chat: any) {
  const response = await chat.generatePrompt([
    await translationPrompt.formatPromptValue(translationPromptMock),
  ]);

  return response;
};

export const regularCall = (
  callMessage: string,
  chat: any,
  assistant = assistantType.rudeShit
) =>
  chat.call([
    new SystemChatMessage(assistant),
    new HumanChatMessage(callMessage),
  ]);

// const getLLMChain = (chat: any) =>
//   new LLMChain({
//     chat,
//     prompt: translationPrompt,
//   });
// const chainCall = (chat: any) => getLLMChain(chat).call(translationPromptMock);
