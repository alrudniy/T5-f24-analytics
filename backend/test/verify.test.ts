import { expect, test } from "bun:test"
import { api } from "."

test("GET /verify without sign in", async () => {
	const { response } = await api.GET("/verify/list")
	expect(response.status).toBe(401)
})
