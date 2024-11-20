<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Card from '$lib/components/card/Card.svelte'
  import CardContent from '$lib/components/card/CardContent.svelte'
  import CardHeader from '$lib/components/card/CardHeader.svelte'

  // Accessing props using $props() to get tenants data
  const { data } = $props();

  // Declare a search query reactive state
  let searchQuery = $state('');

  // Derived state: filter tenants based on status and search query (by name)
  const filteredTenants = $derived.by(() => {
    let filtered = data.tenants;

    // Apply search filtering based on query (name or username)
    if (searchQuery) {
      filtered = filtered.filter((tenant) => {
        const fullName = (tenant.firstname + ' ' + tenant.lastname).toLowerCase();
        const username = tenant.username.toLowerCase();
        return (
          fullName.includes(searchQuery.toLowerCase()) || 
          username.includes(searchQuery.toLowerCase())
        );
      });
    }

    return filtered;
  });
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
  <section class="flex w-full justify-between items-end">
    <h1 class="text-3xl">Tenant List</h1>
    <a href="/" class="underline">Back</a>
  </section>

  <!-- Search bar for filtering tenants by name or username -->
  <input
    type="text"
    id="search"
    class="form-control mb-3"
    placeholder="Search by name or username..."
    bind:value={searchQuery} 
  />

  <!-- Tenants table -->
  <div class="scroll-container py-2">
    <table class="min-w-full border-collapse" id="userTable">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3">ID</th>
          <th class="p-3">Username</th>
          <th class="p-3">Name</th>
          <th class="p-3">Phone</th>
          <th class="p-3">Email</th>
          <th class="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredTenants as tenant (tenant.id)}
          <tr>
            <td class="p-3">{tenant.id}</td>
            <td class="p-3">{tenant.username}</td>
            <td class="p-3">{tenant.firstname} {tenant.lastname || 'N/A'}</td>
            <td class="p-3">{tenant.phone}</td>
            <td class="p-3">{tenant.email}</td>
            <td class="p-3">
              <Badge variant={tenant.active ? 'default' : 'secondary'}>
                {tenant.active ? 'Active' : 'Inactive'}
              </Badge>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .scroll-container {
    overflow-y: auto;
    flex-grow: 1;
  }

  /* Style the search bar to make it bigger */
  input.form-control {
    width: 100%;
    padding: 10px 14px;  /* Increase padding */
    font-size: 1rem;  /* Larger font size */
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;  /* Ensures padding doesn't affect width */
    margin-top: 20px;
    margin-bottom: 0px; /* Add space between search bar and table */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    min-width: 1000px; /* Set a minimum width for the table */
  }

  th, td {
    padding: 12px; /* Increased padding */
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
</style>
