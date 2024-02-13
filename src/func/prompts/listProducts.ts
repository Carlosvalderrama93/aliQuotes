import { getProducts, toFinalStructure } from "../dataFeatures.js";
import type { Product } from "./addProduct/addProducts.js";

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
  const products = toList.map((product) => toFinalStructure(product));
  console.log("Products quotes are:");
  console.table(products);
  console.log("\n");
}
