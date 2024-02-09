import inquirer from "inquirer";
import makeQuestionPrompt from "./makeQuestion.js";

export type MoreInfoType = {
  url?: string;
  size?: string;
  image?: string;
  hsCode?: string;
  materials?: string;
  privateLabel?: string;
  packaging?: string;
};

export default async function moreInfoPrompt(): Promise<{
  moreInfo: MoreInfoType;
}> {
  const questions = [
    {
      type: "input",
      name: "packaging",
      message: "Add packaging type",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the packaging product please...".green;
      },
    },
    {
      type: "input",
      name: "volume",
      message: "add the product volume",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the product volume please...".green;
      },
    },
    {
      type: "input",
      name: "privateLabel",
      message: "Private Label MOQ?",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type is the product has private label please...".green;
      },
    },
    {
      type: "input",
      name: "url",
      message: "Add the url product",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the weight product  please...".green;
      },
    },
    {
      type: "input",
      name: "image",
      message: "Add the image product path",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the weight product  please...".green;
      },
    },

    {
      type: "input",
      name: "materials",
      message: "Add the product materials",
      default: false,
      validate(answer: string) {
        if (answer.length) return true;
        return "Type the materials product please...".green;
      },
    },
  ];

  let moreInfo: MoreInfoType = {};

  for (const q of questions) {
    const { confirm } = await makeQuestionPrompt(q.name);
    if (confirm) {
      const answer = await inquirer.prompt(q);
      moreInfo = { ...moreInfo, ...answer };
    }
  }

  return { moreInfo };
}
