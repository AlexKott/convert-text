const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const router = require('./server/router');

const NotificationService = require('./server/notificationService');
const notificationService = new NotificationService();

notificationService.init();

app.use(express.static('./app'));
app.use('/files', express.static('./files'));
app.use(bodyParser());

app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
