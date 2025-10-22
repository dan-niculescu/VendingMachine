function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class VendingMachine {
    private products: Record <string, Product>;
    private acceptedCoins: number[];
    public currentBalance: number;

    constructor() {
        this.products = this.initProducts();
        this.acceptedCoins = [0.05, 0.10, 0.20, 0.50, 1, 2];
        this.currentBalance = 0;
    }

    insertCoin(coin: number): string {
        if (this.acceptedCoins.includes(coin)) {
            this.currentBalance += coin;
            return `Inserted ${coin.toFixed(2)}. Current balance: ${this.currentBalance.toFixed(2)}`;
        } else {
            return "Invalid coin. Please insert a valid coin.";
        }
    }

    selectProduct(productName: string): string {
        productName = productName.toLowerCase();
        if (!this.products[productName]) {
            return "Invalid product.";
        }

        const product = this.products[productName];
        if (product.quantity <= 0) {
            return `${productName.charAt(0).toUpperCase() + productName.slice(1)} is out of stock.`;
        }

        if (this.currentBalance < product.price) {
            return `Insufficient balance. Please insert more coins. Price: ${product.price.toFixed(2)}, Balance: ${this.currentBalance.toFixed(2)}`;
        }

        const change = this.currentBalance - product.price;
        product.quantity--;
        this.currentBalance = 0;
        return `Dispensing ${productName.charAt(0).toUpperCase() + productName.slice(1)}. Your change is ${change.toFixed(2)}`;
    }

    cancel(): string {
        const refund = this.currentBalance;
        this.currentBalance = 0;
        return `Request cancelled. Refunding ${refund.toFixed(2)}`;
    }

    reset(): string {
        this.products = this.initProducts();
        this.currentBalance = 0;
        return "Vending machine has been reset.";
    }

    getProducts() {
        return this.products;
    }

    initProducts() {
        return {
            coke: { price: 1.50, quantity: getRandomInt(5, 30) },
            pepsi: { price: 1.45, quantity: getRandomInt(5, 30) },
            water: { price: 0.90, quantity: getRandomInt(5, 30) },
        };
    }
}

export const vendingMachine = new VendingMachine();
