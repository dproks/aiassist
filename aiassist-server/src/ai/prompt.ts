import { PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";

export async function getStruckturedOutputPrompt(
  input: string,
  targetLanguage: string
) {
  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    inputTarget: `user's question translated into ${targetLanguage}`,
    outputOrigin: "answer to the user's question",
    outputTarget: `answer to the user's question translated into ${targetLanguage}`,
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const formattedPrompt = await prompt.format({
    question: input,
  });

  return formattedPrompt;
}

export async function getMultipleInputPrompt(
  input: string,
  output: string,
  language: string
) {
  const multipleInputPrompt = new PromptTemplate({
    inputVariables: ["input", "output", "language"],
    template: `provide json with such fields:
      input: string; // translation of {input} translated into  language
      output: string; // {output} translated into {language} language
      error: string; // if you can't provide asnwer place error text here.
    `,
  });
  const formattedMultipleInputPrompt = await multipleInputPrompt.format({
    adjective: "funny",
    content: "chickens",
  });

  return formattedMultipleInputPrompt;
}
