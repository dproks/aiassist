// // class
// interface Tool {
//   name: string;
//   description: string;
//   call(arg: string): Promise<string>;
// }

// interface AgentStep {
//   action: AgentAction;
//   observation: string;
// }

// interface AgentAction {
//   tool: string; // Tool.name
//   toolInput: string; // Tool.call argument
// }

// interface AgentFinish {
//   returnValues: object;
// }

// // class
// interface Agent {
//   plan(steps: AgentStep[], inputs: object): Promise<AgentAction | AgentFinish>;
// }

// class AgentExecutor {
//   // a simplified implementation
//   async run(inputs: object) {
//     const steps = [];
//     while (true) {
//       const step = await this.agent.plan(steps, inputs);
//       if (step instanceof AgentFinish) {
//         return step.returnValues;
//       }
//       steps.push(step);
//     }
//   }
// }

// //

// // Define the list of tools the agent can use
// const tools = [
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     location: "Austin,Texas,United States",
//     hl: "en",
//     gl: "us",
//   }),
// ];
// // Create the agent from the chat model and the tools
// const agent = ChatAgent.fromLLMAndTools(new ChatOpenAI(), tools);
// // Create an executor, which calls to the agent until an answer is found
// const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

// const responseG = await executor.run(
//   "How many people live in canada as of 2023?"
// );

// console.log(responseG);
