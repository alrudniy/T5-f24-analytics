import type { PageLoad } from './$types'

type Tenant = {
  id: number
  username: string
  firstName: string
  lastName?: string
  dateJoined: string
  active: boolean
}

export const load: PageLoad = async () => {
  return {
    tenants: tenantData
  }
}

// Sample data
const tenantData: Tenant[] = [
  {
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    dateJoined: '2022-04-01',
    active: true
  },
  {
    id: 2,
    username: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    dateJoined: '2022-06-15',
    active: false
  },
  {
    id: 3,
    username: 'mikesmith',
    firstName: 'Mike',
    lastName: 'Smith',
    dateJoined: '2023-01-25',
    active: true
  },
  {
    id: 4,
    username: 'sarahjohnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateJoined: '2023-03-10',
    active: true
  },
  {
    id: 5,
    username: 'robertbrown',
    firstName: 'Robert',
    lastName: 'Brown',
    dateJoined: '2021-07-30',
    active: false
  }
]
