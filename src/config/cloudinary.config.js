import cloudinary from 'cloudinary';
const cloudinaryV2 = cloudinary.v2;
import appConfig from './app.config.js';
import fs from 'fs';

cloudinaryV2.config({
    cloud_name: appConfig.CLOUDINARY_NAME,
    api_key: appConfig.CLOUDINARY_KEY,
    api_secret: appConfig.CLOUDINARY_SECRET
});

const uploadSingle = (file) => {
    return new Promise(resolve => {
        cloudinaryV2.uploader.upload(file, {
            folder: "assets",
            resource_type: "auto"
        })
            .then(result => {
                if (result) {
                    fs.unlinkSync(file)
                    resolve(result.secure_url)
                }
            }).catch(err => {
                console.log("error", err)
            })
    })
}

const removeFile = (fileName) => {
    return new Promise(resolve => {
        cloudinaryV2.uploader.destroy(fileName, function (error, result) {
            console.log(result, error)
            resolve(result)
        })
    })
}

const removFiles = (files = ['image1', 'image2']) => {
    return new Promise(resolve => {
        cloudinary.v2.api.delete_resources(files,
            function (error, result) {
                console.log(result);
                resolve(result)
            });
    })
}

export {
    uploadSingle,
    removeFile,
    removFiles
}