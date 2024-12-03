import { expect, test } from "bun:test"
import { api } from "."

test("POST /signin", async () => {
	const { response } = await api.POST("/register", {
		body: {
			email: "bad@email.com",
			password: "123",
			firstName: "Test",
			lastName: "Test",
		},
	})
	expect(response.status).toBe(400)
})
