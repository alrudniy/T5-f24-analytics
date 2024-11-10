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
	let confirmPassword = $state('')
	let firstName = $state('')
	let lastName = $state('')

	const inputValid = $derived.by(() => {
		const typed = email && password && confirmPassword && firstName && lastName

		const passwordSame = password == confirmPassword

		return typed && passwordSame
	})

	async function onClick() {
		try {
			loading = true

			await register(firstName, lastName, email, password)
		} finally {
			loading = false
		}
	}

	async function register(firstName: string, lastName: string, email: string, password: string) {
		const { data, error } = await client.POST('/register', {
			body: {
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName
			}
		})

		if (data) {
			toast.success(data.message)
			goto('/signin')
			return
		}

		if (error) {
			console.log(error.message)

			toast.error(error.message)
		}
	}
</script>

<main class="flex flex-col gap-10">
	<h1 class="text-3xl">Administrative Register</h1>

	<form class="flex flex-col gap-3">
		<div class="flex flex-col text-2xl">
			<label for="email"> Email </label>
			<SimpleInput type="email" id="email" placeholder="Email" bind:value={email} />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="first_name"> First Name </label>
			<SimpleInput type="text" id="first_name" placeholder="First Name" bind:value={firstName} />
		</div>
		<div class="flex flex-col text-2xl">
			<label for="last_name"> Last Name </label>
			<SimpleInput type="text" id="last_name" placeholder="Last Name" bind:value={lastName} />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="password"> Password </label>
			<SimpleInput type="password" id="password" placeholder="Password" bind:value={password} />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="confirm_password"> Confirm Password </label>
			<SimpleInput
				type="password"
				id="confirm_password"
				placeholder="Confirm Password"
				bind:value={confirmPassword}
			/>
		</div>

		<SimpleButton onclick={onClick} disabled={loading || !inputValid}>Register</SimpleButton>

		<a href="/signin" class="underline"> Sign in with existing account </a>
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
