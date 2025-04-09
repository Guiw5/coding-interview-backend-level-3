import { Server } from "@hapi/hapi"
import { ItemController } from '../controllers/ItemController'
import { db } from "../config/database"
import { Item } from "../entities/Item"
import { itemSchema } from '../schemas/itemSchema'

export const defineRoutes = (server: Server) => {
    const itemController = new ItemController(db.getRepository(Item))

    server.route({
        method: 'GET',
        path: '/ping',
        handler: () => ({ ok: true }),
        options: {
            tags: ['api', 'status'],
            description: 'Test endpoint to verify that the API is working',
        }
    })

    server.route({
        method: 'GET',
        path: '/items',
        handler: (request, rt) => itemController.list(request, rt),
        options: {
            tags: ['api', 'items'],
            description: 'Get all items',
        }
    })

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: (request, rt) => itemController.get(request, rt),
        options: {
            tags: ['api', 'items'],
            description: 'Get an item by its ID',
            validate: {
                params: itemSchema.id
            }
        }
    })

    server.route({
        method: 'POST',
        path: '/items',
        handler: (request, rt) => itemController.create(request, rt),
        options: {
            tags: ['api', 'items'],
            description: 'Create a new item',
            validate: {
                payload: itemSchema.create
            }
        }
    })

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: (request, rt) => itemController.update(request, rt),
        options: {
            tags: ['api', 'items'],
            description: 'Update an existing item',
            validate: {
                params: itemSchema.id,
                payload: itemSchema.update
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: (request, rt) => itemController.delete(request, rt),
        options: {
            tags: ['api', 'items'],
            description: 'Delete an item',
            validate: {
                params: itemSchema.id
            }
        }
    })
}