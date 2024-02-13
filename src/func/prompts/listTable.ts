import chalk from "chalk";
import inquirer from "inquirer";
import table from "inquirer-table-input";

import { valuesUnificator } from "./searchProduct.js";
import { getProducts } from "../dataFeatures.js";

export async function printTablePrompt() {
  const rows: string[][] = [rowGenerator()];
  const columns: {
    name: string;
    value: string;
  }[] = columnsGenerator();

  const questions = [
    {
      type: "table-input",
      name: "pricing",
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
  const tableList = await inquirer.prompt(questions);
}

function rowGenerator() {
  const products = getProducts();
  const list = products.map((product) => valuesUnificator(product)).flat();
  return list;
}

function columnsGenerator() {
  const keys = keysUnificator();
  return keys.map((key) => ({
    name: key,
    value: key,
  }));
}

export function keysUnificator(): string[] {
  const products = getProducts();
  const productValues = Object.values(products[0]);

  const mergedkeys = productValues.reduce((prev, crr) => {
    const keys = Object.keys(crr);
    if (typeof crr === "string") return [...prev]; // This should be the ID. But I need to find a better way to skip this iteration.
    return [...prev, ...keys];
  }, []);

  return mergedkeys;
}
