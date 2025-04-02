import { DataSource, DataSourceOptions } from "typeorm"
import { Item } from "../entities/Item"
import { CreateItemTable1709876543210 } from "../migrations/1709876543210-CreateItemTable"

const database = process.env.PGDATABASE || "items_db"
const host = process.env.PGHOST || "localhost"
const port = parseInt(process.env.PGPORT || "5432")
const username = process.env.PGUSER || "postgres"
const password = process.env.PGPASSWORD || "postgres"
const dropSchema = Boolean(process.env.NODE_ENV === "test")
    
export const db = new DataSource({
    type: "postgres",
    database,
    host,
    port,
    username,
    password,
    dropSchema,
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
            console.log("Database has been initialized with type:", db.options.type)
        }
    } catch (error) {
        console.error("Error during database initialization:", error)
        throw error
    }
}