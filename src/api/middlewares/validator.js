import { celebrate, Joi } from 'celebrate';

// using celebrate which actually uses joi to validate requests
// adding common middlewares here to be used by the routes

export default {
    commonIdParameter: celebrate({
        params: {
            id: Joi.string().max(250).required(),
        }
    }),
    patchUser: celebrate({
        params: {
            id: Joi.string().max(250).required(),
        },
        body: Joi.object({
            firstName: Joi.string().min(2).max(25).optional(),
            lastName: Joi.string().min(2).max(25).optional(),
            email: Joi.string().email().min(5).max(250).optional(),
            password: Joi.string().min(8).max(150).optional()
        }).min(1)
    }),
    postUser: celebrate({
        body: Joi.object({
            firstName: Joi.string().min(2).max(25).required(),
            lastName: Joi.string().min(2).max(25).required(),
            email: Joi.string().email().min(5).max(250).required(),
            password: Joi.string().min(8).max(150).required()
        })
    }),

    patchComment: celebrate({
        params: {
            id: Joi.string().max(250).required(),
        },
        body: Joi.object({
            text: Joi.string().max(500).optional(),
            mentions: Joi.array().items(Joi.string().max(150)).optional(),
            hashTags: Joi.array().items(Joi.string().max(150)).optional()
        }).min(1)
    }),

    postComment: celebrate({
        body: Joi.object({
            text: Joi.string().max(500).required(),
            userId: Joi.string().max(250).required(),
            mentions: Joi.array().items(Joi.string().min(3).max(150)).optional(),
            hashTags: Joi.array().items(Joi.string().min(3).max(150)).optional(),
        })
    })
};