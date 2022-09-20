import express from 'express';
import {
    upload,
    removeFile,
    uploadMultiple
} from '../controllers/master-datas/attachment.controller.js';
import uploadFile from '../shared/middleware/Upload.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attachments
 *   description: The Attachments managing API
 */

/**
 * @swagger
 * /api/attachment/upload:
 *   post:
 *     summary: Upload file
 *     consumes:
 *      - multipart/form-data
 *     tags: [Attachments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                  type: string
 *                  format: binary
 *     parameters:
 *      - in: formData
 *        name: file
 *        schema:
 *          type: file
 *        description: the file to upload
 *     responses:
 *       200:
 *         description: The file was successfully uploaded
 *       500:
 *         description: Some server error
 */
router.post("/upload", uploadFile.single("file"), upload);

/**
 * @swagger
 * /api/attachment/uploadMultiple:
 *   post:
 *     summary: Upload files
 *     consumes:
 *      - multipart/form-data
 *     tags: [Attachments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               [file]: {
 *                  type: array,
 *                  items: {
 *                      type: 'string',
 *                      format: binary
 *                  }
 *               }
 *     parameters:
 *      - in: formData
 *        name: file
 *        schema:
 *          type: file
 *        description: the file to upload
 *     responses:
 *       200:
 *         description: The file was successfully uploaded
 *       500:
 *         description: Some server error
 */
router.post("/uploadMultiple", uploadFile.array("files"), uploadMultiple);

/**
 * @swagger
 * /api/attachment/delete/{fileName}:
 *   delete:
 *     summary: Remove the file by name
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: The file name
 * 
 *     responses:
 *       200:
 *         description: The file was deleted
 *       404:
 *         description: The file was not found
 */
router.delete('/delete/:fileName', removeFile);

export default router;