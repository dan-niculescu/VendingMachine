import { Router } from "express";
import maintenanceRoute from './routes/maintenance.route';
const routerV1 = Router();

routerV1.get('/', (req, res) => {
    res.send('Welcome to the Vending Machine API!');
});

routerV1.use('/maintenance', maintenanceRoute);
export default routerV1;