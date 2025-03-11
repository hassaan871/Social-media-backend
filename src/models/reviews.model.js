import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviews: [
        {
            reviewerId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            reviewerRating: {
                type: Number,
                required: true
            },
            reviewerComment: {
                type: String,
                requied: true
            }
        }
    ],
    averageRating: {
        type: Number
    }
},{timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;