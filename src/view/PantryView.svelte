<script>
	import Shelf from './Shelf.svelte'
	import { shelfNames, pantryStore as store } from '../model'
</script>

<div class="section pantries">
		<h1 class=section_header>Pantry</h1>
		<div id="pantry_row" class="collection_row">
			{#each shelfNames as shelfName}
				<Shelf store={store[shelfName]} foodFamily={shelfName}></Shelf>
			{/each}
		</div>
</div>
