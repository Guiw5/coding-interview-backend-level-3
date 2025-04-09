import { Request, ResponseToolkit } from '@hapi/hapi';
import { ValidationErrorItem } from 'joi';

export const validationErrorHandler = (request: Request, h: ResponseToolkit, err: any) => {
    if (err && err.isJoi) {
        const errors = err.details.map((detail: ValidationErrorItem) => ({
            field: detail.path.join('.'),
            message: detail.message
        }));
        return h.response({ errors }).code(400).takeover();
    }
    return h.continue;
}; 