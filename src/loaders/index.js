import expressLoader from './express.js';
import dependencyInjectorLoader from './dependencyInjector.js';
import mongooseLoader from './mongoose.js';
import Logger from './logger.js';
import user from '../models/user.js';
import comments from '../models/comments.js';

// this is the main index file for loading all the required depdencies before listening to requests
// loading of expressjs that includes setup of all routes and middlewares
// loading of DI and attach the model class objects and logger to be access from other parts of application

export default async ({ expressApp }) => {
    try {

        // first load the mongodb 
        await mongooseLoader();
        Logger.info('✌️ DB loaded and connected!');

        // creating model indexes to ensure if the db doesn't exist already
        await user.createIndexes();
        await comments.createIndexes();

        const userModel = { name: 'User', model: user };
        const commentsModel = { name: 'Comments', model: comments };

        // now load the dependency injector 
        // this will set the provided models classes and logger
        // its not necessary for this assignment as mentioned in pdf, but using DI to show how it may be useful for writing test cases
        await dependencyInjectorLoader({
            models: [
                userModel,
                commentsModel
            ],
        });
        
        Logger.info('✌️ Dependency Injector loaded');

        // finally load the express routes and middlewares
        await expressLoader({ app: expressApp });
        Logger.info('✌️ Express loaded');
    } catch (e) {
        Logger.error('🔥 Error on dependency injector loader: %o', e);
        throw e;

    }
    
};