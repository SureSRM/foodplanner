<script>
	import { foodDirectory, showSubItems, filesStore } from '../model'

	// const toggleShow = () => showSubItems.update(!$showSubItems)
</script>

<form class="my-form">
		<input type="file" id="fileElem" multiple=false bind:files={$filesStore}>
</form>
<button id="clean_menu_btn">Clean Menu</button>
<button id="clean_pantry_btn">Clean Pantry</button>
<button on:click={()=>$showSubItems = !$showSubItems}>Show Sub Items: {$showSubItems}</button>
