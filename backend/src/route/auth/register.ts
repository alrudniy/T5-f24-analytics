import { createRoute, type RouteHandler, z } from "@hono/zod-openapi"
import type { Env } from "../.."
import { count, eq } from "drizzle-orm"
import { staffs } from "../../db/schema"
import { Argon2id } from "oslo/password"

const RegisterSchema = z.object({
	email: z.string().email().toLowerCase(),
	firstName: z.string().max(64).min(1),
	lastName: z.string().max(64).min(1),
	password: z.string().min(8).max(64),
})

const RegisterResult = z
	.object({
		message: z.string(),
	})
	.openapi("RegisterResult")

export const registerRoute = createRoute({
	method: "post",
	path: "/register",
	request: {
		body: {
			content: {
				"application/json": {
					schema: RegisterSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: RegisterResult,
				},
			},
			description: "Register success",
		},
		409: {
			content: {
				"application/json": {
					schema: RegisterResult,
				},
			},
			description: "Register failed",
		},
	},
})

export const registerHandler: RouteHandler<typeof registerRoute, Env> = async (
	c,
) => {
	const staffInfo = c.req.valid("json")
	const db = c.var.db

	const [existingStaffs] = await db
		.select({ count: count() })
		.from(staffs)
		.where(eq(staffs.email, staffInfo.email))

	const exist = existingStaffs.count !== 0

	if (exist) {
		return c.json({ message: "Already exist" }, 409)
	}

	const argon2id = new Argon2id()

	const passwordSalt = crypto.randomUUID()
	const passwordHash = await argon2id.hash(staffInfo.password + passwordSalt)

	await db.insert(staffs).values({
		email: staffInfo.email,
		firstName: staffInfo.firstName,
		lastName: staffInfo.lastName,
		passwordHash: passwordHash,
		salt: passwordSalt,
		verified: false,
	})

	return c.json({ message: "Register success" }, 200)
}
