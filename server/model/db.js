const MongoClient = require('mongodb').MongoClient;
const dbPath = "mongodb://localhost:27017/check";
const _connecteMongo = (cb) => {
    MongoClient.connect(dbPath,(err, db) => {
        if(err) throw new Error(err);
        typeof cb == 'function' && cb(db);
    });
};
//获取绑定标记
exports.getBoundMark = (collectionName, query, cb) => {
    _connecteMongo((db)=>{
        db.collection(collectionName).findOne(query,(err, data)=>{
            if(err) throw new Error(err);
            typeof cb == "function" && cb(data);
            db.close();
        })
    });
};
//用户绑定账号
exports.bound = (collectionName, query, set, cb) => {
    _connecteMongo((db)=>{
        db.collection(collectionName).updateOne(query,{"$set":set},(err, data)=>{
            typeof cb == "function" && cb(data.result);
            db.close();
        })
    });
};
//获取用户当前时间后的两节课程
exports.getSomething = (collectionName, query, assign, cb) => {
    _connecteMongo((db)=>{
        db.collection(collectionName).findOne(query, assign, (err, res)=>{
            if(err) throw new Error(err);
            typeof cb == "function" && cb(res);
            db.close();
        });
    });
};
exports.getMany = (collectionName, query, assign, cb) => {
    _connecteMongo((db)=>{
        db.collection(collectionName).find(query, assign).toArray((err, res)=>{
            if(err) throw new Error(err);
            typeof cb == "function" && cb(res);
            db.close();
        });
    });
};
//更新数据库中某些内容
exports.updateSomething = (collectionName, query, set, cb)=>{
    _connecteMongo((db)=>{
        db.collection(collectionName).updateOne(query, set, (err, res)=>{
            typeof cb == "function" && cb(err, res.result);
            db.close();
        })
    })
};
exports.updateMay = (collectionName, query, set, cb)=>{
    _connecteMongo((db)=>{
        db.collection(collectionName).updateMany(query, set, (err, res)=>{
            typeof cb == "function" && cb(err, res.result);
            db.close();
        })
    })
};
exports.insertDocument = (collectionName, data, cb) => {
    _connecteMongo((db)=>{
        db.collection(collectionName).insertMany(data).then((result)=>{
            cb(result);
        });
    })
};