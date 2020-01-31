const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) {
    const { error } = joi.valid(data, schema);
    return error;
}

function validatonHandler(schema, check = "body") {
    return function(req, res, next) {
        const error = validate(req[check], schema);

        error ? next(boom.badRequest(error)) : next(); 
    } 
}

module.exports = validatonHandler;