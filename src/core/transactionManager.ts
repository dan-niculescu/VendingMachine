import { CoinHandler } from "./coinHandler";
import { InventoryManager } from "./inventoryManager";

export class TransactionManager {
    constructor(
        private coinHandler: CoinHandler,
        private inventoryManager: InventoryManager
    ) {}

    purchase(productName: string): string {
        const product = this.inventoryManager.getProduct(productName);
        if (!product) return "Invalid product.";

        if (product.quantity <= 0) {
            return `${productName} is out of stock.`;
        }

        const balance = this.coinHandler.getBalance();
        if (balance < product.price) {
            return `Insufficient balance. Price: ${product.price.toFixed(2)}, Balance: ${balance.toFixed(2)}`;
        }

        this.inventoryManager.decrementProduct(productName);
        const changeAmount = +(balance - product.price).toFixed(2);
        const changeCoins = this.coinHandler.calculateChange(changeAmount);

        this.coinHandler.resetBalance();

        return `Dispensing ${productName}. Change: ${changeCoins.join(", ") || "0.00"}`;
    }

    cancel(): string {
        const refund = this.coinHandler.resetBalance();
        return `Transaction cancelled. Refunding ${refund.toFixed(2)}`;
    }
}
