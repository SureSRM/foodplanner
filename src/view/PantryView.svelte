<script>
	import Shelf from './Shelf.svelte'
	export let pantry

	const shelfNames = ['veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing', 'process', 'misc']
	export let store = shelfNames.map(()=>[])

	store[0]=['A']
</script>

<div class="section pantries">
		<h1 class=section_header>Pantry</h1>
		<div id="pantry_row" class="collection_row">
			{#each shelfNames as shelfName, i}
				<Shelf store={store[i]} foodFamily={shelfName}></Shelf>
			{/each}
		</div>
</div>
