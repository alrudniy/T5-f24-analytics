<script lang="ts">
	import Badge from '$lib/components/Badge.svelte'
	import Card from '$lib/components/card/Card.svelte'
	import CardHeader from '$lib/components/card/CardHeader.svelte'
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const properties = $derived(data.properties)

	// Ensure this type matches your backend definition
	type PropertyType = 'apartment' | 'house' | 'studio'

	let showVerified = $state(false)
	let filter: PropertyType = $state('apartment')

	const filteredProperties = $derived.by(() => {
		return properties.filter((p) => p.type === filter && (showVerified || !p.verified))
	})
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
	<section class="flex w-full justify-between items-end">
		<h1 class="text-3xl">Available Properties</h1>
		<a href="/" class="underline">Back</a>
	</section>

	<div>
		<SimpleButton class="bg-blue-500" onclick={() => (showVerified = !showVerified)}>
			{#if showVerified}
				Show Unverified
			{:else}
				Show Verified
			{/if}
		</SimpleButton>
	</div>

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

		{@render filterButton('apartment' as PropertyType)}
		{@render filterButton('house' as PropertyType)}
		{@render filterButton('studio' as PropertyType)}
	</section>

	<div class="scroll-container py-2">
		<ol class="flex flex-col gap-6 property-list">
			{#each filteredProperties as property (property.id)}
				<li>
					<Card>
						<CardHeader>
							<div class="flex justify-between items-start">
								<div>
									<p class="text-lg">{property.location}</p>
									<p class="text-sm text-muted-foreground">Landlord: {property.landlord}</p>
								</div>
								<div>
									<SimpleButton
										onclick={() => {
											// TODO: Make API call to update verification status
											console.log('Toggled verification for property:', property.id)
										}}
									>
										{#if property.verified}
											Unverify
										{:else}
											Verify
										{/if}
									</SimpleButton>
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
