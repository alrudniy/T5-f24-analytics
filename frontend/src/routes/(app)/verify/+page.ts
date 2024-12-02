import { createAPIClient } from '$lib/api'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const api = createAPIClient(fetch)

	const { data, error: err, response } = await api.GET('/verify/list')

	if (!data) {
		error(response.status, err)
	}

	return {
		staffs: data
	}
}
