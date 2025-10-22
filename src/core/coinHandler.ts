export class CoinHandler {
    private acceptedCoins: number[];
    private balance: number;

    constructor(acceptedCoins: number[] = [0.05, 0.10, 0.20, 0.50, 1, 2]) {
        this.acceptedCoins = acceptedCoins;
        this.balance = 0;
    }

    insertCoin(coin: number): string {
        if (!this.acceptedCoins.includes(coin)) {
            return "Invalid coin. Please insert a valid coin.";
        }
        this.balance = +(this.balance + coin).toFixed(2);
        return `Inserted ${coin.toFixed(2)}. Current balance: ${this.balance.toFixed(2)}`;
    }

    getBalance(): number {
        return this.balance;
    }

    resetBalance(): number {
        const refund = this.balance;
        this.balance = 0;
        return refund;
    }

    calculateChange(amount: number): number[] {
        const change: number[] = [];
        let remaining = +(amount.toFixed(2));

        for (const coin of this.acceptedCoins.sort((a, b) => b - a)) {
            while (remaining >= coin - 1e-9) {
                change.push(coin);
                remaining = +(remaining - coin).toFixed(2);
            }
        }
        return change;
    }
}
