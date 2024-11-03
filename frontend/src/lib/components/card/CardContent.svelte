<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import type { WithElementRef } from '..'

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div bind:this={ref} class="p-6 {className}" {...restProps}>
	{@render children?.()}
</div>
