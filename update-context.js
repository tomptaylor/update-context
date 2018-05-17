var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

module.exports = function(context, cb) {
  const MONGO_URL = context.secrets.DB_KEY;
  var mytable = context.body.table;
  delete context.body.table;
  console.log(mytable);
  const model = context.body;

  MongoClient.connect(MONGO_URL, (err, result) => {
    if (err) console.log('err');
      let db = result.db('testtom');
      var collection = db.collection(`'${context.body.table}'`);
      db.collection(`${mytable}`).insertOne(model, (err, result) => {
      if (err)  cb(err,null);
      cb(null, result);
    });
  });
};