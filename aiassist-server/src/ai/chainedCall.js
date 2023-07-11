const { ChatOpenAI } = require("langchain/chat_models/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
const { assistantType, regularCall } = require("./templates.doc");
const { clg } = require("../utils");

const model = new ChatOpenAI({ temperature: 0 });
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory });

async function getChainedAnswer(message) {
  const response = await chain.call({ input: message });
  return response;
}

module.exports = { getChainedAnswer };
