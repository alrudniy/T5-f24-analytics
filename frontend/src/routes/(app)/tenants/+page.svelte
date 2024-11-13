<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'

  let { tenants } = $props()
  console.log(tenants)

  const tenantList = $derived.by(() => tenants)
</script>

<main class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-2">
  <section class="flex w-full justify-between items-end">
    <h1 class="text-3xl">Tenants</h1>

    <a href="/" class="underline">Back</a>
  </section>

  <div class="scroll-container py-2">
    <ul class="tenant-list">
      {#each tenantList as tenant (tenant.id)}
        <li class="tenant-item {tenant.active ? 'active' : 'inactive'}">
          <div class="tenant-info">
            <h4>{tenant.firstName} {tenant.lastName ?? ''} ({tenant.username})</h4>
            <small>Joined: {tenant.dateJoined}</small>
          </div>
          <!-- Pass the status as content (children) for Badge -->
          <Badge class="badge" variant={tenant.active ? 'default' : 'secondary'}>
            {tenant.active ? 'Active' : 'Inactive'}
          </Badge>
        </li>
      {/each}
    </ul>
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

  .tenant-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .tenant-item {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tenant-item.active {
    background-color: #e0ffe0; /* Light green for active tenants */
  }

  .tenant-item.inactive {
    background-color: #ffe0e0; /* Light red for inactive tenants */
  }

  .tenant-info {
    flex-grow: 1;
  }

  .tenant-info h4 {
    margin: 0;
    font-size: 1.2rem;
  }

  .tenant-info small {
    color: #777;
  }
</style>
