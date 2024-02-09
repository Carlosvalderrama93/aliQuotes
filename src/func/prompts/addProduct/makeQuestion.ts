import inquirer from "inquirer";

export default async function makeQuestionPrompt(parameter: string) {
  return await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message: `Do you want to add the ${parameter.toUpperCase().green} info?`,
  });
}
