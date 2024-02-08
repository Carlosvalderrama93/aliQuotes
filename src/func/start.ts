import { createInterface, type Interface } from "readline";
import inquirer from "inquirer";

import {
  getProducts,
  addProducts,
  removeProducts,
  type FinalProductType,
} from "./dataFeatures.js";

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

export async function promptMenu(): Promise<number> {
  const questions: MenuQType[] = [
    {
      type: "list",
      name: "answer",
      message: "Welcome to AliQuotes. What do you want?",
      choices: [
        { value: 1, name: "Add product" },
        { value: 2, name: "List products" },
        { value: 3, name: "Delete a product" },
        { value: 0, name: "Close App" },
      ],
    },
  ];
  console.clear();
  const { answer }: { answer: number } = await inquirer.prompt(questions);
  return answer;
}

export default async function promptStart() {
  const answerUser: number = await promptMenu();
  promptProcessator(answerUser);
}

async function promptProcessator(answer: number) {
  switch (answer) {
    case 1:
      driveAction(promptAddProducts);
      break;
    case 2:
      driveAction(promptListProducts);
      break;
    case 3:
      driveAction(promptRemoveProducts);
      break;
    case 0:
      console.log("¡Closing AliQuotes...!".green);
      return;
    default:
      promptStart();
      break;
  }
}

async function driveAction<T extends () => ReturnType<T>>(callback: T) {
  await callback();
  await promptRestart();
}

async function promptRestart(): Promise<void> {
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
  if (answer) promptStart();
}

async function promptAddProducts(quantity = 1): Promise<void> {
  const answers: ProductType[] = [];
  let i = 0;
  while (quantity > i) {
    i++;
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

    let answer: {};
    for (const question of questions) {
      const answerProp = await inquirer.prompt(question);
      answer = { ...answer, ...answerProp };
    }
    answers.push(answer as ProductType);
  }

  addProducts(answers);
}

function promptListProducts() {
  const products = getProducts();

  if (!products.length) {
    console.clear();
    console.log("There is not products to delete...".red);
    console.log("\n");
    return;
  }

  console.log("Products quotes are:");
  products.forEach((product: ProductType, index: number) => {
    const pos = ((index + 1).toString() + ".").green;
    console.log(`${pos} ${product.title} : $${product.price}`);
  });

  console.log("\n");
}

async function promptRemoveProducts() {
  const products: FinalProductType[] = getProducts();
  if (!products.length) {
    console.clear();
    console.log("There is not products to delete...".red);
    console.log("\n");
    return;
  }
  const choices = products.map((product) => {
    return { value: product.id, name: product.title, checked: false };
  });
  const questions = [
    {
      type: "checkbox",
      name: "idProducts",
      message: "Select the product(s) to remove",
      choices,
      checked: false,
      validate(idProducts: string[]) {
        if (idProducts.length === 0) return "Type a product name please...";
        return true;
      },
    },
  ];

  const { idProducts }: { idProducts: string[] } = await inquirer.prompt(
    questions
  );

  removeProducts(idProducts);
}
