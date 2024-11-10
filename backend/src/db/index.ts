import { drizzle } from "drizzle-orm/mysql2"
import * as schema from "./schema"

export function createDatabase(databaseURL: string) {
	const db = drizzle(databaseURL, { schema: { ...schema }, mode: "default" })

	return db
}

export type DatabaseType = ReturnType<typeof createDatabase>
