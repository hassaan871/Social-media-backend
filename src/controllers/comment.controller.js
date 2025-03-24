import Comment from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const CommentController = {
    addComment: asyncHandler(async (req, res) => {
        const { content, parentComment } = req.body;
        if(!content) return res.status(400).json({
            success: false,
            message: "Message Content is required."
        });

        const newComment = new Comment({
            content,
            post: req.params.postId,
            author: req.user.id,
            parentComment:  parentComment || null
        });

        await newComment.save();
        return res.status(201).json({
            success: true,
            message: "Comment posted successfully",
            newComment
        });
    }),
};

export default CommentController;