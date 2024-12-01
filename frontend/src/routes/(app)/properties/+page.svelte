<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';

	export let data;

	type PropertyType = 'apartment' | 'house' | 'studio';

	const showVerified = $state(false);
	const set_showVerified = showVerified[1];

	const filter = $state<PropertyType>('apartment');
	const set_filter = filter[1];

	const properties = $derived.by([filter, showVerified], ([$filter, $showVerified]) => {
		return data.properties.filter((p) => p.type === $filter && ($showVerified ? true : !p.verified));
	});
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
	<section class="flex w-full justify-between items-end">
		<h1 class="text-3xl">Available Properties</h1>
		<a href="/" class="underline">Back</a>
	</section>

	<div>
		<SimpleButton class="bg-blue-500" onclick={() => set_showVerified(!showVerified)}>
			{#if showVerified}
				Show Unverified
			{:else}
				Show Verified
			{/if}
		</SimpleButton>
	</div>

	<section>
		{#snippet filterButton(type: PropertyType)}
			<button class="capitalize filter-btn" data-selected={type === filter} onclick={() => set_filter(type)}>
				{type}
			</button>
		{/snippet}

		{@html filterButton('apartment')}
		{@html filterButton('house')}
		{@html filterButton('studio')}
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
								<div>
									<button on:click={() => {
										const index = data.properties.findIndex(p => p.id === property.id);
										if (index !== -1) {
											// Create a new array with the updated property. This triggers Svelte's reactivity.
											const updatedProperties = [
												...data.properties.slice(0, index),
												{...property, verified: !property.verified},
												...data.properties.slice(index + 1)
											];
											data.properties = updatedProperties;
											// TODO: Make API call to update verification status
											console.log("Toggled verification for property:", property.id, data.properties);
										}
									}}>
										{#if property.verified}
											Unverify
										{:else}
											Verify
										{/if}
									</button>
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
