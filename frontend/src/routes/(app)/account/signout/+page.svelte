<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	$effect(() => {
		localStorage.removeItem('staff_info')
		const signout = async () => {
			await data.signout
			goto('/signin')
		}

		signout()
	})
</script>

<h1>Signing out...</h1>
