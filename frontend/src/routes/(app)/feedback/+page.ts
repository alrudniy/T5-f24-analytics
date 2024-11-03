import type { PageLoad } from './$types'

type Feedback = {
	id: number
	firstName: string
	lastName?: string
	date: string
	content: string
	category: 'tenant' | 'landlord'
}

export const load: PageLoad = async () => {
	return {
		feedbacks: feedbackData
	}
}

// Sample data (replace this with actual data from backend)
const feedbackData: Feedback[] = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		date: '2023-05-15',
		content:
			"I've been renting through this platform for over a year now, and I must say the experience has been fantastic. The property management team is always responsive to my queries and maintenance requests. The online portal for rent payments is user-friendly and makes the process hassle-free. I appreciate the regular property inspections which ensure everything is in good order. Overall, I feel valued as a tenant and would highly recommend this service to others looking for a stress-free renting experience.",
		category: 'tenant'
	},
	{
		id: 2,
		firstName: 'Jane',
		date: '2023-05-16',
		content:
			"As a landlord, I've found this platform to be an invaluable tool for managing my properties. The tenant screening process is thorough, which has resulted in reliable tenants. The automated rent collection system has significantly reduced late payments. However, I feel that the platform could benefit from more detailed financial reporting tools. It would be helpful to have more granular insights into expenses and income for each property. Despite this minor issue, I'm very satisfied with the service and how it has streamlined my property management tasks.",
		category: 'landlord'
	},
	{
		id: 3,
		firstName: 'Mike',
		lastName: 'Smith',
		date: '2023-05-17',
		content:
			'The communication features on this platform are excellent. I can easily get in touch with my landlord or the property management team whenever needed. The maintenance request system is particularly useful - I can submit requests with photos, track their progress, and receive updates. This transparency is much appreciated. One suggestion for improvement would be to implement a feature for scheduling routine maintenance checks. Overall, living in a property managed through this system has been a positive experience.',
		category: 'tenant'
	},
	{
		id: 4,
		firstName: 'Sarah',
		lastName: 'Johnson',
		date: '2023-05-18',
		content:
			"I've been using this platform as a tenant for the past six months, and I'm impressed with how efficiently everything is handled. The move-in process was smooth, with a detailed inventory and condition report. The platform's app is intuitive and makes it easy to manage all aspects of my tenancy. I particularly appreciate the quick response times to any queries or issues. The only improvement I can suggest is to include a feature for direct messaging with maintenance staff for minor issues or questions. Other than that, I'm very satisfied with my experience.",
		category: 'tenant'
	},
	{
		id: 5,
		firstName: 'Robert',
		date: '2023-05-19',
		content:
			'As a landlord with multiple properties, this platform has been a game-changer for me. The centralized dashboard gives me a clear overview of all my properties, tenants, and financial status. The automated reminders for important dates like lease renewals and property inspections are extremely helpful. The tenant screening process is robust, which has led to better quality tenants and fewer issues. I would love to see more advanced reporting features, particularly for tax purposes. Despite this, the time and stress saved by using this platform make it an essential tool for my property management.',
		category: 'landlord'
	}
]
