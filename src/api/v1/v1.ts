import { Router } from "express";
import maintenanceRoute from './routes/maintenance.route';
import product from './routes/product.route';
import action from "./routes/action.route";

const routerV1 = Router();

routerV1.get('/', (req, res) => {
    res.send('Welcome to the Vending Machine API!');
});

routerV1.use('/maintenance', maintenanceRoute);
routerV1.use('/products', product);
routerV1.use('/actions', action);

export default routerV1;