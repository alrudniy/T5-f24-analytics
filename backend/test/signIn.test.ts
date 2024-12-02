import { expect, test } from "bun:test"
import { api } from "."

test("POST /signin", async () => {
	const { response } = await api.POST("/signin", {
		body: {
			email: "This will not work",
			password: "This will not work",
		},
	})
	expect(response.status).toBe(401)
})
