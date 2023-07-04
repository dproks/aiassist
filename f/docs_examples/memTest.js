// const chatPrompt = ChatPromptTemplate.fromPromptMessages([
// 	SystemMessagePromptTemplate.fromTemplate(
// 		'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.',
// 	),
// 	new MessagesPlaceholder('history'),
// 	HumanMessagePromptTemplate.fromTemplate('{input}'),
// ]);

// const chain = new ConversationChain({
// 	memory: new BufferMemory({returnMessages: true, memoryKey: 'history'}),
// 	prompt: chatPrompt,
// 	llm: chat,
// });

// const responseH = await chain.call({
// 	input: 'hi from London, how are you doing today',
// });

// console.log(responseH);
// // {
// //   response: "Hello! As an AI language model, I don't have feelings, but I'm functioning properly and ready to assist you with any questions or tasks you may have. How can I help you today?"
// // }

// const responseI = await chain.call({
// 	input: 'Do you know where I am?',
// });

// console.log(responseI);
// // {
// //   response: "Yes, you mentioned that you are from London. However, as an AI language model, I don't have access to your current location unless you provide me with that information."
// // }
