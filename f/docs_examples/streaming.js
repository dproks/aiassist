// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { HumanChatMessage } from "langchain/schema";

// const chat = new ChatOpenAI({
//   streaming: true,
//   callbacks: [
//     {
//       handleLLMNewToken(token: string) {
//         process.stdout.write(token);
//       },
//     },
//   ],
// });

// await chat.call([
//   new HumanChatMessage("Write me a song about sparkling water."),
// ]);
