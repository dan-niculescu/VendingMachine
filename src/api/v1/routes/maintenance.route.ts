import { Router } from "express";
import MaintenanceController from '../controllers/maintenance.controller';
const router = Router();

router.get('/reset', MaintenanceController.resetVendingMachine);

export default router;
