import fs from "fs";
import type { ProductType } from "./start.js";
import { nanoid } from "nanoid/non-secure";

const JSON_FILE =
  "/home/carlos/Documents/Development/nodeJs/aliQuotes/src/data/data.json";

export type FinalProductType = ProductType & { id: string };

export function getProducts(): FinalProductType[] {
  try {
    const data = fs.readFileSync(JSON_FILE, "utf8");
    const products: FinalProductType[] = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("Catched the following error: ", err);
    return [];
  }
}

export function addProducts(products: ProductType[]) {
  const newProducts = getProducts();
  products.forEach((product) => {
    const newProduct: FinalProductType = { ...product, id: nanoid() };
    newProducts.push(newProduct);
    message(newProduct.title);
  });
  fs.writeFileSync(JSON_FILE, JSON.stringify(newProducts, null, 2));
}

function message(product: string) {
  console.log("\n");
  console.log("The " + product.green + " was saved succesfully.");
  console.log("\n");
}

export function removeProducts(ids: string[]) {
  let products = getProducts();
  ids.forEach((idP) => (products = products.filter(({ id }) => id !== idP)));
  fs.writeFileSync(JSON_FILE, JSON.stringify(products, null, 2));
}
