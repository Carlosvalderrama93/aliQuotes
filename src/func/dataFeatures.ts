import fs from "fs";
import { nanoid } from "nanoid/non-secure";

import type { Product } from "./prompts/addProduct/addProducts.js";

const JSON_FILE =
  "/home/carlos/Documents/Development/NodeJs/aliQuotes/src/data/data.json";

export function getProducts(): Product[] {
  try {
    const data = fs.readFileSync(JSON_FILE, "utf8");
    const products: Product[] = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("Catched the following error: ", err);
    return [];
  }
}

export function createProduct(products: Product[]) {
  const newProducts = getProducts();
  products.forEach((product) => {
    const newProduct: Product = { ...product, id: nanoid() };
    newProducts.push(newProduct);
    message(newProduct.basic.title);
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

export function updateProduct(data: Product[]) {
  const products = getProducts();
  const newProducts = products.map((p) => data.find(({ id }) => id === p.id));
  fs.writeFileSync(JSON_FILE, JSON.stringify(newProducts, null, 2));
}
export function toBasicStructure(toTransform) {
  const {
    title,
    price,
    hsCode,
    packaging,
    volume,
    privateLabel,
    url,
    materials,
    samplePrice,
    sampleQuantity,
    sampleDelivery,
    colors,
    sizes,
    unitPrice,
    incoterm,
    moq,
    id,
  } = toTransform;

  const basic = {
    basic: { title, price, hsCode },
    moreInfo: { packaging, volume, privateLabel, url, materials },
    sample: { samplePrice, sampleQuantity, sampleDelivery },
    variations: { colors, sizes },
    price: { unitPrice, incoterm, moq },
    id,
  };

  return basic;
}

export function toFinalStructure(toTransform) {
  const {
    basic: { title, price, hsCode },
    moreInfo: { packaging, volume, privateLabel, url, materials },
    sample: { samplePrice, sampleQuantity, sampleDelivery },
    variations: { colors, sizes },
    price: { unitPrice, incoterm, moq },
    id,
  } = toTransform;

  const final = {
    title,
    price,
    hsCode,
    packaging,
    volume,
    privateLabel,
    url,
    materials,
    samplePrice,
    sampleQuantity,
    sampleDelivery,
    colors,
    sizes,
    unitPrice,
    incoterm,
    moq,
    id,
  };

  return final;
}
