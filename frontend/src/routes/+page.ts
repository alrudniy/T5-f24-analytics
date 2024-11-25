export async function load() {
	return {
		properties: [
			{
				id: 1,
				location: '123 Main St',
				landlord: 'John Doe',
				type: 'apartment',
				verified: true
			},
			{
				id: 2,
				location: '456 Oak Ave',
				landlord: 'Jane Smith',
				type: 'house',
				verified: true
			},
			{
				id: 3,
				location: '789 Pine Ln',
				landlord: 'David Lee',
				type: 'studio',
				verified: true
			},
			{
				id: 4,
				location: '101 Elm St',
				landlord: 'Peter Jones',
				type: 'apartment',
				verified: false
			},
			{
				id: 5,
				location: '777 Lucky Ln',
				landlord: 'Penny Slots',
				type: 'studio',
				verified: false
			}
		]
	};
}
