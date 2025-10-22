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

    it('should return a message when inserting a valid coin', () => {
        const msg = vendingMachine.insertCoin(0.50);
        expect(msg).toContain('Inserted 0.50');
        expect(msg).toContain('Current balance: 0.50');
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

    it('should return refund message when cancelling', () => {
        vendingMachine.insertCoin(1);
        const msg = vendingMachine.cancel();
        expect(msg).toBe('Transaction cancelled. Refunding 1.00');
    });


    it('should reject invalid product selection', () => {
        const msg = vendingMachine.selectProduct('sprite');
        expect(msg).toBe('Invalid product.');
    });


    it('should cancel transaction and refund balance', () => {
        vendingMachine.insertCoin(1);
        vendingMachine.cancel();
        expect(vendingMachine.currentBalance).toBe(0);
    });

    it('should return correct change', () => {
        vendingMachine.insertCoin(2);
        const msg = vendingMachine.selectProduct('water'); // price 0.90
        expect(msg).toContain('Your change is 1.10');
    });

    it('should not dispense if product is out of stock', () => {
        const products = vendingMachine.getProducts();
        products.coke.quantity = 0;
        const msg = vendingMachine.selectProduct('coke');
        expect(msg).toContain('out of stock');
    });

    it('should accumulate balance across multiple coins', () => {
        vendingMachine.insertCoin(1);
        vendingMachine.insertCoin(0.50);
        expect(vendingMachine.currentBalance).toBe(1.50);
    });


    it('should reset products and balance', () => {
        vendingMachine.insertCoin(2);
        vendingMachine.selectProduct('coke');
        vendingMachine.reset();
        expect(vendingMachine.currentBalance).toBe(0);
        const products = vendingMachine.getProducts();
        Object.values(products).forEach(p => {
            expect(p.quantity).toBeGreaterThanOrEqual(5);
            expect(p.quantity).toBeLessThanOrEqual(30);
        });
    });

});