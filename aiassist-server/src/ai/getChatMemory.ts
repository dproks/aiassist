import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { getDBEntries } from "../db/getEntries";
import { IPromptEntry } from "../types";

export async function getChatMemory() {
  const dbEntries = await getDBEntries(Infinity);
  const pastMessages = dbEntries.map((i: IPromptEntry) => {
    if (i.type === "question") return new AIChatMessage(i.value);
    if (i.type === "answer") return new HumanChatMessage(i.value);
  });
  const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory(pastMessages),
  });

  return memory;
}
