import { relations } from "drizzle-orm"
import { mysqlTable as table } from "drizzle-orm/mysql-core"
import { int, varchar, datetime, boolean } from "drizzle-orm/mysql-core"

import type { InferSelectModel } from "drizzle-orm"

export const staffs = table("staffs", {
	staffID: int("staff_id").primaryKey().autoincrement(),
	firstName: varchar("first_name", { length: 256 }).notNull(),
	lastName: varchar("last_name", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull().unique(),
	verified: boolean("verified").default(false).notNull(),
	salt: varchar("salt", { length: 36 }).notNull(),
	passwordHash: varchar("password_hash", { length: 128 }).notNull(),
})

export const staffSessions = table("staff_sessions", {
	sessionID: varchar("session_id", {
		length: 64, // sha256
	}).primaryKey(),
	staffID: int("staff_id")
		.notNull()
		.references(() => staffs.staffID),
	expiresAt: datetime("expires_at").notNull(),
})

export const staffSessionRelations = relations(staffSessions, ({ one }) => ({
	staff: one(staffs, {
		fields: [staffSessions.staffID],
		references: [staffs.staffID],
	}),
}))

export type Staff = InferSelectModel<typeof staffs>
export type StaffSession = InferSelectModel<typeof staffSessions>
