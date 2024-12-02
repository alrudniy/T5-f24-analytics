import { createMiddleware } from "hono/factory"
import { Env } from ".."
import { getCookie } from "hono/cookie"

export const verifyMiddleware = createMiddleware<Env>(async (c, next) => {
	const { auth } = c.var

	const authToken = getCookie(c, "Authorization")

	if (!authToken) {
		return c.json(
			{
				message: "Please Sign In.",
			},
			401,
		)
	}

	const { staff, session } = await auth.validateSessionToken(authToken)

	if (!staff || !session) {
		return c.json(
			{
				message: "Please Sign In.",
			},
			401,
		)
	}

	c.set("session", session)
	c.set("staff", staff)

	await next()
})
