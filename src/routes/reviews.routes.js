import {
    addReviewController,
    deleteReviewController,
    replyReviewController
} from '../controllers/reviews.controller.js';
import auth from '../middlewares/auth.middleware.js';
import asyncHandler from '../utils/asyncHandler.js';

import express from "express";
const router = express.Router();

router.post('/add', [asyncHandler(auth)], asyncHandler(addReviewController));
router.delete('/delete/:id', [asyncHandler(auth)], asyncHandler(deleteReviewController));
router.put('/reply', [asyncHandler(auth)], asyncHandler(replyReviewController));

export default router;