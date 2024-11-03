<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { WithElementRef } from '.'

	let { class: className, children, ...restProps }: WithElementRef<HTMLButtonAttributes> = $props()
</script>

<button class="bg-black text-white text-xl p-2 rounded-lg {className}" {...restProps}>
	{@render children?.()}
</button>
