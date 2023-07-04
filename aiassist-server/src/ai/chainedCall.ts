import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { getChatMemory } from "./getChatMemory";

export async function getChainedAnswer(message: string) {
  const model = new ChatOpenAI({ temperature: 0 });
  const memory = await getChatMemory();
  const chain = new ConversationChain({ llm: model, memory });
  const response = await chain.call({ input: message });
  return response;
}
