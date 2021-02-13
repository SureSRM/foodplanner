<script>
	import Shelf from './Shelf.svelte'
	export let pantry
</script>

<div class="section pantries">
		<h1 class=section_header>Pantry</h1>
		<div id="pantry_row" class="collection_row">
		<Shelf foodFamily='veg'></Shelf>
		<Shelf foodFamily='legumes'></Shelf>
		<Shelf foodFamily='cereal'></Shelf>
		<Shelf foodFamily='fruit'></Shelf>
		<Shelf foodFamily='seednuts'></Shelf>
		<Shelf foodFamily='dressing'></Shelf>
		<Shelf foodFamily='process'></Shelf>
		<Shelf foodFamily='misc'></Shelf>
		</div>
</div>
