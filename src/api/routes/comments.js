import { Router } from 'express';
import CommentsService from '../../services/comments.js';
import middlewares from '../middlewares/index.js';
import { Container } from 'typedi';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const route = Router();

export default (app) => {

    // for this assignment I could use this logger directly
    // but i am using this DI for getting logger
    const logger = Container.get('logger');
    
    app.use('/comments', route);

    // middleware for logging the basic request info; defining directly into the route for specific logging
    route.use((req, res, next)=> {
        logger.debug(`${req.method}: /comments${req.url}`);
        next();
    });

    // this route shows the aggregation of topmentions with their occurance count.
    // there is also limit assigned to it that defaults to 20. See service class 
    route.get('/topmentions', async (req, res, next) => {
        try {
            const limit = req.query.limit;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.TopMentions(limit);
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // this route shows the aggregation of top hastags with their occurance count.
    // there is also limit assigned to it that defaults to 20. See service class 
    route.get('/tophastags', async (req, res, next) => {
        try {
            const limit = req.query.limit;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.TopHashTags(limit);
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // for getting all comments of specific user, id here represents the userId of the user
    // there is also limit assigned to it that defaults to 20. See service class 
    route.get('/user/:id', middlewares.validation.commonIdParameter, async (req, res, next) => {
        try {
            const { id } = req.params;
            const { limit } = req.query;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.GetAll({id, limit});
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // using post to add comment of a specific user
    route.post('/', middlewares.validation.postComment, async (req, res, next) => {
        try {
            const inputDTO = req.body;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.AddNew(inputDTO);
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // using patch method to handle updating of exisiting comment  object
    // it only updates those fields that are sent. null values are ignored and not updated
    route.patch('/:id', middlewares.validation.patchComment, async (req, res, next) => {
        try {
            const { id } = req.params;
            const inputDTO = req.body;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const info = await instance.Update({id, inputDTO});
            return res.success({},info);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // using delete method to handle deletion of exisiting comment object
    route.delete('/:id', middlewares.validation.commonIdParameter, async (req, res, next) => {
        try {
            const { id } = req.params;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const info = await instance.Delete({id});
            return res.success({}, info);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    
    // for getting information regarding specific comment, get request with comment id parameter
    route.get('/:id', middlewares.validation.commonIdParameter, async (req, res, next) => {
        try {
            const { id } = req.params;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.GetSingle({id});
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // route for getting all comments regardless of user by descinding order of date
    // there is also limit assigned to it that defaults to 20. See service class 
    route.get('/', async (req, res, next) => {
        try {
            const limit = req.query.limit;
            const model = Container.get('Comments');
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const instance = new CommentsService(model, ObjectId, logger);
            const data = await instance.GetAll({limit});
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
};
