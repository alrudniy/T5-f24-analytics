<script lang="ts">
	import Badge from '$lib/components/Badge.svelte'

	let { data } = $props()

	import Card from '$lib/components/card/Card.svelte'
	import CardContent from '$lib/components/card/CardContent.svelte'
	import CardHeader from '$lib/components/card/CardHeader.svelte'

	type FilterType = 'all' | 'landlord' | 'tenant'

	let filter = $state<FilterType>('all')

	const feedbacks = $derived.by(() => {
		if (filter == 'all') {
			return data.feedbacks
		}

		return data.feedbacks.filter((f) => f.category == filter)
	})
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
	<section class="flex w-full justify-between items-end">
		<h1 class="text-3xl">User Feedback</h1>

		<a href="/" class="underline"> Back </a>
	</section>

	<section>
		{#snippet filterButton(setting: FilterType)}
			<button
				class="capitalize filter-btn"
				data-selected={setting == filter}
				onclick={() => (filter = setting)}
			>
				{setting}
			</button>
		{/snippet}

		{@render filterButton('all')}
		{@render filterButton('landlord')}
		{@render filterButton('tenant')}
	</section>

	<div class="scroll-container py-2">
		<ol class="flex flex-col gap-6 feedback-list">
			{#each feedbacks as feedback (feedback.id)}
				<li>
					<Card>
						<CardHeader>
							<div class="flex justify-between items-start">
								<div>
									<h3 class="text-2xl">{feedback.firstName} {feedback.lastName}</h3>
									<p class="text-sm text-muted-foreground">{feedback.date}</p>
								</div>
								<Badge variant={feedback.category === 'tenant' ? 'default' : 'secondary'}>
									{feedback.category}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p>{feedback.content}</p>
						</CardContent>
					</Card>

					<section></section>
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

	.feedback-list {
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
