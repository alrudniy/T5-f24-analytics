import { createRoute, z, type RouteHandler } from "@hono/zod-openapi"
import type { Env } from "../.."
import { deleteCookie, getCookie } from "hono/cookie"

export const signoutRoute = createRoute({
	method: "delete",
	path: "/account/signout",
	request: {},
	responses: {
		204: {
			description: "Sign out",
		},
	},
})

export const signoutHandler: RouteHandler<typeof signoutRoute, Env> = async (
	c,
) => {
	const auth = c.var.auth

	const sessionToken = getCookie(c, "Authorization")

	if (sessionToken == null) {
		deleteCookie(c, "Authorization")
		return c.body(null, 204)
	}

	const session = await auth.validateSessionToken(sessionToken)

	deleteCookie(c, "Authorization")
	if (session.session != null) {
		await auth.invalidateSession(session.session.sessionID)
	}

	return c.body(null, 204)
}
