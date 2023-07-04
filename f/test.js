#! /usr/bin/env node
process.env.OPENAI_API_KEY = "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";

const {ChatOpenAI} = require('langchain/chat_models/openai');
const {HumanChatMessage, SystemChatMessage} = require('langchain/schema');
const {
	assistantType,
	regularCall,
	chainCall,
	translateResponse,
} = require('./templates');
const {pbcopy} = require('./utils');

const chat = new ChatOpenAI({temperature: 0});
const args = process.argv.slice(2);

// Check if arguments are provided
if (args.length === 0) {
	console.log('Gimme something');
} else {
	const callMessage = args.join(' ');

	const responseHandler = response => {
		console.log(JSON.stringify(response.text));
		pbcopy(response.text);
	};

	regularCall(callMessage, chat, assistantType.technical).then(
		responseHandler,
	);

	// chainCall(llmChat).then(responseHandler);

	// template generations example
	/*
  translateResponse(chat).then(function (response) {
    console.log(JSON.stringify(response.generations))
  });
  */
}
