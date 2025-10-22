import { Router } from "express";
import ActionController from "../controllers/action.controller";
const router = Router();


router.get('/status', ActionController.getStatus);

router.post('/insert-coin', ActionController.insertCoin);
router.post('/select-product', ActionController.selectProduct);
router.post('/cancel', ActionController.cancel);

export default router;
