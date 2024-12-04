import { expect, test } from "bun:test"
import { api } from "."

test("POST /signin", async () => {
	const { response } = await api.POST("/signin", {
		body: {
			email: "bad@email.com",
			password: "this_is_a_wrong_password",
		},
	})
	expect(response.status).toBe(401)
})
