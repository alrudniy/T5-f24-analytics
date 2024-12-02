import { OpenAPIHono } from "@hono/zod-openapi"
import { Auth } from "./auth/Auth"
import { createDatabase, type DatabaseType } from "./db"

import { signinHandler, signinRoute } from "./route/auth/signin"
import { registerHandler, registerRoute } from "./route/auth/register"
import { signoutHandler, signoutRoute } from "./route/account/signout"
import {
	listStaffRoute,
	listUnverifedStaffHandler,
} from "./route/verify/listStaff"
import { listTenantHandler, listTenantRoute } from "./route/tenants/listTenants"
import { Staff, StaffSession } from "./db/schema"
import { verifyMiddleware } from "./middleware/verifyMiddleware"

export type Env = {
	Variables: {
		auth: Auth
		db: DatabaseType

		session: StaffSession
		staff: Staff
	}
}

const db = createDatabase(process.env.DATABASE_URL!)
const auth = new Auth(db)

const app = new OpenAPIHono<Env>({
	defaultHook: (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: "Input invalid",
				},
				400,
			)
		}
	},
})

app.use("*", async (c, next) => {
	c.set("auth", auth)
	c.set("db", db)
	await next()
})

// handlers
app.openapi(signinRoute, signinHandler)
app.openapi(registerRoute, registerHandler)

app.use("/account/*", verifyMiddleware)
app.openapi(signoutRoute, signoutHandler)

app.use("/verify/*", verifyMiddleware)
app.openapi(listStaffRoute, listUnverifedStaffHandler)

app.use("/tenants/*", verifyMiddleware)
app.openapi(listTenantRoute, listTenantHandler)

if (process.env.NODE_ENV !== "production") {
	app.doc31("/doc.json", {
		openapi: "3.1.0",
		info: {
			title: "Staff analytics backend api",
			version: "0.0.1",
		},
	})
}
export default app
