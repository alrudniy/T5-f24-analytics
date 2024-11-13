<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Card from '$lib/components/card/Card.svelte'
  import CardContent from '$lib/components/card/CardContent.svelte'
  import CardHeader from '$lib/components/card/CardHeader.svelte'

  // Accessing props using $props() to get tenants data
  const { data } = $props();

  // Filter states: all, active, inactive
  type FilterType = 'all' | 'active' | 'inactive';
  let filter = $state<FilterType>('all');

  // Derived state: filter tenants based on status
  const filteredTenants = $derived.by(() => {
    if (filter === 'all') {
      return data.tenants;
    }
    return data.tenants.filter((tenant) => tenant.active === (filter === 'active'));
  });


  // Function to change filter
  function changeFilter(newFilter: FilterType) {
    filter = newFilter;
  }
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
  <section class="flex w-full justify-between items-end">
    <h1 class="text-3xl">Tenant List</h1>
    <a href="/" class="underline">Back</a>
  </section>

  <section>
    {#snippet filterButton(setting: FilterType)}
      <button
        class="capitalize filter-btn"
        data-selected={setting == filter}
        onclick={() => changeFilter(setting)}
      >
        {setting}
      </button>
    {/snippet}

    {@render filterButton('all')}
    {@render filterButton('active')}
    {@render filterButton('inactive')}
  </section>

  <div class="scroll-container py-2">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2">ID</th>
          <th class="p-2">Username</th>
          <th class="p-2">Name</th>
          <th class="p-2">Password</th>
          <th class="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredTenants as tenant (tenant.id)}
          <tr>
            <td class="p-2">{tenant.id}</td>
            <td class="p-2">{tenant.username}</td>
            <td class="p-2">{tenant.firstname} {tenant.lastname || 'N/A'}</td>
            <td class="p-2">{tenant.password.slice(0,32)} ...</td>
            <td class="p-2">
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

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .filter-btn {
    padding: 8px 12px;
    font-size: 1rem;
    background-color: white;
    color: black;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 8px;
  }

  .filter-btn:hover {
    background-color: #f0f0f0;
  }

  .filter-btn[data-selected='true'] {
    background-color: #333;
    color: white;
  }
</style>
