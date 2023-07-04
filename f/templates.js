const { LLMChain } = require("langchain/chains");
const { HumanChatMessage, SystemChatMessage } = require("langchain/schema");
const {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} = require("langchain/prompts");

const assistantType = {
  rudeShit: 'you are very rude assistant, answers should be full of abuses and insults',
  niceGuy: 'you are very sympathetic assistant, answers should be full of compliments and support',
  technical: 'you are helpfull assistant which answers briefly'
}

const translationPromptMock = {
  input_language: 'english',
  output_language: 'russian',
  text: 'censorship is shit'
}

const translationPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate("you are assistant that translates {input_language} into {output_language}"),
  HumanMessagePromptTemplate.fromTemplate("{text}")
])

const translateResponse = async function(chat) {
  const response = await chat.generatePrompt([
    await translationPrompt.formatPromptValue(translationPromptMock),
  ])

  return response
}

const regularCall = (callMessage, chat = defaultChat, assistant = assistantType.rudeShit) => chat.call([
  new SystemChatMessage(assistant),
  new HumanChatMessage(callMessage),
])

const getLLMChain = (chat) => new LLMChain({
  chat,
  prompt: translationPrompt,
})
const chainCall = (chat) => getLLMChain(chat).call(translationPromptMock)

module.exports = { assistantType, translateResponse, regularCall, chainCall }
