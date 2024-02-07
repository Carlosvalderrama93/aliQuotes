import { createInterface } from "readline";
import { getData, saveData } from "./dataFeatures.js";
function printMenu() {
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
    const readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readLine.question("Select an option: ".green, (option) => {
        readLine.close();
        if (option === "1")
            newQuote();
        else if (option === "2")
            listQuotes();
        else
            console.log("¡Closing AliQuotes...!".green);
    });
}
function newQuote() {
    const readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readLine.question("Add product name: ", (name) => {
        readLine.question("Add price name: ", (price) => {
            const product = { name, price: parseFloat(price) };
            saveData(product);
            readLine.close();
        });
    });
    readLine.once("close", () => restartApp());
}
function listQuotes() {
    const { products } = getData();
    console.log("Quotes are:");
    products.forEach((product, index) => console.log(`${index + 1}. ${product.name}: $${product.price}`));
    restartApp();
}
function restartApp() {
    const readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readLine.question("Do you want run the app again? (Y/N)".green, (answer) => {
        readLine.close();
        if (answer.toLocaleLowerCase() === "n")
            process.exit();
        else if (answer.toLocaleLowerCase() === "y")
            start();
        else {
            console.log("Select a valid option".red);
            restartApp();
        }
    });
}
//# sourceMappingURL=start.js.map