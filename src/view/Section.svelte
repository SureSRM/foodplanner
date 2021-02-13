<script>
	import Sortable from 'sortablejs'
	import { onMount, onDestroy } from "svelte";

	import Item from './Item.svelte'

	export let isSortable

	export let type = 'main'
	export let store
	// Items takes the initial value of store and doesnt reacts anymore
	// because Sortable manages the dom
	let items = $store

	let self
	let sortable
	let unsubscribe
	onMount(async () => {

		let group = isSortable ? 'shared' : ({
				name: 'shared',
				pull: 'clone',
				put: false,
		})

		sortable = Sortable.create(self, {
				group,
				sort: isSortable,
				removeOnSpill: isSortable,
				multiDrag: true,
				selectedClass: 'selected',
				animation: 100,
				store: {
						set: (s) => {
							store.set(s.toArray())
						},
				},
		})
	})

	onDestroy(async () => {
		sortable.destroy()
		unsubscribe()
	})
</script>

<div class="collection_content {type}" bind:this={self}>
	{#each items as item}
		<Item {type} {item}/>
	{/each}
</div>
