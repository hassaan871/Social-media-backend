import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewerRating: {
        type: Number,
        required: true
    },
    reviewerComment: {
        type: String,
        requied: true
    },
    userReply: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;