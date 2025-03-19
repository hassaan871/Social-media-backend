import ReviewController from '../controllers/reviews.controller.js';
import auth from '../middlewares/auth.middleware.js';
import asyncHandler from '../utils/asyncHandler.js';

import express from "express";
const router = express.Router();

//protected routes
router.post('/add', [asyncHandler(auth)], asyncHandler(ReviewController.addReview));
router.delete('/delete/:id', [asyncHandler(auth)], asyncHandler(ReviewController.deleteReview));
router.put('/reply', [asyncHandler(auth)], asyncHandler(ReviewController.replyReview));
router.get('/user/:id', [asyncHandler(auth)], asyncHandler(ReviewController.getReviews));

//not protected routes
router.get('/average/:id', asyncHandler(ReviewController.averageReview));

export default router;