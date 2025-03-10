import mongoose, { mongo } from "mongoose";
import { DB_NAME } from '../../constants.js';

const connectdb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongodb connected successfully...`);
    } catch (error) {
        console.error(`MongoDB connection Error: ${error}`);
    }
}

export default connectdb;