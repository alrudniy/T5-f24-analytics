<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import type { WithElementRef } from '../'

	let {
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div class="bg-card text-card-foreground rounded-xl border shadow {className}" {...restProps}>
	{@render children?.()}
</div>
