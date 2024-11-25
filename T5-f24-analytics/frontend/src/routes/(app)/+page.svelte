<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import CardContent from '$lib/components/Card/CardContent.svelte';
	import CardHeader from '$lib/components/Card/CardHeader.svelte';
</script>

<Card class="welcome-card">
	<CardHeader title="Welcome to the T5-f24 Analytics Dashboard" />
	<CardContent>
		<p>
			This dashboard provides an overview of key metrics and insights related to T5-f24. You can
			explore various visualizations and reports to understand trends, identify areas for
			improvement, and make data-driven decisions.
		</p>
	</CardContent>
</Card>

<style>
	.welcome-card {
		border: 1px solid #ccc; /* Add a subtle border */
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
		padding: 20px; /* Add some padding */
		border-radius: 8px; /* Round the corners */
	}
</style>
<script lang="ts">
	import type { Component, ComponentType } from 'svelte'

	import Users from 'lucide-svelte/icons/users'
	import House from 'lucide-svelte/icons/house'
	import UserRoundSearch from 'lucide-svelte/icons/user-round-search'
	import ChartNoAxesCombined from 'lucide-svelte/icons/chart-no-axes-combined'
	import MessageCircleHeart from 'lucide-svelte/icons/message-circle-heart'
	import BadgeCheck from 'lucide-svelte/icons/badge-check'
</script>

<main class="flex flex-col p-4 gap-8 justify-center items-center min-h-screen bg-gray-100">
	<h1 class="text-4xl font-bold text-gray-800 mb-8">Administrative Tools</h1>

	<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
		{#snippet entry(Logo: Component | ComponentType, link: string, name: string)}
			<li class="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 transition-colors duration-200">
				<a href={link} class="flex flex-col gap-4 items-center text-gray-800">
					<div class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
						<Logo size={48} class="text-blue-500" />
					</div>
					<span class="text-lg font-medium">{name}</span>
				</a>
			</li>
		{/snippet}

		{@render entry(Users, '/matches', 'Match Management')}
		{@render entry(House, '/properties', 'Property Management')}
		{@render entry(UserRoundSearch, '/tenants', 'Tenant List')}
		{@render entry(ChartNoAxesCombined, '/analytics', 'Data Analytics')}
		{@render entry(MessageCircleHeart, '/feedback', 'User Feedback')}
		{@render entry(BadgeCheck, '/verify', 'User Verification')}
	</section>

	<a href="/account/signout" class="mt-8 block text-center text-blue-500 hover:underline">Sign Out</a>
</main>


<style>

</style>
