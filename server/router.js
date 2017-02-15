const express = require('express');
const router = express.Router();
const Queue = require('./Queue.js');
const fileManager = require('./fileManager');
const converter = require('./converter');
const NotificationService = require('./notificationService');
const notificationService = new NotificationService();

const queue = new Queue(1, Infinity);

router.route('/api')
    .get((req, res) => {
        fileManager
            .getAll()
            .then(fileList => res.send(fileList))
            .catch(error => res.status(500).send(error));
    })
    .post((req ,res) => {
        const type = req.body.type;
        let queueingType = 'add';
        fileManager.create({ name: req.body.name, type, createdAt: new Date() });

        if (type === 'html') {
            queueingType = 'unshift';
        }
        queue[queueingType](() => {
                return converter.save(type, req.body.name, req.body.content);
            })
            .then((info) => {
                notificationService.broadcast('update', `${info.fileName} was converted to ${info.fileType} and is ready to download.`);
            })
            .catch((error) => {
                console.log(error);
                notificationService.broadcast('error', 'There was an error converting the file.');
            });
        const queueLength = queue.getQueueLength();
        const pendingLength = queue.getPendingLength();

        res.send({
            message: `File is being converted. Currently converting ${pendingLength} files, ${queueLength} files on the waiting list.`
        });
    });

module.exports = router;
