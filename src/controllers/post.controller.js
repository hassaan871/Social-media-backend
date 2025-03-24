import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

const PostController = {
    addPost: asyncHandler(async (req, res) => {
        let imagesArr = [];
        let videoObj = null;

        // Validate that both images and video are not uploaded together
        // if (req.files.images && req.files.images.length > 0 && req.files.video) {
        //     return res.status(400).json({ "error-message": "You can only upload images OR a video, not both." });
        // }


        const caption = req.body.caption;
        if (!caption) return res.status(400).json({
            success: false,
            message: "post caption is required."
        });

        if (req.files.images && req.files.images.length > 0) {
            for (const file of req.files.images) {
                const upload = await uploadOnCloudinary(file.path);
                imagesArr.push({
                    url: upload.secure_url
                });
            }
        }

        if (req.files.video) {
            const upload = await uploadOnCloudinary(req.files.video[0].path);
            videoObj = {
                url: upload.secure_url
            };
        }

        const post = new Post({
            author: req.user.id,
            caption,
            images: imagesArr,
            video: videoObj
        });

        await post.save();
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });
    }),

    getPost: asyncHandler(async (req, res) => {
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({
            success: false,
            message: "No post found"
        });

        const comments = await Comment.find({
            post: postId
        });

        return res.status(200).json({
            success: true,
            message: "Post found",
            post,
            comments
        });
    }),
}

export default PostController;