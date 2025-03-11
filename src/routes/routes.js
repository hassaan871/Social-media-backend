import express from "express";
const router = express.Router();

import userRoutes from './user.routes.js';

router.use('/v1/user', userRoutes);

export default router;

