non<script lang="ts">
    import CardHeader from '$lib/components/card/CardHeader.svelte'
import Chart, { type ChartProps } from '@sveltejs/kit-chartjs';

let chartData = {
    labels: ['1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'],
    datasets: [
        {
            label: '# of Tenants',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }
    ]
};

let chartOptions: ChartProps['options'] = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Tenants'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Number of Bedrooms'
            }
        }
    }
};

let desiredAmenities = [
    { name: 'Single Floor', votes: 25 },
    { name: 'In-Unit Laundry', votes: 22 },
    { name: 'Parking', votes: 18 },
    { name: 'Pet-Friendly', votes: 15 },
    { name: 'Central AC', votes: 12 }
];
</script>

<div class="flex flex-row justify-center items-start gap-8 p-4">
<div class="w-1/2">
    <Card>
        <CardHeader title="Tenant Bedroom Preferences" />
        <CardContent>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </CardContent>
    </Card>
</div>
<div class="w-1/2">
    <Card>
        <CardHeader title="Most Desired Amenities" />
        <CardContent>
            <ol class="list-decimal pl-6">
                {#each desiredAmenities as amenity}
                    <li>{amenity.name} ({amenity.votes} votes)</li>
                {/each}
            </ol>
        </CardContent>
    </Card>
</div>
</div><script lang="ts">
	let desiredFeatures = [
		{ name: '1 Bedroom', votes: 12 },
		{ name: '2 Bedroom', votes: 19 },
		{ name: '3 Bedroom', votes: 3 },
		{ name: '4 Bedroom', votes: 5 },
		{ name: 'Single Floor', votes: 25 },
		{ name: 'In-Unit Laundry', votes: 22 },
		{ name: 'Parking', votes: 18 },
		{ name: 'Pet-Friendly', votes: 15 },
		{ name: 'Central AC', votes: 12 }
	];

	desiredFeatures.sort((a, b) => b.votes - a.votes); // Sort in descending order
</script>

<div class="flex flex-row justify-center items-start gap-8 p-4">
	<div class="w-1/2">
		<div class="bg-white p-4 rounded shadow">
			<h2>Bedroom Preferences</h2>
			<div id="histogram" class="mt-4">
				{#each desiredFeatures.slice(0, 4) as feature}
					<div class="flex items-center mb-2">
						<div class="w-24 text-right mr-4">{feature.name}:</div>
						<div class="bg-gray-300 h-8 rounded" style="width: {feature.votes * 10}px;"></div>
						<span class="ml-2">{feature.votes}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="w-1/2">
		<div class="bg-white p-4 rounded shadow">
			<h2>Most Desired Features</h2>
			<ol class="list-decimal pl-6">
				{#each desiredFeatures as feature}
					<li>{feature.name} ({feature.votes} votes)</li>
				{/each}
			</ol>
		</div>
	</div>
</div>
