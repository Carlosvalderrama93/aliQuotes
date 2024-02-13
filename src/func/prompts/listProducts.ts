import chalk from "chalk";
import inquirer from "inquirer";
import table from "inquirer-table-input";

import { getProducts } from "../dataFeatures.js";
import type { Product } from "./addProduct/addProducts.js";
import { keysUnificator, valuesUnificator } from "./searchProduct.js";

type Props = { filtered: boolean; list: Product[] };

export default function promptListProducts(props: Props) {
  if (props.filtered) {
    if (props.list.length) return printList(props.list);
    return printEmptyList();
  }

  const products = getProducts();
  if (products.length) return printList(products);
  return printEmptyList();
}

function printEmptyList() {
  console.clear();
  console.log("There is not products to delete...".red);
  console.log("\n");
}

function printList(toList: Product[]) {
  console.log("Products quotes are:");
  toList.forEach((product, index: number) => {
    const pos = ((index + 1).toString() + ".").green;
    console.log(`${pos} ${product.basic.title} : $${product.price}`);
  });
  console.log("\n");
}
