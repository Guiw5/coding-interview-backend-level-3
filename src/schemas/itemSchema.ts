import Joi from 'joi';

export const itemSchema = {
    create: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Field "name" is required',
            'any.required': 'Field "name" is required'
        }),
        price: Joi.number().min(0).required().messages({
            'number.base': 'Field "price" must be a number',
            'number.min': 'Field "price" cannot be negative',
            'any.required': 'Field "price" is required'
        })
    }).unknown(false).messages({
        'object.unknown': 'Unexpected property "{#label}"',
        'object.base': 'Request body must be a valid JSON object'
    }).label('createItemModel'),

    update: Joi.object({
        name: Joi.string(),
        price: Joi.number().min(0).messages({
            'number.base': 'Field "price" must be a number',
            'number.min': 'Field "price" cannot be negative'
        })
    }).min(1).unknown(false).messages({
        'object.min': 'At least one field is required',
        'object.unknown': 'Unexpected property "{#label}"',
        'object.base': 'Request body must be a valid JSON object'
    }).label('updateItemModel'),

    id: Joi.object({
        id: Joi.number().integer().required().messages({
            'number.base': 'Invalid ID',
            'number.integer': 'Invalid ID',
            'any.required': 'ID is required'
        })
    }).unknown(false).messages({
        'object.unknown': 'Unexpected property "{#label}"'
    }).label('idItemModel')
}; 