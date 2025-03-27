import Hapi from '@hapi/hapi'
import { defineRoutes } from './api/routes'
import { db, initializeDatabase } from './config/database';

let server: Hapi.Server | null;
const isTest = process.env.NODE_ENV === 'test'
const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT!) || 3000

const initializeServer = async () => {    
    await initializeDatabase()
    server = Hapi.server({ host, port })
    defineRoutes(server)
    
    if (isTest) {
        await server.initialize()
        console.log(`Server test on ${server.info.uri}`)    
    } else {
        await server.start()
        console.log(`Server running on ${server.info.uri}`)
    }
    return server
}

const stopServer = async () => {
    if (server) {
        await server.stop()
        await db.destroy()
        console.log(`Server stopped`)
        server = null
    }
}

export { initializeServer, stopServer }