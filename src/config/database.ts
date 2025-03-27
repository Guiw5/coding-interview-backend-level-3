import { DataSource } from "typeorm"
import { Item } from "../entities/Item"
import { CreateItemTable1709876543210 } from "../migrations/1709876543210-CreateItemTable"

const isTest = process.env.NODE_ENV === 'test'
const dbPath = process.env.DB_PATH || "database.sqlite"
const database = isTest ? ":memory:" : dbPath

export const db = new DataSource({
    type: "sqlite",
    database: database,
    synchronize: false,
    logging: false,
    entities: [Item],
    migrations: [CreateItemTable1709876543210],
    subscribers: [],
    migrationsRun: true,
})

export const initializeDatabase = async () => {
    try {
        if (!db.isInitialized) {
            await db.initialize()
            console.log("Database has been initialized on:", db.options.database)
        }
    } catch (error) {
        console.error("Error during database initialization:", error)
        throw error
    }
}