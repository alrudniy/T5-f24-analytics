import { type RouteHandler, createRoute, z } from "@hono/zod-openapi"

import { setCookie } from "hono/cookie"

const SignInSchema = z
	.object({
		email: z.string().email(),
		password: z.string().max(64),
	})
	.openapi("SignInSchema")

const StaffInfoSchema = z
	.object({
		email: z.string().email(),
		firstName: z.string(),
		lastName: z.string(),
	})
	.openapi("StaffInfo")

const SignInError = z
	.object({
		message: z.string(),
	})
	.openapi("SignInError")

export const signinRoute = createRoute({
	method: "post",
	path: "/signin",
	request: {
		body: {
			content: {
				"application/json": {
					schema: SignInSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: StaffInfoSchema,
				},
			},
			description: "Login success",
		},
		401: {
			content: {
				"application/json": {
					schema: SignInError,
				},
			},
			description: "Login failed",
		},
	},
})

import { eq } from "drizzle-orm"
import type { Env } from "../.."
import { staffs } from "../../db/schema"

import { Argon2id } from "oslo/password"

export const signinHandler: RouteHandler<typeof signinRoute, Env> = async (
	c,
) => {
	const db = c.var.db

	const loginCredentials = c.req.valid("json")

	const staff = await db.query.staffs.findFirst({
		where: eq(staffs.email, loginCredentials.email),
	})

	if (!staff) {
		return c.json(
			{
				message: "Email or password is incorrect.",
			},
			401,
		)
	}

	const argon2id = new Argon2id()

	const passwordMatch = await argon2id.verify(
		staff.passwordHash,
		loginCredentials.password + staff.salt,
	)

	if (!passwordMatch) {
		return c.json(
			{
				message: "Email or password is incorrect.",
			},
			401,
		)
	}

	if (!staff.verified) {
		return c.json(
			{
				message: "Contact administrator to activate account.",
			},
			401,
		)
	}

	const auth = c.var.auth

	const token = auth.generateSessionToken()
	const session = await auth.createSession(token, staff.staffID)

	setCookie(c, "Authorization", token, {
		expires: session.expiresAt,
		httpOnly: true,
		secure: true,
		sameSite: "Strict",
	})

	return c.json(
		{
			email: staff.email,
			firstName: staff.firstName,
			lastName: staff.lastName,
		},
		200,
	)
}
