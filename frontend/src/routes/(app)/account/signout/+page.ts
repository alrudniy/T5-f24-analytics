import { createAPIClient } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const client = createAPIClient(fetch)

	return {
		signout: client.DELETE('/account/signout')
	}
}
