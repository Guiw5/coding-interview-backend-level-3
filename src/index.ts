import "reflect-metadata"
import Hapi from '@hapi/hapi';
import { initializeServer, stopServer } from './server';
import { initializeDatabase, stopDatabase } from "./config/database";

let server: Hapi.Server | null = null;

initializeDatabase().then(() => {
    initializeServer().then((s) => {
        server = s;
    });
})

process.on('unhandledRejection', async (err) => {
    server?.logger.error('Unhandled Rejection:', err);   
})

process.on('uncaughtException', async (err) => {
    server?.logger.error('Uncaught Exception:', err);    
})

process.on('SIGTERM', async () => {
    server?.logger.warn('SIGTERM signal received: closing HTTP server.');
    await stopDatabase();
    await stopServer();
    process.exit(0);
})
