const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const router = require('./router');

app.use(express.static('./app'));
app.use('/files', express.static('./files'));
app.use(bodyParser());

app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
