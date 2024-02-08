import inquirer from "inquirer";
import promptStart from "../start.js";

type RestartPromptType = {
  type: string;
  name: string;
  message: string;
  choices: { value: boolean; name: string }[];
};

export default async function promptRestart(): Promise<void> {
  const questions: RestartPromptType[] = [
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
