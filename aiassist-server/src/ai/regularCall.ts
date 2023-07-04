import { ChatOpenAI } from "langchain/chat_models/openai";
import { assistantType, regularCall } from "./templates.doc";
import { clg } from "../utils";

const chat = new ChatOpenAI({ temperature: 0 });

// const response = await getRegularAnswer(inputEntry.value);
// response.text
export async function getRegularAnswer(message: string) {
  clg(message);
  const response = await regularCall(message, chat, assistantType.technical);
  clg(JSON.stringify(response));
  return response;
}
