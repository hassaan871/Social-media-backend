import {
    userSignUpController,
    userLoginController
} from '../controllers/user.controller.js';
import asyncHandler from "../utils/asyncHandler.js";

import express from "express";
const router = express.Router();

router.post('/signup', asyncHandler(userSignUpController));
router.post('/login', asyncHandler(userLoginController));

export default router;