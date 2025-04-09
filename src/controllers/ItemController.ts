import type { Request, ResponseToolkit } from '@hapi/hapi'
import { ItemRepository } from '../repositories/ItemRepository'

export class ItemController {
    constructor(private itemRepository: ItemRepository) {}

    async list(_: Request, rt: ResponseToolkit) {
        const items = await this.itemRepository.find()

        return rt.response(items).code(200)
    }

    async get(request: Request, rt: ResponseToolkit) {
        const { id } = request.params;
        
        const item = await this.itemRepository.findOneBy({ id: Number(id) })        
        if (!item) {
            return rt.response({ message: 'Item not found' }).code(404)
        }

        return rt.response(item).code(200)
    }

    async create(request: Request, rt: ResponseToolkit) {
        const payload = request.payload as { name: string, price: number }

        const item = this.itemRepository.create(payload)
        await this.itemRepository.save(item)
        
        return rt.response(item).code(201)
    }

    async update(request: Request, rt: ResponseToolkit) {
        const { id } = request.params
        const payload = request.payload as { name?: string, price?: number }

        const itemDb = await this.itemRepository.findOneBy({ id: Number(id) })
        if (!itemDb) {
            return rt.response({ message: 'Item not found' }).code(404)
        }
    
        this.itemRepository.merge(itemDb, payload)
        const updatedItem = await this.itemRepository.save(itemDb)
            
        return rt.response(updatedItem).code(200)
    }

    async delete(request: Request, rt: ResponseToolkit) {
        const { id } = request.params

        const item = await this.itemRepository.findOneBy({ id: Number(id) })
        if (!item) {
            return rt.response({ message: 'Item not found' }).code(404)
        }

        await this.itemRepository.remove(item)
        return rt.response().code(204)
    }
} 