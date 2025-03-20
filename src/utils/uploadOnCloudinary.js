import { v2 } from "cloudinary";
import fs from 'fs';

const CLOUDINARY_CLOUD_NAME = "djvprjp4j";
const CLOUDINARY_API_KEY = "493142362631169";
const CLOUDINARY_API_SECRET = "TdZWgsCqZ1sHWUivqyvr9Cvrgr0";

v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log( "cloud-name: " , process.env.CLOUDINARY_CLOUD_NAME);
        console.log( "api-key: " , process.env.CLOUDINARY_API_KEY);
        console.log( "api-secret: " , process.env.CLOUDINARY_API_SECRET);
        
        if (!localFilePath) return null;
        const upload = await v2.uploader.upload(localFilePath, { resource_type: 'auto' });
        fs.unlinkSync(localFilePath);
        return upload;
    } catch (error) {
        // fs.unlinkSync(localFilePath);
        console.error({
            success: false,
            message: "Cloudinary upload failed",
            error
        });
        return null;
    }
}

export default uploadOnCloudinary;