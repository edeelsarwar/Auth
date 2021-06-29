import mongoose from 'mongoose';
import config from '../config/index.js';

// connect to mongodb
// this will be called from main loaders index file
export default async () => {
    const connection = await mongoose.connect(config.databaseURL, { 
        useNewUrlParser: true, 
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true
    });
    return connection.connection.db;
};
