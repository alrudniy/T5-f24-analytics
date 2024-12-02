import type { PageLoad } from './$types'

type Property = {
	id: number
	landlord: string
	location: string
	type: 'apartment' | 'house' | 'studio'
	verified: boolean
}

export const load: PageLoad = async () => {
	return {
		properties: placeholderProperties
	}
}

// Placeholder data (replace this with actual database data when available)
const placeholderProperties: Property[] = [
	{
		id: 1,
		landlord: 'John Doe',
		location: '123 Main St, Cityville',
		type: 'apartment',
		verified: true
	},
	{
		id: 2,
		landlord: 'Jane Smith',
		location: '456 Elm St, Suburbia',
		type: 'house',
		verified: true
	},
	{
		id: 3,
		landlord: 'Mike Johnson',
		location: '789 Oak St, Uptown',
		type: 'studio',
		verified: true
	},
	{
		id: 4,
		landlord: 'Sarah Connor',
		location: '101 Lakeview Dr, Countryside',
		type: 'house',
		verified: true
	},
	{
		id: 5,
		landlord: 'Unverified Landlord 1',
		location: '777 Unverified St, Placeholder',
		type: 'apartment',
		verified: false
	},
	{
		id: 6,
		landlord: 'Unverified Landlord 2',
		location: '888 Unverified Ave, Placeholder',
		type: 'house',
		verified: false
	}
]
