const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
    username: joi.string().required(),
    password: joi.string().required(),
    type: joi.string().required(),
    active: joi.boolean().default(1)
}

module.exports = {
    userIdSchema,
    createUserSchema
}