import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

//  1. POST - create a user
router.post('/', userController.createUser);

export default router;