const express = require('express');
const router = express.Router();
const Queue = require('promise-queue');
const fileManager = require('./fileManager');
const converter = require('./converter');
const NotificationService = require('./notificationService');
const notificationService = new NotificationService();

const htmlQueue = new Queue(1, Infinity);
const pdfQueue = new Queue(2, Infinity);

router.route('/api')
    .get((req, res) => {
        fileManager
            .getAll()
            .then(fileList => res.send(fileList))
            .catch(error => res.status(500).send(error));
    })
    .post((req ,res) => {
        const type = req.body.type;
        if (type === 'html') {
            htmlQueue
                .add(() => {
                    return converter.save(type, req.body.name, req.body.content);
                })
                .then((info) => {
                    notificationService.broadcast('confirm', `${info.fileName} was converted to ${info.fileType} and is ready to download.`);
                })
                .catch((error) => {
                    notificationService.broadcast('error', 'There was an error converting the file.');
                });
        } else if (type === 'pdf') {
            pdfQueue
                .add(() => {
                    return converter.save(type, req.body.name, req.body.content);
                })
                .then((info) => {
                    notificationService.broadcast('confirm', `${info.fileName} was converted to ${info.fileType} and is ready to download.`);
                })
                .catch((error) => {
                    notificationService.broadcast('error', 'There was an error converting the file.');
                });
        }
        const queueLength = htmlQueue.getQueueLength() + pdfQueue.getQueueLength();
        const pendingLength = htmlQueue.getPendingLength() + pdfQueue.getPendingLength();

        res.send({
            message: `File is being converted. Currently converting ${pendingLength} files, ${queueLength} files on the waiting list.`
        });
    });

module.exports = router;
