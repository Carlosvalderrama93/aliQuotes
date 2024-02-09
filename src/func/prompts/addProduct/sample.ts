import inquirer from "inquirer";
import makeQuestionPrompt from "./makeQuestion.js";

export type SampleType = {
  samplePrice?: string;
  sampleQuantity?: string;
  sampleDelivery?: string;
};

export default async function sampleProductPrompt(): Promise<{
  sample: SampleType;
}> {
  const questions = [
    {
      type: "input",
      name: "samplePrice",
      message: "Add sample price",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the sample price please...".green;
      },
    },
    {
      type: "input",
      name: "sampleQuantity",
      message: "Add sample price quantity",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the sample quantity please...".green;
      },
    },
    {
      type: "input",
      name: "sampleDelivery",
      message: "Add sample delivery",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the sample delivery please...".green;
      },
    },
  ];

  let sample: SampleType = {};

  for (const q of questions) {
    const { confirm } = await makeQuestionPrompt(q.name);
    if (confirm) {
      const answer = await inquirer.prompt(q);
      sample = { ...sample, ...answer };
    }
  }

  return { sample };
}
