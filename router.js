const express = require('express');
const router = express.Router();
const Queue = require('promise-queue');
const fileManager = require('./fileManager');
const converter = require('./converter');

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
                .then(() => console.log('success'))
                .catch((error) => console.log(error));
        } else if (type === 'pdf') {
            pdfQueue
                .add(() => {
                    return converter.save(type, req.body.name, req.body.content);
                })
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
        }
        res.send({
            queueLength: htmlQueue.getQueueLength() + pdfQueue.getQueueLength(),
            pendingLength: htmlQueue.getPendingLength() + pdfQueue.getPendingLength()
        });
    });

module.exports = router;
