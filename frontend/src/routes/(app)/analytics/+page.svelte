<script lang="ts">
	const bedroomPreferences = [
		{ name: '1 Bedroom', count: 12 },
		{ name: '2 Bedroom', count: 19 },
		{ name: '3 Bedroom', count: 3 },
		{ name: '4 Bedroom', count: 5 }
	]

	const otherAmenities = [
		{ name: 'Single Floor', count: 25 },
		{ name: 'In-Unit Laundry', count: 22 },
		{ name: 'Parking', count: 18 },
		{ name: 'Pet-Friendly', count: 15 },
		{ name: 'Central AC', count: 12 }
	]

	let allFeatures = [...bedroomPreferences, ...otherAmenities]
	allFeatures.sort((a, b) => b.count - a.count)
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
	<section class="flex w-full justify-between items-end">
		<h1 class="text-3xl">Analytics</h1>
		<a href="/" class="underline">Back</a>
	</section>

	<div class="flex gap-12 mt-8">
		<div class="w-2/3">
			<div class="bg-white p-6 rounded shadow">
				<h2 class="text-2xl mb-4">Bedroom Preferences</h2>
				<div id="histogram" class="mt-4">
					{#each bedroomPreferences as feature}
						<div class="flex items-center mb-4">
							<div class="w-32 text-right mr-6 text-lg">{feature.name}:</div>
							<div class="bg-gray-300 h-12 rounded" style="width: {feature.count * 10}px;"></div>
							<span class="ml-4 text-lg">{feature.count}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="w-1/3">
			<div class="bg-white p-6 rounded shadow">
				<h2 class="text-2xl mb-4">Most Desired Features</h2>
				<ol class="list-decimal pl-6 text-lg">
					{#each allFeatures as feature}
						<li class="mb-2">{feature.name} ({feature.count} votes)</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.flex {
		display: flex;
	}

	.gap-12 {
		gap: 3rem;
	}

	.bg-white {
		background-color: #fff;
	}

	.rounded {
		border-radius: 8px;
	}

	.shadow {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.p-6 {
		padding: 1.5rem;
	}

	.text-2xl {
		font-size: 1.5rem;
	}

	.text-lg {
		font-size: 1.125rem;
	}

	.text-3xl {
		font-size: 2rem;
	}

	.mt-8 {
		margin-top: 2rem;
	}

	.mt-4 {
		margin-top: 1rem;
	}

	.mb-4 {
		margin-bottom: 1rem;
	}

	.mb-2 {
		margin-bottom: 0.75rem;
	}

	.mr-6 {
		margin-right: 1.5rem;
	}

	.ml-4 {
		margin-left: 1rem;
	}

	.w-32 {
		width: 8rem;
	}

	.h-12 {
		height: 3rem;
	}
</style>
