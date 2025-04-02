import Hapi from '@hapi/hapi'
import { defineRoutes } from './api/routes'
import { db, initializeDatabase } from './config/database';
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'

let server: Hapi.Server | null;
const isTest = process.env.NODE_ENV === 'test'
const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT!) || 3000

const initializeServer = async () => {    
    if (server) return server;

    server = Hapi.server({ 
        host, 
        port,
        debug: {
            log: ['error', 'implementation']
        }
    })

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
                ],
            }
        }
    ])

    defineRoutes(server)
    
    if (isTest) {
        await server.initialize()
        console.log('🚀 Server test on:', `http://localhost:${port}`)    
    } else {
        await server.start()
        console.log('🚀 Server running on:', `http://localhost:${port}`)
        console.log('📚 Swagger docs at:', `http://localhost:${port}/documentation`)
    }
    return server
}

const stopServer = async () => {
    if (server) {
        console.log('🛑 Stopping Server')
        await server.stop()
        console.log('🛑 Server stopped')
        server = null
    }
}

export { initializeServer, stopServer }