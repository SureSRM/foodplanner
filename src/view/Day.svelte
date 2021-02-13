<script>
	import Collection from './Collection.svelte'
	import Section from './Section.svelte'
	import Item from './Item.svelte'

	export let dayName

	const daySections = ['main', 'mini', 'main', 'mini', 'main']

	export let store = daySections.map([])
</script>

<Collection type='day' title={dayName}>

	{#each daySections as daySection, i}
		<Section sortable={true} store={store[i]} type={daySection} />
	{/each}

</Collection>
