import Hapi from '@hapi/hapi'
import { defineRoutes } from './api/routes'
import { useLogger } from './config/logger'
import { useSwagger } from './config/swagger'
import { validationErrorHandler } from './utils/validationErrorHandler'

const isTest = process.env.NODE_ENV === 'test'
const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT!) || 3000

let server: Hapi.Server | null;

const initializeServer = async () => {
    if (server) return server

    server = Hapi.server({ host, port, routes: { validate: { failAction: validationErrorHandler } } })
    await useLogger(server)
    defineRoutes(server)
    await useSwagger(server)

    if (isTest) {
        await server.initialize()
        server.logger.info(`Server test on: http://localhost:${port}`)    
    } else {
        await server.start()
        server.logger.info(`Swagger docs at: http://localhost:${port}/documentation`)
    }
    
    return server
    
}

const stopServer = async () => {
    if (server) {
        server.logger.info('Stopping Server')
        await server.stop()
        server = null
    }
}

export { initializeServer, stopServer }