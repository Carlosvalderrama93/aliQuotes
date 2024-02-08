import promptStart from "../start.js";
import promptAddProducts from "./addProducts.js";
import promptListProducts from "./listProducts.js";
import promptRemoveProducts from "./removeProducts.js";
import promptRestart from "./restart.js";
import PromptSearchProduct from "./searchProduct.js";

export default async function promptProcessator(answer: number) {
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
    case 4:
      driveAction(PromptSearchProduct);
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
