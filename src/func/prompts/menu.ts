import inquirer from "inquirer";

export type MenuPromptType = {
  type: string;
  name: string;
  message: string;
  choices: { value: number; name: string }[];
};

export default async function promptMenu(): Promise<number> {
  const questions: MenuPromptType[] = [
    {
      type: "list",
      name: "answer",
      message: "Welcome to AliQuotes. What do you want?",
      choices: [
        { value: 1, name: "Add product" },
        { value: 2, name: "List products" },
        { value: 3, name: "Delete a product" },
        { value: 4, name: "Search a product" },
        { value: 0, name: "Close App" },
      ],
    },
  ];
  console.clear();
  const { answer }: { answer: number } = await inquirer.prompt(questions);
  return answer;
}
