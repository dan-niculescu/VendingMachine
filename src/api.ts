import express from 'express';
import { VendingMachine } from './vending-machine';

const app = express();
const port = 3000;
const vm = new VendingMachine();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Vending Machine API!');
});

app.get('/products', (req, res) => {
    res.json(vm.getProducts());
});

app.post('/insert-coin', (req, res) => {
    const { coin } = req.body;
    if (coin === undefined) {
        return res.status(400).send('Coin value is required.');
    }
    const message = vm.insertCoin(parseFloat(coin));
    res.send(message);
});

app.post('/select-product', (req, res) => {
    const { productName } = req.body;
    if (!productName) {
        return res.status(400).send('Product name is required.');
    }
    const message = vm.selectProduct(productName);
    res.send(message);
});

app.post('/cancel', (req, res) => {
    const message = vm.cancel();
    res.send(message);
});

app.post('/reset', (req, res) => {
    const message = vm.reset();
    res.send(message);
});

app.get('/state', (req, res) => {
    res.json({
        products: vm.getProducts(),
        currentBalance: vm.currentBalance,
    });
});

app.listen(port, () => {
    console.log(`Vending machine API listening at http://localhost:${port}`);
});
