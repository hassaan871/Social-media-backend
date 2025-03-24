import auth from '../middlewares/auth.middleware.js';
import CommentController from '../controllers/comment.controller.js';

import express from 'express';
const router = express.Router();

router.post('/add/:postId', [auth], CommentController.addComment);

export default router;