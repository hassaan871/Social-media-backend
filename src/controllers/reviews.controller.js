import Review from "../models/reviews.model.js";

const addReviewController = async (req, res) => {
    const reviewerId = req.user.id;
    const { userId, reviewerRating, reviewerComment } = req.body;
    
    if(!userId || !reviewerRating || !reviewerComment) return res.status(400).json({
        success: false,
        message: "userId, reviewerRating & reviewerComment, all three of them are required." 
    });

    if(userId === reviewerId) return res.status(400).json({
        success: false,
        message: "you can't review yourself"
    });

    if(reviewerRating > 5 || reviewerRating < 0) return res.status(400).json({
        success: false,
        message: "rating must be between 0 to 5"
    });
   
    const review = await Review.findOne({
        userId,
        reviewerId
    });

    if(review) return res.status(400).json({
        success: false,
        message: "You have already reviewed the user. you can edit your review but can't add another review"
    });

    const newReview = await Review.create({
        userId,
        reviewerId,
        reviewerRating,
        reviewerComment,
    });

    return res.status(201).json({
        success: true,
        message: "Review added",
        newReview
    });
}

const deleteReviewController = async (req, res) => {
    const userId = req.params.id;
    const reviewerId = req.user.id;
    
    const review = await Review.findOne({
        userId,
        reviewerId
    });

    if(!review) return res.status(400).json({
        success: false,
        message: "Invalid ID"
    });

    if(review.isDeleted) return res.status(400).json({
        success: false,
        message: "Review already deleted."
    });

    review.isDeleted = true;
    await review.save();

    return res.status(200).json({
        success: true,
        message: "Review deleted successfully."
    });
}

export {
    addReviewController,
    deleteReviewController
}