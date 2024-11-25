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
