import { db } from "../src/config/database"

beforeAll(async () => {
    if (!db.isInitialized) {
        await db.initialize()
    }
})

afterAll(async () => {
    await db.destroy()
})