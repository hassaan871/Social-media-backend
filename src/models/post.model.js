import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String
    },
    images: [
        {
            url: { type: String }
        }
    ],
    video: [
        {
            url: { type: String }
        }
    ],
    isPremium: {
        type: Boolean,
        required: true,
        default: false
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

postSchema.pre('validate', function (next) {
    if(this.images.length > 0 && this.video){
        next(new Error('A post can contain either a images or video but not both'));
    }else{
        next();
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;