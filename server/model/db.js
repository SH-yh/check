const MongoClient = require('mongodb').MongoClient;
const dbPath = "mongodb://localhost:27017/check";
const _connecteMongo = (cb) => {
    MongoClient.connect(dbPath,(err, db) => {
        if(err) throw new Error(err);
        typeof cb == 'function' && cb(db);
    });
};
