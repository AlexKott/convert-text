const express = require('express');
const bodyParser = require('body-parser');
const Queue = require('promise-queue');
const app = express();
const PORT = 3000;
const converter = require('./converter');

const htmlQueue = new Queue(1, Infinity);
const pdfQueue = new Queue(2, Infinity);

app.use(express.static('./app'));
app.use(bodyParser());

app.post('/api', (req ,res) => {
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
