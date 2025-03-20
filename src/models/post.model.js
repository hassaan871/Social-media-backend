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
    ]
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