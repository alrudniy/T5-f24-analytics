<script lang="ts">
	import { page } from '$app/stores'
</script>

<a class="underline text-2xl" href="/"> Back to Home page </a>

<h1 class="text-5xl text-red">
	{$page.error?.message}
</h1>
