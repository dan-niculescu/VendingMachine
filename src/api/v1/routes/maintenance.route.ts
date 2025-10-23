import { Router } from "express";
import MaintenanceController from '../controllers/maintenance.controller';
const router = Router();

router.delete('/reset', MaintenanceController.resetVendingMachine);

export default router;
