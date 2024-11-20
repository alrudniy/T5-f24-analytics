<script lang="ts">

    let {data} = $props()
</script>


<h1 class="text-5xl">Unverified Staffs</h1>  


{#each data.staffs as staff}
    <div>
        <span>{staff.staffID}</span>
        <span>{staff.email}</span>
    </div>
{/each}