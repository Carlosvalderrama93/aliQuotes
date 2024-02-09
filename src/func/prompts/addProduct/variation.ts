import inquirer from "inquirer";
import makeQuestionPrompt from "./makeQuestion.js";

export type VariationsType = { colors?: string; sizes?: string };

export default async function variationsPrompt(): Promise<{
  variations: VariationsType;
}> {
  const questions = [
    {
      type: "input",
      name: "colors",
      message: "How many colors has the product?",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type is the product has private label please...".green;
      },
    },
    {
      type: "input",
      name: "sizes",
      message: "How many sizes has the product?",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type is the product has private label please...".green;
      },
    },
  ];

  let variations: VariationsType = {};

  for (const q of questions) {
    const { confirm } = await makeQuestionPrompt(q.name);
    if (confirm) {
      const answer = await inquirer.prompt(q);
      variations = { ...variations, ...answer };
    }
  }

  return { variations };
}
