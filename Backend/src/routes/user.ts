import { Router } from "express";
import controller from "../controller";
import { hasValidAmount } from "../middlewares";
// import controller from "../controllers";
// import {authenticateUser, validateRequest} from '../middleware';
// import validators from "../validators";

const router = Router();

router.post("/userData",controller.Users.userdetails);
router.put("/update-points",controller.Users.updatePoints);
router.post("/swamp",controller.Users.swamp);
router.get('/getTransactionInfo',hasValidAmount("fillTransaction"),controller.Users.getTransaction);
router.post('/getTransactionMessages',hasValidAmount("queryTransaction"),controller.Users.getTransactionMsg)
router.post('/getNeox',controller.Users.getNeox)
router.post('/fillWallet',hasValidAmount("fillWallet"),controller.Users.fillWallet)
router.post('/queryWallet',hasValidAmount("queryWallet"),controller.Users.queryWallet)
router.post('/avatars',controller.Users.avatars);
router.post('/buyAvatar',controller.Users.buyAvatar);
router.post('/activeAvatar',controller.Users.activeAvatar);


export default router;

