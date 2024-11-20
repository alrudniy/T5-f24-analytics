import type { PageLoad } from './$types';

type Property = {
	id: number;
	landlord: string;
	location: string;
	type: 'apartment' | 'house' | 'studio';
	verified: boolean; 
};

export const load: PageLoad = async () => {
	return {
		properties: placeholderProperties.filter((property) => property.verified), // Only include verified properties
	};
};

// Placeholder data (replace this with actual database data when available)
const placeholderProperties: Property[] = [
	{
		id: 1,
		landlord: 'John Doe',
		location: '123 Main St, Cityville',
		type: 'apartment',
		verified: true,
	},
	{
		id: 2,
		landlord: 'Jane Smith',
		location: '456 Elm St, Suburbia',
		type: 'house',
		verified: true, 
	},
	{
		id: 3,
		landlord: 'Mike Johnson',
		location: '789 Oak St, Uptown',
		type: 'studio',
		verified: true,
	},
	{
		id: 4,
		landlord: 'Sarah Connor',
		location: '101 Lakeview Dr, Countryside',
		type: 'house',
		verified: true,
	},
];
