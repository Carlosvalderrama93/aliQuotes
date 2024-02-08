import inquirer from "inquirer";
import { getProducts, type FinalProductType } from "../dataFeatures.js";
import type { ProductPromptType } from "./addProducts.js";

export default function promptListProducts(toList: FinalProductType[] = []) {
  if (!toList.length) toList = getProducts();

  if (!toList.length) {
    console.clear();
    console.log("There is not products to delete...".red);
    console.log("\n");
    return;
  }

  console.log("Products quotes are:");
  toList.forEach((product: ProductPromptType, index: number) => {
    const pos = ((index + 1).toString() + ".").green;
    console.log(`${pos} ${product.title} : $${product.price}`);
  });

  console.log("\n");
}
