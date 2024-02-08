import inquirer from "inquirer";
import {
  getProducts,
  removeProducts,
  type FinalProductType,
} from "../dataFeatures.js";

export default async function promptRemoveProducts() {
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
