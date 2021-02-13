<script>
	import Sortable from 'sortablejs'
	import { onMount } from "svelte";

	import Item from './Item.svelte'

	export let sortable

	export let type = 'main'
	export let store
	let self
	onMount(async function() {

		let group = sortable ? 'shared' : ({
				name: 'shared',
				pull: 'clone',
				put: false,
		})

		Sortable.create(self, {
				group,
				sort: sortable,
				removeOnSpill: sortable,
				multiDrag: true,
				selectedClass: 'selected',
				animation: 100,
		})
	})
</script>

<div class="collection_content {type}" bind:this={self}>
	{#each $store as item}
		<Item {type} {item}/>
	{/each}
</div>
