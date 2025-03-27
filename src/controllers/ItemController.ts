import { Request, ResponseToolkit } from '@hapi/hapi'
import { db } from '../config/database'
import { Item } from '../entities/Item'

export class ItemController {
    private itemRepository = db.getRepository(Item)

    async list(_: Request, rt: ResponseToolkit) {
        const items = await this.itemRepository.find()
        return rt.response(items).code(200)
    }

    async get(request: Request, rt: ResponseToolkit) {
        const { id } = request.params;
        if (!id || !Number.isInteger(Number(id))) {
            return rt.response({ error: 'Invalid ID' }).code(400);
        }

        const item = await this.itemRepository.findOneBy({ id })        
        if (!item) {
            return rt.response({ message: 'Item not found' }).code(404)
        }

        return rt.response(item).code(200)
    }

    async create(request: Request, rt: ResponseToolkit) {
        const { name, price } = request.payload as { name?: string, price?: number }
        
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
    }

    async update(request: Request, rt: ResponseToolkit) {
        const { id } = request.params;
        if (!id || !Number.isInteger(Number(id))) {
            return rt.response({ error: 'Invalid ID' }).code(400);
        }

        const itemDb = await this.itemRepository.findOneBy({ id })
        if (!itemDb) {
            return rt.response({ message: 'Item not found' }).code(404)
        }

        if (!request.payload) {
            return rt.response({ message: 'No payload provided' }).code(400)
        }

        const { name, price } = request.payload as { name?: string, price?: number }    
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
    }

    async delete(request: Request, rt: ResponseToolkit) {
        const { id } = request.params;
        if (!id || !Number.isInteger(Number(id))) {
            return rt.response({ error: 'Invalid ID' }).code(400);
        }

        const item = await this.itemRepository.findOneBy({ id })
        if (!item) {
            return rt.response({ message: 'Item not found' }).code(404)
        }

        await this.itemRepository.remove(item)
        return rt.response().code(204)
    }
} 