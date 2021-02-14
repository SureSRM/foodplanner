<script>
	import { calendar, foodDirectory, showSubItems, filesStore } from '../model'

	// const toggleShow = () => showSubItems.update(!$showSubItems)
</script>

<form class="my-form">
		<input type="file" id="fileElem" multiple=false bind:files={$filesStore}>
</form>
<button on:click={()=>calendar.clear()}>Clean Menu</button>
<button on:click={()=>foodDirectory.clear()}>Clean Pantry</button>
<button on:click={()=>$showSubItems = !$showSubItems}>Show Sub Items: {$showSubItems}</button>
