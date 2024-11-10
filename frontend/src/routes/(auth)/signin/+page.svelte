<script lang="ts">
	import { goto } from '$app/navigation'
	import { createAPIClient } from '$lib/api'
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import SimpleInput from '$lib/components/SimpleInput.svelte'
	import { toast } from 'svelte-sonner'

	const client = createAPIClient()

	let loading = $state(false)

	let email = $state('')
	let password = $state('')

	async function onClick() {
		try {
			loading = true

			await signIn(email, password)
		} finally {
			loading = false
		}
	}

	async function signIn(email: string, password: string) {
		const { data, error } = await client.POST('/signin', {
			body: {
				email: email,
				password: password
			}
		})

		if (data) {
			localStorage.setItem('staff_info', JSON.stringify(data))
			goto('/')
			return
		}

		if (error) {
			toast.error(error.message)
		}
	}
</script>

<main class="flex flex-col gap-10">
	<h1 class="text-3xl">Administrative Login</h1>

	<form class="flex flex-col gap-3">
		<div class="flex flex-col text-2xl">
			<label for="email"> Email </label>
			<SimpleInput type="email" id="email" placeholder="Email" bind:value={email} />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="password"> Password </label>
			<SimpleInput type="password" id="password" placeholder="Password" bind:value={password} />
		</div>

		<SimpleButton onclick={onClick} disabled={loading || !(email && password)}>Sign In</SimpleButton
		>

		<a href="/reset-password" class="underline"> Forgot Password? </a>

		<a href="/register" class="underline"> Register as Administrator </a>
	</form>
</main>

<style>
	main {
		max-width: 1300px;
		margin: 0 auto;

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -55%);
	}
</style>
