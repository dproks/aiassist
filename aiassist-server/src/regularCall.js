process.env.OPENAI_API_KEY =
	"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";

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { assistantType, regularCall } = require("./templates");
const { clg } = require("./utils");

const chat = new ChatOpenAI({ temperature: 0 });

async function getSimpleAnswer(message) {
	clg(message);
	const response = await regularCall(message, chat, assistantType.technical);
	clg(JSON.stringify(response));
	return response;
}

module.exports = { getSimpleAnswer };
