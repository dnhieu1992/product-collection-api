import uploadFile from "../../shared/middleware/Upload.js";
import path from 'path';
import fs from 'fs';

const uploadImage = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
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

const getImage = (req, res) => {
    const fileName = req.params.fileName;
    const directoryPath = __basedir + "/assets/uploads/";
    res.sendFile(path.join(directoryPath, fileName));

    // res.download(directoryPath + fileName, fileName, (err) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: "Could not download the file. " + err,
    //         });
    //     }
    // });
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
    uploadImage,
    getImage,
    removeFile
};