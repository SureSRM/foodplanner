<script>
	import { dndzone, TRIGGERS} from "svelte-dnd-action"

	import Item from './Item.svelte'

	export let key
	export let isSortable

	export let type = 'main'
	export let store

	let items = []
	let ogItems
	// if (key == 'shelf-veg') {
	// 	items = [
  //       {id: "Hummus"},
  //       {id: "Pan"},
  //   ];
	// }
	// store.set(items.map(i => i.id))

	let handleDndConsider = (e) => {
		items = e.detail.items
	}
	let handleDndFinalize = (e) => {
		items = e.detail.items
		store.set(e.detail.items.map(i => i.name))
	}

	if (!isSortable) {
		handleDndConsider = (e) => {
			items = e.detail.items
		}
		handleDndFinalize = (e) => {
			items = ogItems
		}
	}

	store.subscribe(s => {
		items = s.map(i => ({id: Math.random(), name: i}))
		ogItems = items
	})

</script>

<div class="collection_content {type}"
	use:dndzone="{{items}}"
	on:consider="{handleDndConsider}"
	on:finalize="{handleDndFinalize}">
	{#each items as item(item.id)}
		<Item key={item.name}/>
	{/each}
</div>
