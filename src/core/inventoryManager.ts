import Product from "./interfaces/IProduct";


function getRandomInt(min: number, max: number): number { 
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export class InventoryManager {
    private products: Record<string, Product>;

    constructor(initialProducts?: Record<string, Product>) {
        this.products = initialProducts ?? this.initProducts();
    }

    private initProducts(): Record<string, Product> {
        return {
            coke: { price: 1.50, quantity: getRandomInt(5, 30) },
            pepsi: { price: 1.45, quantity: getRandomInt(5, 30) },
            water: { price: 0.90, quantity: getRandomInt(5, 30) },
        };
    }

    getProducts(): Record<string, Product> {
        return this.products;
    }

    getProduct(name: string): Product | undefined {
        return this.products[name.toLowerCase()];
    }

    decrementProduct(name: string): void {
        const product = this.getProduct(name);
        if (product && product.quantity > 0) {
            product.quantity--;
        }
    }

    reset(): void {
        this.products = this.initProducts();
    }

    addProduct(name: string, price: number, quantity: number): void {
        this.products[name.toLowerCase()] = { price, quantity };
    }
}
