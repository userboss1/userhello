const MongoClient = require('mongodb').MongoClient;

const state = {

    db: null

};

module.exports.connect = async function (done) {


    const url = "mongodb+srv://db_username:db_password@cluster0.jdva4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    const dbName = 'ecommerce';

    try {

        const client = await MongoClient.connect(url);

        state.db = client.db(dbName);
         done();
    } 
    catch (err) { done(err); }
};

    module.exports.get = function () {
        return state.db;

    };
