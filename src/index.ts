import "reflect-metadata"
import { initializeServer, stopServer } from './server';
import { initializeDatabase, stopDatabase } from "./config/database";

initializeDatabase().then(() => {
    initializeServer();
})

process.on('unhandledRejection', async (err) => {
    console.error('Unhandled Rejection:', err);   
})

process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);    
})

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server.');
    await stopDatabase();
    await stopServer();
    console.log('HTTP server closed.');
    process.exit(0);
})
