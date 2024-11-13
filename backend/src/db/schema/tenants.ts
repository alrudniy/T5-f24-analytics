import { relations } from "drizzle-orm"
import { mysqlTable as table } from "drizzle-orm/mysql-core"
import { int, varchar, datetime, boolean } from "drizzle-orm/mysql-core"

import type { InferSelectModel } from "drizzle-orm"

export const users = table("user", {
	id: int("id").notNull().autoincrement().primaryKey(),
	username: varchar("username", { length: 150 }).notNull(),
    password: varchar("password", { length: 170}).notNull(),
    active: boolean("active").default(false).notNull(),
    firstname: varchar("firstname", { length: 100 }).notNull(),
	lastname: varchar("lastname", { length: 100 }).notNull(),
})

export type user = InferSelectModel<typeof users>

  
  