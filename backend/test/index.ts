import { paths } from "./schema"
import createClient from "openapi-fetch"

export const api = createClient<paths>({
	baseUrl: "http://localhost:3000",
	credentials: "include",
})
