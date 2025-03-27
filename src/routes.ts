import { Server } from "@hapi/hapi"



interface Item {
    id: number;
    name: string;
    price: number;
  }
  
  const items: Item[] = [];
  let nextId = 1;
  
export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    })  

    // Items routes
    server.route({
        method: 'GET',
        path: '/items',
        handler: () => items
    })

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: (request, h) => {
            const id = parseInt(request.params.id as string, 10);
            const item = items.find(i => i.id === id);
            if (!item) {
                return h.response({
                    errors: [{
                        field: 'id',
                        message: 'Item not found'
                    }]
                }).code(404);
            }
            return item;
        }
    })

    server.route({
        method: 'POST',
        path: '/items',
        handler: (request, h) => {
            const payload = request.payload as Omit<Item, 'id'>;
            
            if (!payload.price) {
                return h.response({
                    errors: [{
                        field: 'price',
                        message: 'Field "price" is required'
                    }]
                }).code(400);
            }

            if (payload.price < 0) {
                return h.response({
                    errors: [{
                        field: 'price',
                        message: 'Field "price" cannot be negative'
                    }]
                }).code(400);
            }

            const newItem: Item = {
                ...payload,
                id: nextId++
            };
            items.push(newItem);
            return h.response(newItem).code(201);
        }
    })

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: (request, h) => {
            const id = parseInt(request.params.id as string, 10);
            const payload = request.payload as Omit<Item, 'id'>;
            const index = items.findIndex(i => i.id === id);

            if (index === -1) {
                throw new Error('Not Found');
            }

            if (payload.price < 0) {
                return h.response({
                    errors: [{
                        field: 'price',
                        message: 'Field "price" cannot be negative'
                    }]
                }).code(400);
            }

            const updatedItem: Item = {
                ...payload,
                id
            };
            items[index] = updatedItem;
            return updatedItem;
        }
    })

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: (request, h) => {
            const id = parseInt(request.params.id as string, 10);
            const index = items.findIndex(i => i.id === id);

            if (index === -1) {
                throw new Error('Not Found');
            }

            items.splice(index, 1);
            return h.response().code(204);
        }
    })
}

