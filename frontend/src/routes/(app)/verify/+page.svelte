<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { createAPIClient } from '$lib/api/index.js'
	import SimpleButton from '$lib/components/SimpleButton.svelte'
	import { toast } from 'svelte-sonner'

	let { data } = $props()

	async function verifyStaff(staffID: number) {
		const api = createAPIClient()

		const { data, error } = await api.POST('/verify/staff', {
			body: {
				staffID: staffID
			}
		})

		if (error) {
			toast.error(error.message)
		} else {
			toast.success('Staff verified.')
			invalidate('verify:list')
		}
	}
</script>

<div class="container mx-auto py-10">
	<h1 class="text-3xl font-bold mb-5">Unverified Staff List</h1>
	<div class="overflow-x-auto">
		<table class="min-w-full bg-white border border-gray-300">
			<thead>
				<tr class="bg-gray-100">
					<th class="py-2 px-4 border-b text-left">Staff ID</th>
					<th class="py-2 px-4 border-b text-left">Name</th>
					<th class="py-2 px-4 border-b text-left">Email</th>
					<th class="py-2 px-4 border-b text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.staffs as staff (staff.staffID)}
					<tr class="hover:bg-gray-50">
						<td class="py-2 px-4 border-b">{staff.staffID}</td>
						<td class="py-2 px-4 border-b">{staff.firstName} {staff.lastName}</td>
						<td class="py-2 px-4 border-b">{staff.email}</td>
						<td class="py-2 px-4 border-b">
							<SimpleButton onclick={() => verifyStaff(staff.staffID)}>
								<span class="text-base">Verify</span>
							</SimpleButton>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
