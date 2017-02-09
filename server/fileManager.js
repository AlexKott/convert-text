const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/convert';

module.exports = {
    create(data) {
        MongoClient.connect(url, (err, db) => {
            if (!err) {
                db
                    .collection('files')
                    .insertOne(Object.assign({}, data, { isPending: true }), () => {
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
                db
                    .collection('files')
                    .updateOne({ name: data.name }, { $set: { isPending: false, path: data.path } }, () => {
                        console.log('updated');
                        // db.close();
                    });
            } else {
                console.log(err);
            }
        });
    },
    getAll() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (!err) {
                    db
                        .collection('files')
                        .find({}, (err, cursor) => {
                            if (!err) {
                                resolve(cursor.toArray());
                            } else {
                                reject(err);
                            }
                        });
                } else {
                    reject(error);
                }
            })
        });
    }
}
