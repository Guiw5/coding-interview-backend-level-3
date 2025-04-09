import HapiSwagger from "hapi-swagger";
import type { Server } from "@hapi/hapi";
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'

export const useSwagger = async (server: Server) => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                    description: 'API Documentation',
                    contact: {
                        name: 'Guido Wagner',
                        email: 'wagner.guido.5@gmail.com'
                    }
                },
                grouping: 'tags',
                tags: [
                    { name: 'items', description: 'Items Endpoints' },
                    { name: 'status', description: 'Health Check' }
                ]
            } as HapiSwagger.RegisterOptions
        }
    ])
}