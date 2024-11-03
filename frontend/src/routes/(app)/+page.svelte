<script lang="ts">
	import type { Component, ComponentType } from 'svelte'

	import Users from 'lucide-svelte/icons/users'
	import House from 'lucide-svelte/icons/house'
	import UserRoundSearch from 'lucide-svelte/icons/user-round-search'
	import ChartNoAxesCombined from 'lucide-svelte/icons/chart-no-axes-combined'
	import MessageCircleHeart from 'lucide-svelte/icons/message-circle-heart'
	import BadgeCheck from 'lucide-svelte/icons/badge-check'
</script>

<main class="flex flex-col p-2 gap-12 items-center">
	<h1 class="text-5xl">Administrative Tools</h1>

	<section>
		{#snippet entry(Logo: Component | ComponentType, link: string, name: string)}
			<li>
				<a href={link} class="flex flex-col gap-2 items-center">
					<div class="w-48 h-42 grid place-items-center bg-gray-3">
						<Logo size={64} />
					</div>
					<span class="text-lg">{name}</span>
				</a>
			</li>
		{/snippet}

		<ol class="grid grid-cols-3 gap-10">
			{@render entry(Users, '/matches', 'Match Management')}
			{@render entry(House, '/properties', 'Property Management')}
			{@render entry(UserRoundSearch, '/tenants', 'Tenant List')}
			{@render entry(ChartNoAxesCombined, '/analytics', 'Data Analytics')}
			{@render entry(MessageCircleHeart, '/feedback', 'User Feedback')}
			{@render entry(BadgeCheck, '/verify', 'User Verification')}
		</ol>
	</section>

	<section>
		<a href="/signin" class="underline text-2xl"> Back to Login </a>
	</section>
</main>

<style>
	main {
		max-width: 1300px;
		margin: 0 auto;

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
