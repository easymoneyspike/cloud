import express from 'express';

import { getUsers, getUserByID, addUser, updateUser, deleteUser } from '../controller/userController.js'

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:id', getUserByID)
    .post('/', addUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router;