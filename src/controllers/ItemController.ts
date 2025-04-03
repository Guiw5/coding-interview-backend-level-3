import type { Request, ResponseToolkit } from '@hapi/hapi'
import { ItemRepository } from '../repositories/ItemRepository'

export class ItemController {
    constructor(private itemRepository: ItemRepository) {}

    private validateExtraProps(payload: any, allowedProps: string[]) {
        const extraProps = Object.keys(payload).filter(prop => !allowedProps.includes(prop))
        if (extraProps.length > 0) {
            return {
                errors: [{
                    field: extraProps[0],
                    message: `Unexpected property "${extraProps[0]}"`
                }]
            }
        }
        return null
    }

    async list(_: Request, rt: ResponseToolkit) {
        try {
            const items = await this.itemRepository.find()
            return rt.response(items).code(200)
        } catch (error) {
            console.error(error)
            return rt.response({ message: 'Error listing items' }).code(500)
        }
    }

    async get(request: Request, rt: ResponseToolkit) {
        try {
            const { id } = request.params;
            if (!id || !Number.isInteger(Number(id))) {
                return rt.response({ error: 'Invalid ID' }).code(400);
            }

            const item = await this.itemRepository.findOneBy({ id: Number(id) })        
            if (!item) {
                return rt.response({ message: 'Item not found' }).code(404)
            }

            return rt.response(item).code(200)
        } catch (error) {
            console.error(error)
            return rt.response({ message: 'Error getting item' }).code(500)
        }
    }

    async create(request: Request, rt: ResponseToolkit) {
        try {
            const payload = request.payload
            if (!payload) {
                return rt.response({ message: 'No payload provided' }).code(400)
            }

            if (typeof payload !== 'object') {
                return rt.response({ message: 'Invalid payload' }).code(400)
            }
            
            const allowedProps = ['name', 'price']
            const extraPropsError = this.validateExtraProps(payload, allowedProps)
            if (extraPropsError) {
                return rt.response(extraPropsError).code(400)
            }

            const { name, price } = payload as { name?: string, price?: number }
            if (!name || !price) {
                return rt.response({
                    errors: [{
                        field: !name ? 'name' : 'price',
                        message: `Field "${!name ? 'name' : 'price'}" is required`
                    }]
                }).code(400)
            }

            if (price < 0) {
                return rt.response({
                    errors: [{ field: 'price',message: 'Field "price" cannot be negative' }]
                }).code(400)
            }

            const item = this.itemRepository.create({ name, price })
            await this.itemRepository.save(item)
            return rt.response(item).code(201)
        } catch (error) {
            console.error(error)
            return rt.response({ message: 'Error creating item' }).code(500)
        }
    }

    async update(request: Request, rt: ResponseToolkit) {
        try {
            const { id } = request.params;
            if (!id || !Number.isInteger(Number(id))) {
                return rt.response({ error: 'Invalid ID' }).code(400);
            }

            const itemDb = await this.itemRepository.findOneBy({ id: Number(id) })
            if (!itemDb) {
                return rt.response({ message: 'Item not found' }).code(404)
            }

            const payload = request.payload as any
            if (!payload) {
                return rt.response({ message: 'No payload provided' }).code(400)
            }

            const allowedProps = ['name', 'price']
            const extraPropsError = this.validateExtraProps(payload, allowedProps)
            if (extraPropsError) {
                return rt.response(extraPropsError).code(400)
            }

            const { name, price } = payload
            if (!name && !price) {
                return rt.response({ message: 'At least one field is required' }).code(400)
            }

            if (price && price < 0) {
                return rt.response({
                    errors: [{
                        field: 'price',
                        message: 'Field "price" cannot be negative'
                    }]
                }).code(400)
            }
        
            this.itemRepository.merge(itemDb, { name, price })
            const updatedItem = await this.itemRepository.save(itemDb)
            return rt.response(updatedItem).code(200)
        } catch (error) {
            console.error(error)
            return rt.response({ message: 'Error updating item' }).code(500)
        }
    }

    async delete(request: Request, rt: ResponseToolkit) {
        try {
            const { id } = request.params;
            if (!id || !Number.isInteger(Number(id))) {
                return rt.response({ error: 'Invalid ID' }).code(400);
            }

            const item = await this.itemRepository.findOneBy({ id: Number(id) })
            if (!item) {
                return rt.response({ message: 'Item not found' }).code(404)
            }

            await this.itemRepository.remove(item)
            return rt.response().code(204)
        } catch (error) {
            console.error(error)
            return rt.response({ message: 'Error deleting item' }).code(500)
        }
    }
} 