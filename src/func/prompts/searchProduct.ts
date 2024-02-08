import inquirer from "inquirer";

import { getProducts, type FinalProductType } from "../dataFeatures.js";
import promptListProducts from "./listProducts.js";
import type { QuestionPromptType } from "./addProducts.js";

export default async function PromptSearchProduct() {
  const questions: QuestionPromptType[] = [
    {
      type: "input",
      name: "title",
      message: "Search a product",
      validate(answer: string) {
        if (answer.length) return true;
        return "Type a product name please...";
      },
    },
  ];

  const { title } = await inquirer.prompt(questions); // m
  const toList = filteredProducts(title);
  promptListProducts(toList);
}

function filteredProducts(toSearch: string): FinalProductType[] {
  const products = getProducts();

  const filteredProducts: FinalProductType[] = products.filter((product) => {
    const values: string[] = Object.values(product);
    const isTrue = values.some((value) =>
      value.toLowerCase().includes(toSearch)
    );
    if (isTrue) return product;
  });

  return filteredProducts;
}
