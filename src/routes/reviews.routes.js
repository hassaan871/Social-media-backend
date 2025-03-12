import {
    addReviewController,
    deleteReviewController,
    getReviewsController,
    replyReviewController
} from '../controllers/reviews.controller.js';
import auth from '../middlewares/auth.middleware.js';
import asyncHandler from '../utils/asyncHandler.js';

import express from "express";
const router = express.Router();

router.post('/add', [asyncHandler(auth)], asyncHandler(addReviewController));
router.delete('/delete/:id', [asyncHandler(auth)], asyncHandler(deleteReviewController));
router.put('/reply', [asyncHandler(auth)], asyncHandler(replyReviewController));
router.get('/user/:id', [asyncHandler(auth)], asyncHandler(getReviewsController));

export default router;