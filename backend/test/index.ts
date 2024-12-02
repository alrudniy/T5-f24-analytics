import { paths } from "./schema"
import createClient from "openapi-fetch"

export const api = createClient<paths>({
	credentials: "include",
})
