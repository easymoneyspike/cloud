import express from "express";
import { loginUser } from '../controller/loginController.js';

const router = express.Router();

router
    .post('/', loginUser)
    
export default router;