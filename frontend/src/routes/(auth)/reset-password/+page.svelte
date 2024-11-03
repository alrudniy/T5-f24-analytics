<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import SimpleInput from '$lib/components/SimpleInput.svelte'
</script>

<main class="flex flex-col gap-10 px-1">
	<h1 class="text-3xl">Reset Password</h1>

	<form class="flex flex-col gap-3 w-80">
		<div class="flex flex-col text-2xl">
			<label for="email"> Email </label>
			<SimpleInput type="email" id="email" placeholder="Email" />
		</div>

		<section class="text-xl flex gap-1 items-center px-2">
			<a href="/signin" class="flex-1 underline">Cancel</a>
			<SimpleButton class="flex-[1.5]">Reset</SimpleButton>
		</section>
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
