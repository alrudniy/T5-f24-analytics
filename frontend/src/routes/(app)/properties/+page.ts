import type { PageLoad } from './$types';

type Property = {
	id: number;
	landlord: string;
	location: string;
	type: 'apartment' | 'house' | 'studio';
};

export const load: PageLoad = async () => {
	return {
		properties: placeholderProperties,
	};
};

// Placeholder data (replace this with actual database data when available)
const placeholderProperties: Property[] = [
	{
		id: 1,
		landlord: 'John Doe',
		location: '123 Main St, Cityville',
		type: 'apartment',
	},
	{
		id: 2,
		landlord: 'Jane Smith',
		location: '456 Elm St, Suburbia',
		type: 'house',
	},
	{
		id: 3,
		landlord: 'Mike Johnson',
		location: '789 Oak St, Uptown',
		type: 'studio',
	},
	{
		id: 4,
		landlord: 'Sarah Connor',
		location: '101 Lakeview Dr, Countryside',
		type: 'house',
	},
];
