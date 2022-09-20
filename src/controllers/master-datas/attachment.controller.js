import path from 'path';
import fs from 'fs';
import { uploadSingle } from '../../config/cloudinary.config.js';

const upload = async (req, res) => {
    try {
        uploadSingle(req.file.path).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send({
                message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            });
        })
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const uploadMultiple = async (req, res) => {
    try {
        let result = []
        for (const file of req.files) {
            let data = await uploadSingle(file.path)
            result.push(data)
        }
        return res.status(200).send(result);
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};


const removeFile = (req, res) => {
    try {
        const fileName = req.params.fileName;
        const directoryPath = __basedir + "/assets/uploads/";
        fs.unlinkSync(path.join(directoryPath, fileName));
        res.status(200).send({
            message: 'The file removed success.',
        });
    } catch (exp) {
        res.status(500).send({
            message: `Could not remove the file: ${fileName}. ${err}`,
        });
    }

}

export {
    upload,
    removeFile,
    uploadMultiple
};