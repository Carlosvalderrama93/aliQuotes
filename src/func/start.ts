import { createInterface, type Interface } from "readline";

import { getData, saveData } from "./dataFeatures.js";

type Product = { name: string; price: number };

function printMenu(): void {
  console.clear();
  console.log("==============================".green);
  console.log("       AliQuotes App:".green);
  console.log("==============================".green);
  console.log(` ${"1:".green} Add Quote `);
  console.log(` ${"2:".green} List Quotes `);
  console.log(` ${"0:".green} Close App `);
}

export function start() {
  printMenu();
  userInput();
}

function userInput() {
  const readLine: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readLine.question("Select an option: ".green, (option: string) => {
    readLine.close();
    if (option === "1") newQuote();
    else if (option === "2") listQuotes();
    else console.log("¡Closing AliQuotes...!".green);
  });
}

function newQuote() {
  const readLine: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.question("Add product name: ", (name: string) => {
    readLine.question("Add price name: ", (price: string) => {
      const product: Product = { name, price: parseFloat(price) };
      saveData(product);
      readLine.close();
    });
  });

  readLine.once("close", () => restartApp());
}

function listQuotes() {
  const { products } = getData();
  console.log("Quotes are:");
  products.forEach((product: Product, index: number) =>
    console.log(`${index + 1}. ${product.name}: $${product.price}`)
  );
  restartApp();
}

function restartApp() {
  const readLine: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.question(
    "Do you want run the app again? (Y/N)".green,
    (answer: string) => {
      readLine.close();
      if (answer.toLocaleLowerCase() === "n") process.exit();
      else if (answer.toLocaleLowerCase() === "y") start();
      else {
        console.log("Select a valid option".red);
        restartApp();
      }
    }
  );
}
