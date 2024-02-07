import { createInterface, type Interface } from "readline";
import inquirer from "inquirer";

import { getData, saveData } from "./dataFeatures.js";

export type ProductType = { title: string; price: string };

type MenuQType = {
  type: string;
  name: string;
  message: string;
  choices: { value: number; name: string }[];
};

type RestartQType = {
  type: string;
  name: string;
  message: string;
  choices: { value: boolean; name: string }[];
};

type QuoteQType = {
  type: string;
  name: string;
  message: string;
  validate(answer: string): string | true;
};

async function initialMenu(): Promise<number> {
  const questions: MenuQType[] = [
    {
      type: "list",
      name: "answer",
      message: "Welcome to AliQuotes. What do you want?",
      choices: [
        { value: 1, name: "Add Quote" },
        { value: 2, name: "List Quotes" },
        { value: 0, name: "Close App" },
      ],
    },
  ];
  console.clear();
  const { answer }: { answer: number } = await inquirer.prompt(questions);
  return answer;
}

export async function startApp() {
  const answerUser: number = await initialMenu();
  processAnswer(answerUser);
}

async function processAnswer(answer: number) {
  switch (answer) {
    case 1:
      driveAction(newQuote);
      break;
    case 2:
      driveAction(listQuotes);
      break;
    case 0:
      console.log("¡Closing AliQuotes...!".green);
      return;
    default:
      startApp();
      break;
  }
}

async function driveAction<T extends () => ReturnType<T>>(callback: T) {
  await callback();
  await restartApp();
}

async function restartApp(): Promise<void> {
  const questions: RestartQType[] = [
    {
      type: "list",
      name: "answer",
      message: "Restart AliQuotes?",
      choices: [
        { value: true, name: "Yes" },
        { value: false, name: "Not" },
      ],
    },
  ];

  const { answer }: { answer: boolean } = await inquirer.prompt(questions);
  if (answer) startApp();
}

async function newQuote(): Promise<void> {
  const questions: QuoteQType[] = [
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

  let answer = {};
  for (const question of questions) {
    const answerProp = await inquirer.prompt(question);
    answer = { ...answer, ...answerProp };
  }
  saveData(answer as ProductType);
}

function listQuotes() {
  const { products } = getData();
  console.log("Products quotes are:");
  products.forEach((product: ProductType, index: number) => {
    const pos = ((index + 1).toString() + ".").green;
    console.log(`${pos} ${product.title} : $${product.price}`);
  });

  console.log("\n");
}
