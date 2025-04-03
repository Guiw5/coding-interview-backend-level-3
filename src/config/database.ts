import { DataSource } from "typeorm"
import { Item } from "../entities/Item"
import { CreateItemTable1709876543210 } from "../migrations/1709876543210-CreateItemTable"

// dev setup
const database = process.env.PGDATABASE
const host = process.env.PGHOST
const port = parseInt(process.env.PGPORT || "5432")
const username = process.env.PGUSER
const password = process.env.PGPASSWORD

// test setup
const isTest = process.env.NODE_ENV === 'test'

// production setup
const isProd = process.env.NODE_ENV === 'production'
const ssl = isProd ? {
    rejectUnauthorized: false
} : false

export const db = new DataSource({
    type: "postgres",
    database,
    host,
    port,
    username,
    password,
    synchronize: false,
    dropSchema: isTest,
    logging: false,
    entities: [Item],
    migrations: [CreateItemTable1709876543210],
    subscribers: [],
    migrationsRun: true,
    ssl
})

export const initializeDatabase = async () => {
    try {
        if (!db.isInitialized) {
            await db.initialize()
            console.log("Database has been initialized")
        }
    } catch (error) {
        console.error("Error during database initialization:", error)
        throw error
    }
}

export const stopDatabase = async () => {
    if (db.isInitialized) {
        console.log('🛑 Closing Database connection')
        await db.destroy()
        console.log('🛑 Database connection closed')
    }
}