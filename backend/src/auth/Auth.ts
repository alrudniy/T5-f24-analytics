import type { DatabaseType } from "../db"
import {
	type Staff,
	staffs,
	type StaffSession,
	staffSessions,
} from "../db/schema"
import { eq } from "drizzle-orm"
import { encodeHexLowerCase } from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"

export type SessionValidationResult =
	| { session: StaffSession; staff: Staff }
	| { session: null; staff: null }

export class Auth {
	constructor(private db: DatabaseType) {}

	generateSessionToken(): string {
		return crypto.randomUUID()
	}

	async createSession(token: string, staffID: number): Promise<StaffSession> {
		const sessionId = encodeHexLowerCase(
			sha256(new TextEncoder().encode(token)),
		)

		const session: StaffSession = {
			sessionID: sessionId,
			staffID,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		}
		await this.db.insert(staffSessions).values(session)
		return session
	}

	async validateSessionToken(token: string): Promise<SessionValidationResult> {
		const sessionId = encodeHexLowerCase(
			sha256(new TextEncoder().encode(token)),
		)
		const result = await this.db
			.select({ staff: staffs, session: staffSessions })
			.from(staffSessions)
			.innerJoin(staffs, eq(staffSessions.staffID, staffs.staffID))
			.where(eq(staffSessions.sessionID, sessionId))

		if (result.length < 1) {
			return { session: null, staff: null }
		}
		const { staff, session } = result[0]
		if (Date.now() >= session.expiresAt.getTime()) {
			await this.db
				.delete(staffSessions)
				.where(eq(staffSessions.sessionID, session.sessionID))
			return { session: null, staff: null }
		}
		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
			await this.db
				.update(staffSessions)
				.set({
					expiresAt: session.expiresAt,
				})
				.where(eq(staffSessions.sessionID, session.sessionID))
		}
		return { session, staff }
	}

	async invalidateSession(sessionId: string): Promise<void> {
		await this.db
			.delete(staffSessions)
			.where(eq(staffSessions.sessionID, sessionId))
	}
}
