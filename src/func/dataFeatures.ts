import fs from "fs";
import type { ProductType } from "./start.js";
import { nanoid } from "nanoid/non-secure";

const JSON_FILE =
  "/home/carlos/Documents/Development/nodeJs/aliQuotes/src/data/data.json";

export function getData(): ProductType[] {
  try {
    const data = fs.readFileSync(JSON_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Catched the following error: ", err);
    return [];
  }
}

export function saveData(product: ProductType) {
  const newProduct: ProductType & { id: string } = { ...product, id: nanoid() };
  const data = getData();
  data.push(newProduct);
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
  message(newProduct.title);
}

function message(product: string) {
  console.log("\n");
  console.log("The " + product.green + " was saved succesfully.");
  console.log("\n");
}
