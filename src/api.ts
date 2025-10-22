import express from 'express';
import { vendingMachine } from './vending-machine';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Vending Machine API!');
});

app.get('/products', (req, res) => {
    res.json(vendingMachine.getProducts());
});

app.post('/insert-coin', (req, res) => {
    const { coin } = req.body;
    if (coin === undefined) {
        return res.status(400).send('Coin value is required.');
    }
    const message = vendingMachine.insertCoin(parseFloat(coin));
    res.send(message);
});

app.post('/select-product', (req, res) => {
    const { productName } = req.body;
    if (!productName) {
        return res.status(400).send('Product name is required.');
    }
    const message = vendingMachine.selectProduct(productName);
    res.send(message);
});

app.post('/cancel', (req, res) => {
    const message = vendingMachine.cancel();
    res.send(message);
});

app.post('/reset', (req, res) => {
    const message = vendingMachine.reset();
    res.send(message);
});

app.get('/state', (req, res) => {
    res.json({
        products: vendingMachine.getProducts(),
        currentBalance: vendingMachine.currentBalance,
    });
});

app.listen(port, () => {
    console.log(`Vending machine API listening at http://localhost:${port}`);
});
