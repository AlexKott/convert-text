const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/convert';

module.exports = {
    save(type, name, content) {
        const timeOut = type === 'html' ? 10000 : 100000;
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(type), timeOut);
        });
    }
};
