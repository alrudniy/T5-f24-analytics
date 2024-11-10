import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
	if (browser) {
		if (localStorage.getItem('staff_info')) {
			redirect(302, '/')
		}
	}
}
