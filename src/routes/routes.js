import express from "express";
const router = express.Router();

import userRoutes from './user.routes.js';
import reviewsRoutes from './reviews.routes.js';
import postRoutes  from './post.routes.js';

router.use('/v1/user', userRoutes);
router.use('/v1/reviews', reviewsRoutes);
router.use('/v1/post', postRoutes);

export default router;

