import inquirer from "inquirer";

export type BasicInfoType = { title: string; price: string };
export async function basicInfoPrompt() {
  const questions = [
    {
      type: "input",
      name: "title",
      message: "Add the product title",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type a product name please...";
      },
    },
    {
      type: "input",
      name: "price",
      message: "Add the product price",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the weight product  please...".green;
      },
    },
    {
      type: "input",
      name: "hsCode",
      message: "Add the hscode product",
      default: false,
      validate(answer: string) {
        if (answer.length) return true;
        return "Type a hscode product please...".green;
      },
    },
  ];

  const basic: BasicInfoType = await inquirer.prompt(questions);
  return { basic };
}
