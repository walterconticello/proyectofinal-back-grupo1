import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadImage = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: "fields",
    });
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
}