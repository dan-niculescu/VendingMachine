import { CoinHandler } from "./coinHandler";
import { InventoryManager } from "./inventoryManager";
import { TransactionManager } from "./transactionManager";

export class VendingMachine {
    private coinHandler: CoinHandler;
    private inventoryManager: InventoryManager;
    private transactionManager: TransactionManager;

    constructor() {
        this.coinHandler = new CoinHandler();
        this.inventoryManager = new InventoryManager();
        this.transactionManager = new TransactionManager(this.coinHandler, this.inventoryManager);
    }

    insertCoin(coin: number): string {
        return this.coinHandler.insertCoin(coin);
    }

    selectProduct(productName: string): string {
        return this.transactionManager.purchase(productName);
    }

    cancel(): string {
        return this.transactionManager.cancel();
    }

    reset(): string {
        this.inventoryManager.reset();
        this.coinHandler.resetBalance();
        return "Vending machine has been reset.";
    }

    getProducts() {
        return this.inventoryManager.getProducts();
    }

    get currentBalance(): number {
        return this.coinHandler.getBalance();
    }
}

export const vendingMachine = new VendingMachine();