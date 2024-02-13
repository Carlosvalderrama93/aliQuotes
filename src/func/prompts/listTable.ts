import chalk from "chalk";
import inquirer from "inquirer";
import table from "inquirer-table-input";

import { valuesUnificator } from "./searchProduct.js";
import {
  getProducts,
  toBasicStructure,
  updateProduct,
} from "../dataFeatures.js";
import type { Product } from "./addProduct/addProducts.js";

export async function printTablePrompt() {
  const rows: string[][] = rowsGenerator();
  const columns: {
    name: string;
    value: string;
  }[] = columnsGenerator();

  const questions = [
    {
      type: "table-input",
      name: "product",
      message: "PRICING",
      infoMessage: `Navigate and Edit`,
      hideInfoWhenKeyPressed: true,
      freezeColumns: 1,
      decimalPoint: ".",
      decimalPlaces: 2,
      selectedColor: chalk.yellow,
      editableColor: chalk.bgYellow.bold,
      editingColor: chalk.bgGreen.bold,
      columns,
      rows,
      validate: () => false /* See note ¹ */,
    },
  ];
  inquirer.registerPrompt("table-input", table);
  const { product } = await inquirer.prompt(questions);
  const adaptedProducts: Product[] = product.result.map((product) =>
    toBasicStructure(product)
  );

  updateProduct(adaptedProducts);
}

function columnsGenerator() {
  const keys = keysUnificator();
  return keys.map((key) => ({
    name: key,
    value: key,
    editable: "text",
  }));
}

export function keysUnificator(): string[] {
  const products = getProducts();
  const productValues = Object.values(products[0]);

  const mergedkeys = productValues.reduce(
    (prev, crr) => {
      const keys = Object.keys(crr);
      if (typeof crr === "string") return [...prev, "id"]; // This should be the ID. But I need to find a better way to skip this iteration.
      return [...prev, ...keys];
    },
    ["#"]
  );

  return mergedkeys;
}

function rowsGenerator() {
  const products = getProducts();
  const rows = products.map((product, i) => valuesUnificator(product, i + 1));

  return rows;
}
