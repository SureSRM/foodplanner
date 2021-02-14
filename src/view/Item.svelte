<script>
	import { foodDirectory, showSubItems } from '../model'
	export let key

	let item = foodDirectory.get(key)
</script>

<div data-id={key} class="item {item.type}">{item.name}
{#if item.subitems.length > 0}
	<div>
		{#if $showSubItems}
			{#each item.subitems as subitem}
				<svelte:self key={subitem.key}/>
			{/each}
		{:else}
			...
		{/if}
	</div>
{/if}
</div>
