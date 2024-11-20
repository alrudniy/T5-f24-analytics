<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';

	let { data } = $props();

	type PropertyType = 'apartment' | 'house' | 'studio';

	let filter = $state<PropertyType>('apartment');

	const properties = $derived.by(() => {
		if (filter === 'apartment') {
			return data.properties.filter((p) => p.type === 'apartment');
		}
		return data.properties.filter((p) => p.type === filter);
	});
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
	<section class="flex w-full justify-between items-end">
		<h1 class="text-3xl">Available Properties</h1>
		<a href="/" class="underline">Back</a>
	</section>

	<section>
		{#snippet filterButton(type: PropertyType)}
			<button
				class="capitalize filter-btn"
				data-selected={type === filter}
				onclick={() => (filter = type)}
			>
				{type}
			</button>
		{/snippet}

		{@render filterButton('apartment')}
		{@render filterButton('house')}
		{@render filterButton('studio')}
	</section>

	<div class="scroll-container py-2">
		<ol class="flex flex-col gap-6 property-list">
			{#each properties as property (property.id)}
				<li>
					<Card>
						<CardHeader>
							<div class="flex justify-between items-start">
								<div>
									<p class="text-lg">{property.location}</p>
									<p class="text-sm text-muted-foreground">Landlord: {property.landlord}</p>
								</div>
							</div>
						</CardHeader>
					</Card>
				</li>
			{/each}
		</ol>
	</div>
</main>

<style>
	main {
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.scroll-container {
		overflow-y: auto;
		flex-grow: 1;
	}

	.property-list {
		padding: 0;
		margin: 0;
	}

	.filter-btn {
		@apply px-2 text-xl;
		@apply bg-white text-black border rounded-md;
	}

	.filter-btn:hover {
		@apply bg-gray-1;
	}

	.filter-btn[data-selected='true'] {
		@apply bg-black text-white rounded-md;
	}
</style>
