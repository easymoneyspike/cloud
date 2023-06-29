import express from 'express';
import { registerUser, verifierUser } from '../controller/registerController.js'

const router = express.Router();

router
    .post('/', registerUser)
    .post('/verifier', verifierUser)

export default router;