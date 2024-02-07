import inquirer from "inquirer";
import { getData, saveData } from "./dataFeatures.js";
async function initialMenu() {
    const questions = [
        {
            type: "list",
            name: "answer",
            message: "Welcome to AliQuotes. What do you want?",
            choices: [
                { value: 1, name: "Add Quote" },
                { value: 2, name: "List Quotes" },
                { value: 0, name: "Close App" },
            ],
        },
    ];
    console.clear();
    const { answer } = await inquirer.prompt(questions);
    return answer;
}
export async function startApp() {
    const answerUser = await initialMenu();
    processAnswer(answerUser);
}
async function processAnswer(answer) {
    switch (answer) {
        case 1:
            driveAction(newQuote);
            break;
        case 2:
            driveAction(listQuotes);
            break;
        case 0:
            console.log("¡Closing AliQuotes...!".green);
            return;
        default:
            startApp();
            break;
    }
}
async function driveAction(callback) {
    await callback();
    await restartApp();
}
async function restartApp() {
    const questions = [
        {
            type: "list",
            name: "answer",
            message: "Restart AliQuotes?",
            choices: [
                { value: true, name: "Yes" },
                { value: false, name: "Not" },
            ],
        },
    ];
    const { answer } = await inquirer.prompt(questions);
    if (answer)
        startApp();
}
async function newQuote() {
    const questions = [
        {
            type: "input",
            name: "title",
            message: "Add product name",
            validate(answer) {
                if (answer.length)
                    return true;
                return "Type a product name please...";
            },
        },
        {
            type: "input",
            name: "price",
            message: "Add product price",
            validate(answer) {
                if (answer.length)
                    return true;
                return "Type a product price please...".green;
            },
        },
    ];
    let answer = {};
    for (const question of questions) {
        const answerProp = await inquirer.prompt(question);
        answer = { ...answer, ...answerProp };
    }
    saveData(answer);
}
function listQuotes() {
    const { products } = getData();
    console.log("Products quotes are:");
    products.forEach((product, index) => {
        const pos = ((index + 1).toString() + ".").green;
        console.log(`${pos} ${product.title} : $${product.price}`);
    });
    console.log("\n");
}
//# sourceMappingURL=start.js.map