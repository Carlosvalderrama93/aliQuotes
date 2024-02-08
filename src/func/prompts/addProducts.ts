import inquirer from "inquirer";

import { addProducts } from "../dataFeatures.js";

export type ProductPromptType = { title: string; price: string };

export type QuestionPromptType = {
  type: string;
  name: string;
  message: string;
  validate(answer: string): string | true;
};

export default async function promptAddProducts(quantity = 1): Promise<void> {
  const answers: ProductPromptType[] = [];
  let i = 0;
  while (quantity > i) {
    i++;
    const questions: QuestionPromptType[] = [
      {
        type: "input",
        name: "title",
        message: "Add product name",
        validate(answer: string) {
          if (answer.length) return true;
          return "Type a product name please...";
        },
      },
      {
        type: "input",
        name: "price",
        message: "Add product price",
        validate(answer: string) {
          if (answer.length) return true;
          return "Type a product price please...".green;
        },
      },
    ];

    let answer: {};
    for (const question of questions) {
      const answerProp = await inquirer.prompt(question);
      answer = { ...answer, ...answerProp };
    }
    answers.push(answer as ProductPromptType);
  }

  addProducts(answers);
}
