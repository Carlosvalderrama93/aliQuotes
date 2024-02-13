import promptStart from "../start.js";
import promptAddProducts from "./addProduct/addProducts.js";
import promptListProducts from "./listProducts.js";
import { printTablePrompt } from "./listTable.js";
import promptRemoveProducts from "./removeProducts.js";
import promptRestart from "./restart.js";
import PromptSearchProduct from "./searchProduct.js";

export default async function promptProcessator(answer: number) {
  switch (answer) {
    case 1:
      await promptAddProducts();
      await promptRestart();
      break;
    case 2:
      promptListProducts({ filtered: false, list: [] });
      await promptRestart();
      break;
    case 3:
      await promptRemoveProducts();
      await promptRestart();
      break;
    case 4:
      await PromptSearchProduct();
      await promptRestart();
      break;
    case 5:
      await printTablePrompt();
      await promptRestart();
      break;
    case 0:
      console.log("¡Closing AliQuotes...!".green);
      return;
    default:
      promptStart();
      break;
  }
}
