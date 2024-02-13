import inquirer from "inquirer";

import { getProducts } from "../dataFeatures.js";
import promptListProducts from "./listProducts.js";
import type { Product, QuestionPromptType } from "./addProduct/addProducts.js";
import type { BasicInfoType } from "./addProduct/basicInfo.js";
import type { PriceType } from "./addProduct/price.js";
import type { SampleType } from "./addProduct/sample.js";
import type { MoreInfoType } from "./addProduct/moreInfo.js";
import type { VariationsType } from "./addProduct/variation.js";

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

  const { title } = await inquirer.prompt(questions);
  const list = filteredProducts(title);
  promptListProducts({ filtered: true, list });
}

function filteredProducts(toSearch: string): Product[] {
  const products = getProducts();
  const filteredProducts: Product[] = products.filter((product) => {
    const values: string[] = valuesUnificator(product);
    const finded = finderMatch(toSearch, values);
    if (finded) return product;
  });
  return filteredProducts;
}

function finderMatch(what: string, where: string[]) {
  const finded: boolean = where.some((e) => e.toLowerCase().includes(what));
  return finded;
}

export function valuesUnificator(
  product: Product,
  index: number = 0
): string[] {
  const productValues = Object.values(product);
  const mergedValues = productValues.reduce(
    (prev, crr) => {
      const values = Object.values(crr);
      if (typeof crr === "string") return [...prev, crr];
      return [...prev, ...values];
    },
    index ? [index.toString()] : []
  );

  return mergedValues;
}
