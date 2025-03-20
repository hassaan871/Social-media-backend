import auth from '../middlewares/auth.middleware.js';
import PostController from '../controllers/post.controller.js';
import upload from '../middlewares/multer.middleware.js';

import express from 'express';
const router = express.Router();

router.post('/upload', [auth, upload.fields([
    { name: 'images', maxCount: 10},
    { name: 'video', maxCount: 1}
])], PostController.addPost);

export default router;