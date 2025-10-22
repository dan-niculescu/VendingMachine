import { Request, Response } from 'express';
import { vendingMachine } from '../../../vending-machine';

export default class ProductController {

    public static getProducts(req: Request, res: Response) {
        const message = vendingMachine.reset();
        res.status(200).json({ message });
    }

}
