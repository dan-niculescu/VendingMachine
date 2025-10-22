import { VendingMachine } from '../src/core/vending-machine';

describe('VendingMachine', () => {
    let vendingMachine: VendingMachine;

    beforeEach(() => {
        vendingMachine = new VendingMachine();
    });

    it('should initialize with random quantities between 5 and 30', () => {
        const products = vendingMachine.getProducts();
        for (const productName in products) {
            const quantity = products[productName].quantity;
            expect(quantity).toBeGreaterThanOrEqual(5);
            expect(quantity).toBeLessThanOrEqual(30);
        }
    });

    it('should accept valid coins', () => {
        const initialBalance = vendingMachine.currentBalance;
        vendingMachine.insertCoin(0.50);
        expect(vendingMachine.currentBalance).toBe(initialBalance + 0.50);
    });

    it('should reject invalid coins', () => {
        const initialBalance = vendingMachine.currentBalance;
        vendingMachine.insertCoin(0.01);
        expect(vendingMachine.currentBalance).toBe(initialBalance);
    });

    it('should dispense product if balance is sufficient', () => {
        vendingMachine.insertCoin(2);
        const initialProducts = vendingMachine.getProducts();
        const cokeQuantity = initialProducts.coke.quantity;
        vendingMachine.selectProduct('coke');
        expect(vendingMachine.getProducts().coke.quantity).toBe(cokeQuantity - 1);
        expect(vendingMachine.currentBalance).toBe(0);
    });

    it('should not dispense product if balance is insufficient', () => {
        vendingMachine.insertCoin(0.10);
        const initialProducts = vendingMachine.getProducts();
        const cokeQuantity = initialProducts.coke.quantity;
        vendingMachine.selectProduct('coke');
        expect(vendingMachine.getProducts().coke.quantity).toBe(cokeQuantity);
        expect(vendingMachine.currentBalance).toBe(0.10);
    });

    it('should return change after dispensing product', () => {
        vendingMachine.insertCoin(2);
        vendingMachine.selectProduct('coke');
        // The exact change will depend on the price of coke, which is 1.50
        expect(vendingMachine.currentBalance).toBe(0);
    });

    it('should cancel transaction and refund balance', () => {
        vendingMachine.insertCoin(1);
        vendingMachine.cancel();
        expect(vendingMachine.currentBalance).toBe(0);
    });

    it('should reset the vending machine', () => {
        vendingMachine.insertCoin(1);
        vendingMachine.selectProduct('coke');
        vendingMachine.reset();
        const products = vendingMachine.getProducts();
        for (const productName in products) {
            const quantity = products[productName].quantity;
            expect(quantity).toBeGreaterThanOrEqual(5);
            expect(quantity).toBeLessThanOrEqual(30);
        }
        expect(vendingMachine.currentBalance).toBe(0);
    });
});