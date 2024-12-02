import { relations } from "drizzle-orm"
import { mysqlTable, mysqlTable as table, unique } from "drizzle-orm/mysql-core"
import {
	int,
	varchar,
	datetime,
	boolean,
	tinyint,
} from "drizzle-orm/mysql-core"

import type { InferSelectModel } from "drizzle-orm"

export const user = mysqlTable(
	"user",
	{
		id: int().autoincrement().notNull(),
		username: varchar({ length: 150 }).notNull(),
		password: varchar({ length: 256 }).notNull(),
		salt: varchar({ length: 256 }).default("NULL"),
		firstname: varchar({ length: 100 }).notNull(),
		lastname: varchar({ length: 100 }).notNull(),
		active: boolean("active").default(true),
		role: varchar({ length: 50 }).default("'tenant'"),
		phone: varchar({ length: 16 }).default("NULL"),
		email: varchar({ length: 128 }).default("NULL"),
		usernameType: varchar("username_type", { length: 20 }).default("NULL"),
	},
	(table) => {
		return {
			username: unique("username").on(table.username),
		}
	},
)

export type User = InferSelectModel<typeof user>
