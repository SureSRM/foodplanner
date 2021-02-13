<script>
	import Item from './Item.svelte'

	export let type = 'main'
	export let store = []
	let items = store
</script>

<div class="collection_content {type}">
	{#each items as item, i}
		<Item name={item}/>
	{/each}
</div>
