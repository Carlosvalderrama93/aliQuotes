import promptMenu from "./prompts/menu.js";
import promptProcessator from "./prompts/processator.js";

export default async function promptStart() {
  const answerUser: number = await promptMenu();
  promptProcessator(answerUser);
}
