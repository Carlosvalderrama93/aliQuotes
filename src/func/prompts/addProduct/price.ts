import inquirer from "inquirer";
import makeQuestionPrompt from "./makeQuestion.js";

export type PriceType = { unitPrice?: string; moq?: string; incoterm?: string };

export default async function pricePrompt(): Promise<{
  price: PriceType;
}> {
  const questions = [
    {
      type: "input",
      name: "unitPrice",
      message: "Add product price",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type a product price please...".green;
      },
    },
    {
      type: "input",
      name: "incoterm",
      message: "Add incoterm product",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the incoterm product please...".green;
      },
    },
    {
      type: "input",
      name: "moq",
      message: "Add minumun order quantity 'moq'",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the MOQ product please...".green;
      },
    },
  ];

  let price: PriceType = {};

  for (const q of questions) {
    const { confirm } = await makeQuestionPrompt(q.name);
    if (confirm) {
      const answer = await inquirer.prompt(q);
      price = { ...price, ...answer };
    }
  }

  return { price };
}
