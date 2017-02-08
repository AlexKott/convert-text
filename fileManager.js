const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/convert';

module.exports = {
    create(data) {
        MongoClient.connect(url, (err, db) => {
            if (!err) {
                insertDocument(db, data, () => {
                    console.log('inserted document');
                    // db.close();
                });
            } else {
                console.log(err);
            }
        });
    },
    update(data) {
        MongoClient.connect(url, (err, db) => {
            if (!err) {
                updateDocument(db, data, () => {
                    console.log('updated document');
                    // db.close();
                });
            } else {
                console.log(err);
            }
        });
    }
}

function insertDocument(db, data, callback) {
    db
        .collection('files')
        .insertOne(Object.assign({}, data, { isPending: true }), callback());
}
function updateDocument(db, data, callback) {
    db
        .collection('files')
        .updateOne({ name: data.name }, { $set: { isPending: false, path: data.path } }, callback());
}
