const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

const initDb = (callback) => {
    MongoClient.connect(process.env.MONGO_URL,)
        .then((client) => {
            database = client.db();
            console.log('Connected to MongoDB');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (database) {
        return database;
    } else {
        throw new Error('Database not initialized.');
    }
};

module.exports = {
    initDb,
    getDatabase
};