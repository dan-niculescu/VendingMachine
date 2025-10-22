import { Request, Response } from 'express';
import { vendingMachine } from '../../../core/vending-machine';

export default class ActionController {

    public static insertCoin(req: Request, res: Response) {
        const { coin } = req.body;
        if (!coin) {
            return res.status(400).send('Coin value is required.');
        }
        const message = vendingMachine.insertCoin(parseFloat(coin));
        res.send(message);
    }

    public static selectProduct(req: Request, res: Response) {
        const { productName } = req.body;
        if (!productName) {
            return res.status(400).send('Product name is required.');
        }
        const message = vendingMachine.selectProduct(productName);
        res.send(message);
    }

    public static cancel(req: Request, res: Response) {
        const message = vendingMachine.cancel();
        res.send(message);
    }

    public static getBalance(req: Request, res: Response) {
        res.json({
        products: vendingMachine.getProducts(),
        currentBalance: vendingMachine.currentBalance
        });
    }

}
