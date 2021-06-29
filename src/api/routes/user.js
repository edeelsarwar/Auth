import { Router } from 'express';
import UserService from '../../services/user.js';
import middlewares from '../middlewares/index.js';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import CommentsService from '../../services/comments.js';
import authorize from '../middlewares/authorize.js'
const ObjectId = mongoose.Types.ObjectId;
const route = Router();

export default (app) => {
    
    // for this assignment I could use this logger directly
    // but i am using this DI for getting logger
    const logger = Container.get('logger');
    let Role ={
        Admin: 'Admin',
        User: 'User'
      }

    app.use('/user', route);

    // middleware for logging the basic request info; defining directly into the route for specific logging
    route.use((req, res, next)=> {
        logger.debug(`${req.method}: /user${req.url}`);
        next();
    });

    //    router.post('/authenticate', authenticate);     // public route
        // router.get('/', authorize(Role.Admin), getAll); // admin only
    //    router.get('/:id', authorize(), getById); 

    // using patch method to handle updating of exisiting user object
    // it only updates those fields that are sent. null values are ignored and not updated
    //

    route.post('/login',async (req, res, next) => {
        try {
            const inputDTO = req.body;
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            
            const model = Container.get('User');
            const instance = new UserService(model, ObjectId, logger);
            const user = await instance.authenticate(inputDTO);
            return res.success(user);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
     });


    route.patch('/:id',authorize(Role.User),  async (req, res, next) => {
        try {
            const {id} = req.params;
            const inputDTO = req.body;
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const model = Container.get('User');
            const instance = new UserService(model, ObjectId, logger);
            const info = await instance.Update(id, inputDTO);
            return res.success({}, info);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // using delete method to handle deletion of exisiting user object
    route.delete('/:id', middlewares.validation.commonIdParameter, async (req, res, next) => {
        try {
            const { id } = req.params;
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const model = Container.get('User');
            const instance = new UserService(model, ObjectId, logger);
            const commentsInstance = new CommentsService(Container.get('Comments'), ObjectId, logger);
            let info = await instance.Delete({id});
            info = await commentsInstance.DeleteAllForUser({id});
            return res.success({}, info);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    
    // using post to add new object to collection
    route.post('/', middlewares.validation.postUser, async (req, res, next) => {
        try {
           

            const inputDTO = req.body;
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const model = Container.get('User');
            const instance = new UserService(model, ObjectId, logger);
            const data = await instance.AddNew(inputDTO);
            return res.success(data);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // for getting information regarding specific user, get request with id paramter
    route.get('/:id', middlewares.validation.commonIdParameter, async (req, res, next) => {
        try {
            const { id } = req.params;
            // for this assignment I could use this model object directly
            // but i am using this DI for getting pre-initialized model
            // passing this model to the service class which take cases of querying data
            const model = Container.get('User');
            const instance = new UserService(model, ObjectId, logger);
            const user = await instance.GetSingle({id});
            return res.success(user);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    // this get route will used to show all the users
    // however there is a limit query paramter to be used to limit the results
    // default limit is set to 20, see the service class
    

};
