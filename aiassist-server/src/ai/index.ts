import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import {
  HumanChatMessage,
  AIChatMessage,
  SystemChatMessage,
  BaseChatMessage,
} from "langchain/schema";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { getStruckturedOutputPrompt } from "./prompt";
import { StructuredOutputParser } from "langchain/output_parsers";

export class AI {
  private static model = new ChatOpenAI({ temperature: 0.7 });
  private static memoryKey = "history";

  static getSimpleAnswer = async (input: string, systemMessage?: string) => {
    const callParams = [];
    if (systemMessage) callParams.push(new SystemChatMessage(systemMessage));
    callParams.push(new HumanChatMessage(input));

    return this.model.call(callParams);
  };

  static getChainedAnswer = async ({
    input,
    messages,
    systemMessage,
    language,
  }: {
    input: string;
    messages: Array<HumanChatMessage | AIChatMessage>;
    systemMessage: string;
    language: string;
  }) => {
    const memory = await this.getChatBufferMemory(messages);
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      inputTargetLanguage: `repeat user's question in ${language}`,
      outputOriginLanguage: "answer to the user's question",
      outputTargetLanguage: `answer to the user's question translated into ${language}`,
      error: "error message",
    });
    const formatInstructions = parser.getFormatInstructions();
    const prompt = this.getPromptTemplate(systemMessage, formatInstructions);

    const chain = new ConversationChain({
      llm: this.model,
      memory,
      prompt,
    });

    const chainAnswer = await chain.call({ input });

    return JSON.parse(chainAnswer.response);
  };

  static getPromptTemplate = (
    systemMessage: string,
    formatInstructions: string
  ) => {
    const prompt = new PromptTemplate({
      template: `${systemMessage} \n{format_instructions}\n{input}`,
      inputVariables: ["input"],
      partialVariables: { format_instructions: formatInstructions },
    });
    return prompt;
  };

  static getChatBufferMemory = (messages: BaseChatMessage[]) => {
    const memory = new BufferMemory({
      returnMessages: true,
      chatHistory: new ChatMessageHistory([...messages]),
    });

    return memory;
  };
}
