<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import SimpleInput from '$lib/components/SimpleInput.svelte'
</script>

<main class="flex flex-col gap-10">
	<h1 class="text-3xl">Administrative Login</h1>

	<form class="flex flex-col gap-3">
		<div class="flex flex-col text-2xl">
			<label for="email"> Email </label>
			<SimpleInput type="email" id="email" placeholder="Email" />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="password"> Password </label>
			<SimpleInput type="password" id="password" placeholder="Password" />
		</div>

		<SimpleButton>Sign In</SimpleButton>

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
