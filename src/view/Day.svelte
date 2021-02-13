<script>
	import Collection from './Collection.svelte'
	import Section from './Section.svelte'
	import Item from './Item.svelte'

	import { daySections } from '../model'

	export let dayName

	export let store
</script>

<Collection type='day' title={dayName}>

	{#each daySections as daySection, i}
		<Section isSortable={true} store={store[i]} type={daySection} />
	{/each}

</Collection>
