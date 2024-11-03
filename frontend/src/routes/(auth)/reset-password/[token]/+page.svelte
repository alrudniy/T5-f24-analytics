<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import SimpleInput from '$lib/components/SimpleInput.svelte'
</script>

<main class="flex flex-col gap-10 px-1">
	<h1 class="text-3xl">Reset Password</h1>

	<form class="flex flex-col gap-3 w-80">
		<div class="flex flex-col text-2xl">
			<label for="password"> New Password </label>
			<SimpleInput type="password" id="password" placeholder="Password" />
		</div>

		<div class="flex flex-col text-2xl">
			<label for="password_confirm"> Confirm New Password </label>
			<SimpleInput type="password" id="password_confirm" placeholder="New Password" />
		</div>

		<SimpleButton class="w-fit px-4">Reset</SimpleButton>
	</form>
</main>

<style>
	main {
		max-width: 1300px;
		margin: 0 auto;

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -53%);
	}
</style>
