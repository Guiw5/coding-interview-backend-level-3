import { Server } from "@hapi/hapi"
import { ItemController } from '../controllers/ItemController'
import { db } from "../config/database"
import { Item } from "../entities/Item"

export const defineRoutes = (server: Server) => {
    const itemController = new ItemController(db.getRepository(Item))

    server.route({
        method: 'GET',
        path: '/ping',
        handler: () => ({ ok: true })
    })

    server.route({
        method: 'GET',
        path: '/items',
        handler: (request, rt) => itemController.list(request, rt)
    })

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: (request, rt) => itemController.get(request, rt)
    })

    server.route({
        method: 'POST',
        path: '/items',
        handler: (request, rt) => itemController.create(request, rt)
    })

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: (request, rt) => itemController.update(request, rt)
    })

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: (request, rt) => itemController.delete(request, rt)
    })
}