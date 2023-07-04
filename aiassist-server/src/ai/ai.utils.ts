import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  BaseChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import { EAssistantTypes, TAssistantType } from "../types";

export const simpleAICall = ({
  input,
  chat,
  assistant = EAssistantTypes.technical,
  additionalSystemRequests,
}: {
  input: string;
  chat: ChatOpenAI;
  assistant?: TAssistantType;
  additionalSystemRequests?: string | string[];
}): Promise<BaseChatMessage> => {
  const additionalSystemMessages = Array.isArray(additionalSystemRequests)
    ? additionalSystemRequests.map(
        (message: string) => new SystemChatMessage(message)
      )
    : [new SystemChatMessage(additionalSystemRequests)];

  const systemMessages = [
    new SystemChatMessage(assistant),
    ...additionalSystemMessages,
  ];

  return chat.call([...systemMessages, new HumanChatMessage(input)]);
};
