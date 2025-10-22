import { vendingMachine } from './vending-machine';


function displayHelp() {
    console.log("\n--- Vending Machine CLI ---");
    console.log("Commands:");
    console.log("  products - View available products");
    console.log("  insert [coin] - Insert a coin (e.g., insert 0.50)");
    console.log("  select [product] - Select a product (e.g., select coke)");
    console.log("  cancel - Cancel the current transaction");
    console.log("  reset - Reset the vending machine");
    console.log("  balance - Check your current balance");
    console.log("  exit - Exit the CLI");
    console.log("---------------------------");
}

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "products":
            console.log(vendingMachine.getProducts());
            break;
        case "insert":
            const coin = parseFloat(args[1]);
            if (isNaN(coin)) {
                console.log("Invalid coin value.");
            } else {
                console.log(vendingMachine.insertCoin(coin));
            }
            break;
        case "select":
            const product = args[1];
            if (!product) {
                console.log("Please specify a product.");
            } else {
                console.log(vendingMachine.selectProduct(product));
            }
            break;
        case "cancel":
            console.log(vendingMachine.cancel());
            break;
        case "reset":
            console.log(vendingMachine.reset());
            break;
        case "balance":
            console.log(`Current balance: ${vendingMachine.currentBalance.toFixed(2)}`);
            break;
        case "exit":
            console.log("Exiting...");
            process.exit(0);
        default:
            displayHelp();
            break;
    }
}

main();
