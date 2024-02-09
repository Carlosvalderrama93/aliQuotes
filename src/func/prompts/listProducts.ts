import inquirer from "inquirer";
import { getProducts } from "../dataFeatures.js";
import type { Product } from "./addProduct/addProducts.js";

type Props = { filtered: boolean; list: Product[] };

export default function promptListProducts(props: Props) {
  const products = getProducts();
  if (props?.filtered && props.list.length) return printList(props.list);
  if (products.length && !props) return printList(products);

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
