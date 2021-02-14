<script>
	import { foodDirectory, showSubItems } from '../model'

	// const toggleShow = () => showSubItems.update(!$showSubItems)
</script>

<form class="my-form">
		<input type="file" id="fileElem" multiple=false onchange="handleFile(this.files)">
</form>
<button id="clean_menu_btn">Clean Menu</button>
<button id="clean_pantry_btn">Clean Pantry</button>
<button on:click={()=>$showSubItems = !$showSubItems}>Show Sub Items: {$showSubItems}</button>
