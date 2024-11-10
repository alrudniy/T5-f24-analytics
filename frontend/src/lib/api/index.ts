import createClient from 'openapi-fetch'
import type { paths } from './schema'

export function createAPIClient(fetchFn?: typeof fetch) {
	const client = createClient<paths>({ baseUrl: '/api', fetch: fetchFn, credentials: 'include' })

	return client
}
