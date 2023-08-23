import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "dmmviigbv",
    api_key: "556229154427896",
    api_secret: "wSD4Wi_VZAJo2YAH2YRTuTmmxbo",
});

export const uploadImage = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: "fields",
    });
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
}